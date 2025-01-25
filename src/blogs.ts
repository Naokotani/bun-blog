import { readdir } from "node:fs/promises";
import path from "path";
import Mustache from "mustache";
const POSTS = path.join(__dirname, "../posts/html/");
const API_URL = process.env.API_URL;

export default async function getBlogs() {
  const files = await readdir(POSTS);
  const template = await Bun.file("templates/links.html").text();

  let links: object[] = [];

  files.forEach((file) => {
    const link = {
      link: file,
      label: makeTitle(file),
      url: API_URL,
    };
    links.push(link);
  });
  const view = { links: links };
  const html = Mustache.render(template, view);

  return new Response(html, {
    headers: {
      "Content-Type": "text/html",
    },
  });
}

function makeTitle(slug: string) {
  let words = slug.split(".");
  words = words[0].split("-");

  for (var i = 0; i < words.length; i++) {
    var word = words[i];
    words[i] = word.charAt(0).toUpperCase() + word.slice(1);
  }

  return words.join(" ");
}
