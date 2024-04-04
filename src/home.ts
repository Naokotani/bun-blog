const Mustache = require("mustache");
const API_URL = process.env.API_URL;

export default async function getHome() {
  const index = await Bun.file("static/index.html").text();
  const content = await Bun.file("templates/home.html").text();

  const homeView = {
    API_URL: API_URL,
  };

  const home = Mustache.render(content, homeView);

  const view = {
    API_URL: API_URL,
    content: home,
  };

  const output = Mustache.render(index, view);
  return new Response(output, {
    headers: {
      "Content-Type": "text/html",
    },
  });
}
