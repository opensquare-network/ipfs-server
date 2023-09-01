require("dotenv").config();

const Koa = require("koa");
const bodyParser = require("koa-bodyparser");
const logger = require("koa-logger");
const helmet = require("koa-helmet");
const http = require("http");
const cors = require("@koa/cors");
const router = require("./routes");

const app = new Koa();

app.use(cors());
app.use(logger());
app.use(bodyParser());
app.use(helmet());

app.use(async (ctx, next) => {
  try {
    await next();
  } catch (err) {
    ctx.status = err.statusCode || err.status || 500;
    ctx.body = {
      message: err.message,
      data: err.data,
    };
  }
});

app.use(router.routes()).use(router.allowedMethods());

const httpServer = http.createServer(app.callback());

const PORT = process.env.PORT;
if (!PORT) {
  console.log("PORT is not defined");
  process.exit();
}

httpServer.listen(PORT, (err) => {
  if (err) throw err;
  console.log(`> Ready on http://127.0.0.1:${PORT}`);
});
