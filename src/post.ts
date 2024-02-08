const Mustache = require("mustache");
const API_URL = process.env.API_URL

export default async function getPost(blog: string, hx: boolean ) {
	const index = await Bun.file("static/blog-index.html").text();
	const post = await Bun.file(`posts/${blog}`).text();

	if (hx) {
		return new Response(post);
	} else {
		const view = {
			API_URL: API_URL,
			post: post,
		}

		const html = Mustache.render(index, view);

		return new Response(html, {
      headers: {
        "Content-Type": "text/html",
      },
    });
	}
}
