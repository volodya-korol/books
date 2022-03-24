import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import * as joi from '@hapi/joi';

@Module({
  imports: [
    ConfigModule.forRoot({
      validationSchema: joi.object({
        // global
        PORT: joi.number().required(),
        // postgres
        POSTGRES_URL: joi.string().required(),
        // jwt
        JWT_SECRET_KEY: joi.string().required(),
        JWT_TOKEN_EXPIRATION_TIME: joi.string().required(),
        // send email
        SENDMAIL_EMAIL: joi.string().email().required(),
        SENDMAIL_PASSWORD: joi.string().required(),
        // cache
        CACHE_TTL: joi.number().required(),
        // elasticsearch
        ELASTICSEARCH_NODE: joi.string().required(),
        ELASTICSEARCH_USERNAME: joi.string().required(),
        ELASTICSEARCH_PASSWORD: joi.string().required(),
      }),
    }),
  ],
})
export class EnvConfigModule {}
