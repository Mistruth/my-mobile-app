import Router from 'koa-router'
import baseController from '../controller/api/base'

const router = new Router()

router.get('/*', baseController)

export default router
