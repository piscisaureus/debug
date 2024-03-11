export function handler(req: Request): Response {
  return Response.redirect("https://nerdy.dev/subscriptions.opml.xml", 307);
}