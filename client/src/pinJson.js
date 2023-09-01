async function pinJson(obj) {
  const url = new URL("/pin-json", process.env.IPFS_SERVER_ENDPOINT);
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(obj),
  });

  if (!response.ok) {
    throw new Error("Pin json to ipfs failed");
  }

  return await response.json();
}

module.exports = {
  pinJson,
};
