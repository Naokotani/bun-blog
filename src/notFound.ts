export default async function notFound(msg: string) {
  const html = await Bun.file("static/not-found.html").text();
  console.error(msg)
  return new Response(html, {
    headers: {
      "content-type": "text/html"
    },
    status: 404,
  });
}
