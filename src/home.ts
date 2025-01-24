import Mustache from "mustache";
import getRing from "./ring";
import getCards from "./cards";
const API_URL = process.env.API_URL;

export default async function getHome() {
  const index = await Bun.file("static/index.html").text();
  const cards = await getCards();
  const content = cards ? cards : "";

  const view = {
    API_URL: API_URL,
    content: content,
    ring: await getRing("0", true),
  };

  const output = Mustache.render(index, view);
  return new Response(output, {
    headers: {
      "Content-Type": "text/html",
    },
  });
}
