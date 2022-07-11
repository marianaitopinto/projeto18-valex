import express from "express";
import "express-async-errors";
import "dotenv/config";

import routers from "./routers/index";
import handleError from "./middlewares/errorHandlingMiddleware";


const app = express();

app.use(express.json());

app.use(routers);
app.use(handleError);

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server up and running on port ${port}`);
});