export default async function notFound() {
  const html = await Bun.file("static/not-found.html").text();
  return new Response(html, {
    headers: {
      "content-type": "text/html"
    },
    status: 404,
  });
}
