import Mustache from "mustache";
const API_URL = process.env.API_URL;

interface Ring {
  name: string;
  slug: string;
  about: string;
  url: string;
  rss: string;
  owner: string;
}

export default async function getRing(index: string, next: boolean) {
  const json = await Bun.file("static/json/websites.json").text();
  const template = await Bun.file("templates/web-ring.html").text();
  const arr = await JSON.parse(json);
  const rings = arr.filter((ring: Ring) => {
    return ring.url !== "https://chris-hughes.dev";
  });

  const length = rings.length;
  let newIndex: number;
  if (next) {
    newIndex = parseInt(index) + 1 >= length ? 0 : parseInt(index) + 1;
  } else {
    newIndex = parseInt(index) - 1 < 0 ? length - 1 : parseInt(index) - 1;
  }

  const site = rings[newIndex];

  const view = {
    API_URL: API_URL,
    name: site.name,
    url: site.url,
    rss: site.rss,
    about: site.about,
    index: newIndex,
  };

  return Mustache.render(template, view);
}
