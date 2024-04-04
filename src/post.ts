import notFound from "./notFound";
const Mustache = require("mustache");
const API_URL = process.env.API_URL;

export default async function getPost(blog: string, hx: boolean) {
  const post = await getFileContents(`posts/${blog}`);
  const index = await getFileContents("static/index.html");
  const content = await getFileContents("templates/content.html");

  const blogView = {
    API_URL: API_URL,
    post: post,
  };

  const body = Mustache.render(content, blogView);

  if (!index || !post) return notFound();

  if (hx) {
    return new Response(post);
  } else {
      const div = `<div id="contentDiv">${post}</div>`
    const view = {
      API_URL: API_URL,
      post: div,
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
