const { IPFS_ENDPOINT } = require("../env");
const { HttpError } = require("../exc");
const { ipfsAdd, trimTailSlash } = require("../utils");

async function pinJson(ctx) {
  const data = ctx.request.body;

  try {
    const result = await ipfsAdd(data);

    ctx.body = {
      cid: result.path,
      url: `${trimTailSlash(IPFS_ENDPOINT)}/${result.path}`,
    };
  } catch (e) {
    throw new HttpError(500, e.message);
  }
}

module.exports = {
  pinJson,
};
