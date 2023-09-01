async function pinBuffer(buffer) {
  const formData = new FormData();
  formData.append("file", new Blob([buffer]));

  const url = new URL("/pin-file", process.env.IPFS_SERVER_ENDPOINT);
  const response = await fetch(url, {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(
      `Pin buffer to ipfs failed: ${text || response.statusText}`,
    );
  }

  return await response.json();
}

module.exports = {
  pinBuffer,
};
