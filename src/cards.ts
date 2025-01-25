import { readdir } from "node:fs/promises";
import path from "path";
import { load } from "cheerio";
import Mustache from "mustache";
const POSTS_PATH = path.join(__dirname, "../posts/html/");
const IMAGES_PATH = path.join(__dirname, "../posts/images/");
const API_URL = process.env.API_URL;

interface Link {
  link: string;
  title: string;
  API_URL: string;
  image: string;
  summary: string;
  date: Date;
}

export default async function getCards() {
  const files = await readdir(POSTS_PATH);
  const images = await readdir(IMAGES_PATH);
  const template = await Bun.file("templates/card.html").text();
  const intro = await Bun.file("posts/intro/intro.html").text();

  let links: Link[] = [];

  for (let file of files) {
    const name = file.split(".");
    const index: number = images.findIndex(
      (e) => e.startsWith("thumb") && e.includes(name[0]),
    );
    const post = await Bun.file("posts/html/" + file).text();
    const $ = load(post);
    const summary = $("summary").text();
    const dateHtml = $("small").text();
    const date = dateHtml.replace("Published: ", "");

    const link: Link = {
      link: file,
      title: makeTitle(file),
      API_URL: API_URL ? API_URL : "",
      image: `${images[index]}`,
      summary: summary,
      date: new Date(date),
    };
    links.push(link);
  }

  links.sort(function (a: Link, b: Link) {
    return b.date.getTime() - a.date.getTime();
  });

  const view = {
    intro: intro,
    links: links,
  };

  return Mustache.render(template, view);
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
