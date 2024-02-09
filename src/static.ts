export default async function getStatic(url: string) {
	const regex = /\/([^\/]+)$/;
	const match = url.match(regex);

	if (match) {
		const filename = match[1];

		if (/\w+\.css$/.test(filename)) {
			try {
				const file = Bun.file(`static/css/${filename}`);
				return new Response(file);
			} catch (e) {
				console.error(e);
				return new Response("404: file not found");
			}
		}

		if (/\w+\.svg$/.test(filename)) {
			try {
				const file = Bun.file(`static/icons/${filename}`);
				return new Response(file);
			} catch(e) {
				console.error(e);
				return new Response("404: file not found");
			}
		}

		if (/\w+\.(png|jpg)$/.test(filename)) {
			try {
				const file = Bun.file(`static/images/${filename}`);
				return new Response(file);
			} catch(e) {
				console.error(e);
				return new Response("404: file not found");
			}
		}
	}
	return new Response("404: file not found");
}

