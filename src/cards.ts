import { readdir } from "node:fs/promises";
import path  from 'path';
import { load } from 'cheerio';
const Mustache = require("mustache");
const POSTS_PATH = path.join(__dirname, '../posts/');
const IMAGES_PATH = path.join(__dirname, '../static/images/');
const API_URL = process.env.API_URL;

export default async function getCards() {
	const files = await readdir(POSTS_PATH);
	const images = await readdir(IMAGES_PATH);
	const template = await Bun.file('templates/card.html').text();
	let links: object[] = [];

	for (let file of files) {
		const name = file.split('.');
		const index: number = images.findIndex(e => e.startsWith('thumb') && e.includes(name[0]));
		const post = await Bun.file('posts/' + file).text();
		const $ = load(post);
		const summary = $('div.summary p').text();

		const link = {
			link: file,
			title: makeTitle(file),
			API_URL: API_URL,
			image: `${images[index]}`,
			summary: summary,
		}

		links.push(link);
		
	}

	const view = {links: links}
	const html = Mustache.render(template, view);

	return new Response(html, {
      headers: {
        "Content-Type": "text/html",
      },
    });
}

function makeTitle(slug: string) {
	let words = slug.split('.');
  words = words[0].split('-');

  for (var i = 0; i < words.length; i++) {
    var word = words[i];
    words[i] = word.charAt(0).toUpperCase() + word.slice(1);
  }

  return words.join(' ');
}
