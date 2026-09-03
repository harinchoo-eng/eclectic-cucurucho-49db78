export default {
  async fetch(request) {
    const url = new URL(request.url);

    // カード検索API
    if (url.pathname === "/api/search-card") {
      const target =
        "https://eclectic-cucurucho-49db78.netlify.app/.netlify/functions/search-card" +
        url.search;

      try {
        const response = await fetch(target);

        const headers = new Headers(response.headers);
        headers.set("Access-Control-Allow-Origin", "*");
        headers.set("Cache-Control", "no-store");

        return new Response(response.body, {
          status: response.status,
          headers
        });
      } catch (error) {
        return new Response(
          JSON.stringify({
            error: "検索APIへの接続に失敗しました",
            detail: String(error)
          }),
          {
            status: 502,
            headers: {
              "Content-Type": "application/json; charset=utf-8",
              "Access-Control-Allow-Origin": "*"
            }
          }
        );
      }
    }

    // お宝カード査定の画面はGitHub Pagesから表示
    const base =
      "https://harinchoo-eng.github.io/eclectic-cucurucho-49db78";

    let path = url.pathname;

    if (path === "/") {
      path = "/";
    }

    const pageUrl = base + path + url.search;

    return fetch(pageUrl);
  }
};