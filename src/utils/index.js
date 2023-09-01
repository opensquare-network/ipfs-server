function trimTailSlash(url) {
  return url.endsWith("/") ? url.substr(0, url.length - 1) : url;
}

module.exports = {
  trimTailSlash,
  ...require("./ipfs"),
};
