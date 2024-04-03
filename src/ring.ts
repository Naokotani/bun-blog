import path from "path";
import Mustache from "mustache";
const API_URL = process.env.API_URL;

export default async function getRing(index: string, next: boolean) {
  const json = await Bun.file("static/json/websites.json").text();
  const template = await Bun.file("templates/web-ring.html").text();
  const arr = await JSON.parse(json);
  const ring = arr.filter((obj) => {
    return obj.url !== "https://chris-hughes.dev";
  });

  const length = ring.length;
  let newIndex;
  if (next) {
    newIndex = parseInt(index) + 1 >= length ? 0 : parseInt(index) + 1;
  } else {
    newIndex = parseInt(index) - 1 <= 0 ? length - 1 : parseInt(index) - 1;
  }

  const site = ring[newIndex];

  const view = {
    API_URL: API_URL,
    name: site.name,
    url: site.url,
    rss: site.rss,
    about: site.about,
    index: newIndex,
  };

  return await Mustache.render(template, view);
}
