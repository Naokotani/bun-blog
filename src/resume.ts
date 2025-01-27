import notFound from "./notFound";
import Mustache from "mustache";
import getFileContents from "./fileContents";
const API_URL = process.env.API_URL;

export default async function getResume(hx: boolean) {
  const index = await getFileContents("static/index.html");
  const resume = await getFileContents("templates/resume.html");

  if (!resume || !index) return notFound("Files not found for resume.");

  if (hx) {
    return new Response(resume);
  } else {
    const view = {
      API_URL: API_URL,
      post: resume
    };

    const html = Mustache.render(index, view);

    return new Response(html, {
      headers: {
        "Content-Type": "text/html",
      },
    });
  }
}
