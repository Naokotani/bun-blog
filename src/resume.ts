import notFound from "./notFound";
import Mustache from "mustache";
import getFileContents from "./fileContents";

export default async function getResume(hx: boolean) {
  const index = await getFileContents("static/index.html");
  const template = await getFileContents("templates/resume.html");
  const resume = await getFileContents("posts/resume/chris-hughes-resume.html");

  if (!resume || !index || !template) return notFound("Files not found for resume.");

  const resumeView = {
    resume: resume
  };

  const post = Mustache.render(template, resumeView);

  if (hx) {
    return new Response(post);
  } else {


    const indexView = {
      post: post
    };

    const html = Mustache.render(index, indexView);

    return new Response(html, {
      headers: {
        "Content-Type": "text/html",
      },
    });
  }
}
