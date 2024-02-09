import { watch } from "fs";
import sharp from "sharp";
import path from "path";
const imagesPath = path.join(__dirname, "../static/images");

const processImages = () => {
  const watcher = watch(imagesPath, (event, filename) => {
    if (
      filename &&
      !filename.startsWith("thumb-") &&
      (filename.endsWith(".png") || filename.endsWith(".jpg"))
    ) {
      console.log(`${event} detected in /static/images`);
      console.log(`Processing image ${filename}`);
      try {
        sharp(`${imagesPath}/${filename}`)
          .resize(384, 185, {
            fit: "cover",
          })
          .toFile(`${imagesPath}/thumb-${filename}`);
      } catch (e) {
        console.error("File processing failed" + e);
      }
    }
  });

  process.on("SIGINT", () => {
    console.log("Closing watcher...");
    watcher.close();
    process.exit(0);
  });
};

export default processImages;
