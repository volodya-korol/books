import { Global, Module } from '@nestjs/common';
import { EnvConfigModule } from './config/envConfig.module';
import { ElasticSearchModule } from './database/elasticsearch/elasticsearch.module';
import { PostgresModule } from './database/postgres/postgres.module';
import { MailModule } from './mail/mail.module';

@Global()
@Module({
  imports: [EnvConfigModule, PostgresModule, MailModule, ElasticSearchModule],
})
export class ProvidersModule {}
