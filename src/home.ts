const Mustache = require("mustache");
const API_URL = process.env.API_URL

export default async function getHome() {
	const index = await Bun.file("static/index.html").text();

	const view = {
		API_URL: API_URL,
	}

	const output = Mustache.render(index, view);
	return new Response(output, {
      headers: {
        "Content-Type": "text/html",
      },
    });
}

