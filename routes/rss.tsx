export function handler(req: Request): Response {
  return Response.redirect("https://nerdy.dev/rss.xml", 307);
}