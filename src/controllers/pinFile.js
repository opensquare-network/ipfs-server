const { ipfsAddBuffer, trimTailSlash } = require("../utils");
const { IPFS_ENDPOINT } = require("../env");
const { HttpError } = require("../exc");

const Megabyte = 1024 * 1024;

async function pinFile(ctx) {
  const file = ctx.request.file;
  if (!file) {
    throw new HttpError(400, "File is missing");
  }

  if (file.size > 10 * Megabyte) {
    throw new HttpError(
      400,
      "The upload file has exceeded the size limitation"
    );
  }

  try {
    const result = await ipfsAddBuffer(file.buffer);

    ctx.body = {
      cid: result.path,
      url: `${trimTailSlash(IPFS_ENDPOINT)}/${result.path}`,
    };
  } catch (e) {
    throw new HttpError(500, e.message);
  }
}

module.exports = {
  pinFile,
};
