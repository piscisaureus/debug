const state = new Map()
const api = 'https://api.pirsch.io/api/v1'

async function getToken() {
  const response = await fetch(api+'/token', {
    method: 'POST',
    body: JSON.stringify({
      client_id: Deno.env.get('PirschClientId'),
      client_secret: Deno.env.get('PirschSecret'),
    })
  })

  if (!response.ok) 
    console.error('Could not get token from Pirsch')

  const data = await response.json()
  state.set('token', data.access_token)
}

if (Deno.env.get("IS_PROD"))
  getToken()

export function recordRequest(title, {request, context}) {
  hit({
    title,
    url: request.url,
    ip: context.remoteAddr.hostname,
    user_agent: request.headers.get('User-Agent'),
    accept_language:  request.headers.get('accept-language'),
    referrer : request.headers.get('referer'),
  })
}

function hit(data) {
  // console.log('hit data', data)
  if (Deno.env.get("IS_PROD") || !state.has('token')) {
    fetch(api+'/hit', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        Authorization: 'Bearer ' + state.get('token'),
      }
    }).then(response => {
      if (response.status === 401)
        getToken().then(_ => 
          hit(data))
      // console.info('Hit captured.', response)
    }).catch(error => {
      console.error(error)
    })
  } else {
    console.info('hit missed: ', data)
  }
}