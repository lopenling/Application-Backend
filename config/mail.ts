import env from '#start/env'
import { defineConfig, transports } from '@adonisjs/mail'

const mailConfig = defineConfig({
  default: 'smtp',

  from: {
    address: 'no-replay@lopenling.org',
    name: 'Lopenling',
  },

  /**
   * The mailers object can be used to configure multiple mailers
   * each using a different transport or same transport with different
   * options.
   */
  mailers: {
    smtp: transports.smtp({
      host: env.get('SMTP_HOST'),
      port: env.get('SMTP_PORT'),
      /**
       * Uncomment the auth block if your SMTP
       * server needs authentication
       */
      /* auth: {
        type: 'login',
        user: env.get('SMTP_USERNAME'),
        pass: env.get('SMTP_PASSWORD'),
      }, */
    }),

    // Temp disabled, might use in prod
    // mailgun: transports.mailgun({
    //   key: env.get('MAILGUN_API_KEY'),
    //   baseUrl: 'https://api.mailgun.net/v3',
    //   domain: env.get('MAILGUN_DOMAIN'),
    // }),
  },
})

export default mailConfig

declare module '@adonisjs/mail/types' {
  export interface MailersList extends InferMailers<typeof mailConfig> {}
}
