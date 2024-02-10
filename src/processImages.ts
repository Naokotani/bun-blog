import { watch } from "fs";
import sharp from "sharp";
import path from "path";
import { readdir } from "node:fs/promises";
const imagesPath = path.join(__dirname, "../static/images");
import { access, constants } from "node:fs/promises";

const processImages = async () => {
  const watcher = watch(imagesPath, (event, filename) => {
    console.log(`${event} detected in /static/images`);
    filename && checkAccess(filename);
  });

  process.on("SIGINT", () => {
    console.log("Closing watcher...");
    watcher.close();
    process.exit(0);
  });
};

async function checkAccess(filename: string) {
  const images = await readdir(imagesPath);

  if (images.includes(`thumb-${filename}`) || filename.startsWith("thumb-")) {
    return;
  }

  try {
    await access(`${imagesPath}/${filename}`, constants.R_OK | constants.W_OK);
    transformImage(filename);
  } catch {
    return;
  }
}

async function transformImage(filename: string) {
  if ((filename.endsWith(".png") || filename.endsWith(".jpg"))) {
    try {
      console.log(`Processing image ${filename}`);
      sharp(`${imagesPath}/${filename}`)
        .resize(384, 185, {
          fit: "cover",
        })
        .toFile(`${imagesPath}/thumb-${filename}`);
      console.log(`${filename} resized successfully`);
    } catch (e) {
      console.error("File processing failed" + e);
    }
  }
}

export default processImages;
