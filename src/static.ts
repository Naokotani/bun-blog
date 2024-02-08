export default async function getStatic(url: string) {
	const regex = /\/([^\/]+)$/;
	const match = url.match(regex);

	if (match) {
		const filename = match[1];

		if (/\w+\.css$/.test(filename)) {
			const file = Bun.file(`static/css/${filename}`);
			return new Response(file);
		}

		if (/\w+\.svg$/.test(filename)) {
			const file = Bun.file(`static/icons/${filename}`);
			return new Response(file);
		}

		if (/\w+\.(png|jpg)$/.test(filename)) {
			const file = Bun.file(`static/images/${filename}`);
			return new Response(file);
		}
	}
	return new Response("file not found");

}

