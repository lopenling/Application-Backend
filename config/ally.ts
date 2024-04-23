import env from '#start/env'
import { defineConfig, services } from '@adonisjs/ally'

const allyConfig = defineConfig({
  google: services.google({
    clientId: env.get('GOOGLE_CLIENT_ID'),
    clientSecret: env.get('GOOGLE_CLIENT_SECRET'),
    callbackUrl: env.get('GOOGLE_CALLBACK_URL'),

    // Google specific
    // prompt: 'select_account',
    // accessType: 'offline',
    // hostedDomain: 'adonisjs.com',
    // display: 'page',
    // scopes: ['userinfo.email', 'calendar.events'],
  }),
  // facebook: services.facebook({
  //   clientId: env.get('FACEBOOK_CLIENT_ID'),
  //   clientSecret: env.get('FACEBOOK_CLIENT_SECRET'),
  //   callbackUrl: '',

  //   // Facebook specific
  //   // scopes: ['email', 'user_photos'],
  //   // userFields: ['first_name', 'picture', 'email'],
  //   // display: '',
  //   // authType: '',
  // }),
})

export default allyConfig

declare module '@adonisjs/ally/types' {
  interface SocialProviders extends InferSocialProviders<typeof allyConfig> {}
}
