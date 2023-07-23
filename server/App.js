const mongoose = require("mongoose");
const server = require("./server");
const port = 9000;
const MONGO_URL = "mongodb://127.0.0.1/Notes";

mongoose
  .connect(MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to database");

    server.listen(port, () => console.log(`server listening at port ${port}`));
  })
  .catch((err) => console.error("There was an error:\n" + err));
