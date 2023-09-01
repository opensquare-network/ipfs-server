const dotenv = require("dotenv");
dotenv.config();

const fs = require("fs");
const { pinBuffer } = require("..");

async function main() {
  // Get file path from command line arguments
  const filePath = process.argv[2];
  if (!filePath) {
    throw new Error("File path is required");
  }

  // Read file data from file system
  const buffer = fs.readFileSync(filePath);
  const res = await pinBuffer(buffer);

  console.log(res);
}

main()
  .catch(console.error)
  .finally(() => process.exit());
