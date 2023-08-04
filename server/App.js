const mongoose = require("mongoose");
const server = require("./src/server");
const { MONGO_URI, PORT } = require("./config");

mongoose
  .connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to database");

    server.listen(PORT, () => console.log(`server listening at port ${PORT}`));
  })
  .catch((err) => console.error("There was an error:\n" + err));
