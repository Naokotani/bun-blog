import notFound from "./notFound";
import Mustache from "mustache";
import getRing from "./ring";
const API_URL = process.env.API_URL;

export default async function getPost(blog: string, hx: boolean) {
  const post = await getFileContents(`posts/${blog}`);
  const index = await getFileContents("static/index.html");

  if (!index || !post) return notFound();

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

async function getFileContents(path: string) {
  try {
    const file = await Bun.file(path).text();
    return file;
  } catch (e) {
    console.error(e);
    return false;
  }
}
