import notFound from "./notFound";
import Mustache from "mustache";
import getFileContents from "./fileContents";
const API_URL = process.env.API_URL;

export default async function getAbout(hx: boolean) {
  const index = await getFileContents("static/index.html");
  const about = await getFileContents("posts/about/about.html");

  if (!about || !index) return notFound("Files not found for resume.");

  if (hx) {
    return new Response(about);
  } else {
    const view = {
      API_URL: API_URL,
      post: about
    };

    const html = Mustache.render(index, view);

    return new Response(html, {
      headers: {
        "Content-Type": "text/html",
      },
    });
  }
}
