import Mustache from 'mustache';
const POSTS_PATH = path.join(__dirname, "../posts/html/");
import { readdir } from "node:fs/promises";
import path from "path";
import { load } from "cheerio";

interface Post {
  title: string;
  date: string;
  link: string;
  description: string;
}

export default async function feed() {
  const files = await readdir(POSTS_PATH);
  const xmlTemplate = await Bun.file("templates/rss.xml").text();

  let posts: Post[] = [];
  for (const file of files) {
    const post = await Bun.file(POSTS_PATH + file).text();
    const $ = load(post);
    const dateText = $("small.date").text();
    $("small").remove();
    $("summary").remove();
    $("title").remove();
    let html = $.html();

    let dateArr = dateText.split(":");
    dateArr.shift();
    let date = dateArr.join(":").trim();


    posts.sort(function(a: Post, b: Post) {
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    });

    posts.push({
      title: makeTitle(file),
      date: date.replace('-4:00', ' -0400'),
      link: file,
      description: html,
    });
  }

  const view = {
    posts: posts,
  }

  const xml = Mustache.render(xmlTemplate, view);

  return new Response(xml, {
    headers: {
      "Content-Type": "text/xml"
    }
  })
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
