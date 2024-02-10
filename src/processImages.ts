import { watch } from "fs";
import sharp from "sharp";
import path from "path";
import fs from "node:fs/promises";
const imagesPath = path.join(__dirname, "../static/images");
import { access, constants } from "node:fs/promises";

const processImages = async () => {
  const watcher = watch(imagesPath, (_, filename) => {
    if (
      filename &&
      !filename.startsWith("thumb-") &&
      (filename.endsWith(".png") || filename.endsWith(".jpg"))
    ) {
      checkAccess(filename);
    }
  });

  process.on("SIGINT", () => {
    console.log("Closing watcher...");
    watcher.close();
    process.exit(0);
  });
};

async function checkAccess(filename: string) {
  try {
    await access(`${imagesPath}/${filename}`, constants.R_OK | constants.W_OK);
    resizeImage(filename);
  } catch {
    return;
  }
}

async function resizeImage(filename: string) {
  const images = await fs.readdir(imagesPath);
  if (images.includes(`thumb-${filename}`)) {
    try {
      await fs.rm(`${imagesPath}/thumb-${filename}`);
      console.log(`Deleted old thumb for ${filename}`);
    } catch (e) {
      console.error("Error deleting old thumb: " + e);
    }
  }

  try {
    console.log(`Processing image ${filename}`);
    sharp(`${imagesPath}/${filename}`)
      .resize(384, 185, {
        fit: "cover",
      })
      .toFile(`${imagesPath}/thumb-${filename}`);
  } catch (e) {
    console.error("File processing failed" + e);
    return;
  }
  console.log(`${filename} resized successfully`);
}

export default processImages;
