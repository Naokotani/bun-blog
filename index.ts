import feed from "./src/feed"
import notFound from "./src/notFound";
import getHome from "./src/home";
import getBlogs from "./src/blogs";
import getPost from "./src/post";
import getStatic from "./src/static";
import getCards from "./src/cards";
import processImages from "./src/processImages";

processImages();

Bun.serve({
  port: process.env.PORT,
  async fetch(req: Request): Promise<Response> {
    const url = new URL(req.url);

    try {
      if (/\.(css|png|svg|js)$/.test(req.url)) return await getStatic(req.url);
      if (url.pathname === "/") return await getHome();
      if (url.pathname === "/blog") return getBlogs();
      if (url.pathname === "/cards") return getCards();
      if (url.pathname === "/rss") return feed();
      if (/\/blog\/.*\.html/.test(req.url)) {
        const match = req.url.match(/\/blog\/(.*\.html)/);
        return getPost(match![1], req.headers.get("hx-request") === "true");
      }
      return notFound();
    } catch (e) {
      console.error("Error:", e);
      return new Response("500 - Internal Server Error", {
        status: 500,
      });
    }
  },
});
