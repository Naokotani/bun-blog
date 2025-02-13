import notFound from "./notFound";
import Mustache from "mustache";
import getRing from "./ring";
import getFileContents from "./fileContents";
const API_URL = process.env.API_URL;

export default async function getPost(blog: string, hx: boolean) {
  const post = await getFileContents(`posts/html/${blog}`);
  const index = await getFileContents("static/index.html");

  if (!index || !post) return notFound("Files not found for post.");

  if (hx) {
    return new Response(post);
  } else {
    const view = {
      API_URL: API_URL,
      post: post,
      ring: await getRing("0", true),
    };

    const html = Mustache.render(index, view);

    return new Response(html, {
      headers: {
        "Content-Type": "text/html",
      },
    });
  }
}
