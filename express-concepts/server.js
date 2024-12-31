require("dotenv").config();
const express = require("express");
const { configureCors } = require("./config/corsConfig");
const {
  requestLogger,
  addTimeStamp,
} = require("./middleware/customMiddleware");
const { globalErrorhandler } = require("./middleware/errorHandler");
const { urlVersioning } = require("./middleware/apiVersioning");
const { createBasicRateLimiter } = require("./middleware/rateLimiting.js");
const itemRoutes = require("./routes/item-routes.js");

const app = express();
const PORT = process.env.PORT || 3000;

//express json middleware
app.use(requestLogger);
app.use(addTimeStamp);

app.use(configureCors());
app.use(createBasicRateLimiter(2, 15 * 60 * 1000)); // 100 request per 15 minutes
app.use(express.json());

app.use(urlVersioning("v1"));
app.use("/api/v1", itemRoutes);

app.use(globalErrorhandler);

app.listen(PORT, () => {
  console.log(`Server is now running on port ${PORT}`);
});
