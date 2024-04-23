/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

const AuthController = () => import('#controllers/auth_controller')
import router from '@adonisjs/core/services/router'

router
  .group(() => {
    router.post('auth/register', [AuthController, 'register'])
    router.post('auth/magic_link', [AuthController, 'sendMagicLink'])
    router.post('auth/token', [AuthController, 'tokenAuth'])
    router.post('auth/set_password', [AuthController, 'setPassword'])
    router.post('auth/login', [AuthController, 'login'])
    router.post('auth/logout', [AuthController, 'logout'])

    // Social auth
    router
      .get('auth/:provider/redirect', ({ ally, params }) => {
        return ally.use(params.provider).redirect()
      })
      .where('provider', /facebook|google/)
    router
      .get('auth/:provider/callback', [AuthController, 'socialCallback'])
      .where('provider', /facebook|google/)
  })
  .prefix('v1')

router.get('/', async () => {
  return {
    hello: 'world',
  }
})
