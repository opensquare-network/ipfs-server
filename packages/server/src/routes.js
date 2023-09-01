const Router = require("koa-router");
const multer = require("@koa/multer");
const { pinFile } = require("./controllers/pinFile");
const { pinJson } = require("./controllers/pinJson");

const upload = multer();

const router = new Router();

router.post("/pin-file", upload.single("file"), pinFile);
router.post("/pin-json", pinJson);

module.exports = router;
