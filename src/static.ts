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
        return new Response("404: file not found", {
          status: 404,
        });
      }
    }

    if (/\w+\.json$/.test(filename)) {
      try {
        const file = Bun.file(`static/json/${filename}`);
        return new Response(file, {
          headers: {
            "Content-Type": "application/json",
          },
        });
      } catch (e) {
        console.error(e);
        return new Response("404: file not found", {
          status: 404,
        });
      }
    }

    if (/\w+\.js$/.test(filename)) {
      try {
        const file = Bun.file(`static/js/${filename}`);
        return new Response(file, {
          headers: {
            "Content-Type": "text/javascript",
          },
        });
      } catch (e) {
        console.error(e);
        return new Response("404: file not found", {
          status: 404,
        });
      }
    }

    if (/\w+\.(svg)$/.test(filename)) {
      try {
        const file = Bun.file(`static/icons/${filename}`);
        return new Response(file, {
          headers: {
            "Content-Type": "image/x-icon",
          },
        });
      } catch (e) {
        console.error(e);
        return new Response("404: file not found");
      }
    }

    if (/favicon-16x16\.png$/.test(filename)) {
      try {
        const file = Bun.file(`static/icons/favicon-16x16.png`);
        return new Response(file);
      } catch (e) {
        console.error(e);
        return new Response("404: file not found", {
          status: 404,
        });
      }
    }

    if (/\w+\.(png|jpg)$/.test(filename)) {
      try {
        const file = Bun.file(`posts/images/${filename}`);
        return new Response(file);
      } catch (e) {
        console.error(e);
        return new Response("404: file not found", {
          status: 404,
        });
      }
    }

    if (/\w+\.(pdf)$/.test(filename)) {
      try {
        const file = Bun.file(`posts/resume/resume.pdf`);
        return new Response(file);
      } catch (e) {
        console.error(e);
        return new Response("404: file not found", {
          status: 404,
        });
      }
    }


  }
  return new Response("404: file not found", {
    status: 404,
  });
}
