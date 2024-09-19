/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

const AuthController = () => import('#controllers/auth_controller')
const UsersController = () => import('#controllers/users_controller')
import router from '@adonisjs/core/services/router'
import { middleware } from './kernel.js'
import TermsController from '#controllers/terms_controller'
const DictionariesController = () => import('#controllers/dictionaries_controller')
const TeamsController = () => import('#controllers/teams_controller')

// Public routes
router
  .group(() => {
    // Auth routes
    router.post('/auth/register', [AuthController, 'register'])
    router.post('/auth/magic_link', [AuthController, 'sendMagicLink'])
    router.post('/auth/token', [AuthController, 'tokenAuth'])
    router.post('/auth/set_password', [AuthController, 'setPassword'])
    router.post('/auth/login', [AuthController, 'login'])
    // Social auth
    router
      .get('/auth/:provider/redirect', ({ ally, params, response, request }) => {
        // We need to store frontend URL to cookie
        // This way know where to redirect user after social auth
        response.cookie('authenticating_url', request.header('referer'))
        return ally.use(params.provider).redirect()
      })
      .where('provider', /facebook|google/)
    router
      .get('/auth/:provider/callback', [AuthController, 'socialCallback'])
      .where('provider', /facebook|google/)

    router.post('/auth/logout', [AuthController, 'logout'])
  })
  .prefix('v1')

// Private routes
router
  .group(() => {
    // Teams
    router.get('/teams', [TeamsController, 'index'])
    router.post('/teams', [TeamsController, 'store'])
    router.post('/teams/:id/leave', [TeamsController, 'leave'])

    // Dictionary
    router.get('/dictionaries', [DictionariesController, 'index'])
    router.post('/dictionaries', [DictionariesController, 'store'])
    router.get('/dictionaries/:id', [DictionariesController, 'show'])
    router.patch('/dictionaries/:id', [DictionariesController, 'update'])
    router.delete('/dictionaries/:id', [DictionariesController, 'destroy'])

    // Terms
    router.post('/terms/search', [TermsController, 'search'])


    // Auth
    router.get('/me', [UsersController, 'me'])
  })
  .prefix('v1')
  .use(middleware.auth())

router.get('/', async ({}) => {
  return {
    hello: 'world',
  }
})
