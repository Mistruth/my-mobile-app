import { RouterContext } from 'koa-router'

export default async function (ctx:RouterContext) {
  ctx.body = 'Hi TS'
}
