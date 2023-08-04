import axios from "axios";
const axiosApiInstance = axios.create();
const url = `${window.location.origin}/api`;

const isAbsoluteURLRegex = /^(?:\w+:)\/\//;

// Request interceptor for API calls
axiosApiInstance.interceptors.request.use(
  async (config) => {
    const access_token = localStorage.getItem("token");
    config.headers = {
      Authorization: access_token,
      Accept: "application/json",
      // "Content-Type": "application/x-www-form-urlencoded",
      "content-type": "application/json; charset=utf-8",
      ...config.headers,
    };
    if (!isAbsoluteURLRegex.test(config.url)) {
      config.url = url + config.url;
    }
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

// Response interceptor for API calls
axiosApiInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async function (error) {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const res = await axios.get(`${url}auth/refresh`, {
          headers: {
            "content-type": "application/json; charset=utf-8",
            refresh_token: localStorage.getItem("retoken"),
          },
        });
        localStorage.setItem("token", res.data.access_token);
        axios.defaults.headers.common["Authorization"] = res.data.access_token;
      } catch (err) {
        console.log(err);
        if (err.response.status === 503) {
          localStorage.clear();
          window.history.forward("/errorPage");
        }
        return Promise.reject(err);
      }
      return axiosApiInstance(originalRequest);
    }
    return Promise.reject(error);
  }
);

export default axiosApiInstance;
