import { NextPageContext } from 'next'
import { verifyIdToken } from '../config/admin'
import nookies from 'nookies'

export const rerouteOnUnauthorized = async (ctx: NextPageContext) => {
  try {
    const cookies = nookies.get(ctx)
    console.log('COOKIE', cookies)
    const token = await verifyIdToken(cookies.FB_TOKEN)
    console.log('TOKEN GOT UNAUTH', token.uid)
    return {
      props: { uid: token.uid },
    }
  } catch (error) {
    ctx.res.writeHead(302, { location: '/login' })
    ctx.res.end()
    return {
      props: {},
    }
  }
}

export const rerouteOnAuthorized = async (ctx: NextPageContext) => {
  try {
    const cookies = nookies.get(ctx)
    const token = await verifyIdToken(cookies.FB_TOKEN)
    ctx.res.writeHead(302, { location: '/home' })
    ctx.res.end()
    return {
      props: {},
    }
  } catch (error) {
    return {
      props: {},
    }
  }
}

export const rerouteFromPage = async (ctx: NextPageContext) => {
  try {
    const cookies = nookies.get(ctx)
    const token = await verifyIdToken(cookies.FB_TOKEN)
    ctx.res.writeHead(302, { location: '/home' })
    ctx.res.end()
    return {
      props: {},
    }
  } catch (error) {
    ctx.res.writeHead(302, { location: '/login' })
    ctx.res.end()
    return {
      props: {},
    }
  }
}
