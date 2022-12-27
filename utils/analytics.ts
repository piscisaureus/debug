export default function hit(data) {
  if (Deno.env.get("IS_PROD")) {
    return fetch('https://api.pirsch.io/api/v1/hit', data).catch(error => {
        console.error(error);
      })
  }
}