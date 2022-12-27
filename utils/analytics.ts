import { Pirsch } from 'https://esm.sh/pirsch-sdk'

let AnalyticsClient = null

if (Deno.env.get("IS_PROD")) {
  AnalyticsClient = new Pirsch({
    hostname: "nerdy.dev",
    protocol: "https",
    clientId: Deno.env.get("PirschClientId"),
    clientSecret: Deno.env.get("PirschSecret"),
  })
}

export default AnalyticsClient