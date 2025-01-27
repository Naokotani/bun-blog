import feed from "./src/feed";
import notFound from "./src/notFound";
import getResume from "./src/resume"
import getHome from "./src/home";
import getBlogs from "./src/blogs";
import getPost from "./src/post";
import getStatic from "./src/static";
import getCards from "./src/cards";
import getRing from "./src/ring";
import processImages from "./src/processImages";

processImages();

console.log(`Launching server on port ${3000}`);
Bun.serve({
  port: 3000,
  async fetch(req: Request): Promise<Response> {
    const url = new URL(req.url);

    try {
      if (/\.(css|png|svg|js|json|pdf)$/.test(req.url)) {
        return await getStatic(req.url);
      }

      if (url.pathname === "/")
        return await getHome();

      if (url.pathname === "/blog")
        return getBlogs();

      if (url.pathname === "/cards") {
        return new Response(await getCards());
      }

      if (url.pathname === "/resume")
        return await getResume(req.headers.get("hx-request") === "true");

      if (url.pathname === "/rss")
        return feed();

      if (/\/ring\/(prev|next)\/([0-9]+)/.test(req.url)) {
        const match = req.url.match(/[0-9]+$/);
        const next = req.url.match(/(next)/) ? true : false;
        return match
          ? new Response(await getRing(match[0], next))
          : new Response("Not Found");
      }

      if (/\/blog\/.*\.html/.test(req.url)) {
        const match = req.url.match(/\/blog\/(.*\.html)/);
        return getPost(match![1], req.headers.get("hx-request") === "true");
      }

      return notFound("Path not found.");
    } catch (e) {
      console.error("Error:", e);
      return new Response("500 - Internal Server Error", {
        status: 500,
      });
    }
  },
});
