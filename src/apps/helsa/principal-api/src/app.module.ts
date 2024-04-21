import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { getEnv } from './config/env.config';
import { FlagModule } from './modules/flag/flag.module';
import { confFiles } from './modules/shared/providers/confIgurations.provider';
import { SharedModule } from './modules/shared/shared.module';
import { UserModule } from './modules/user/user.module';
import { GraphQLErrorHandling } from './utils/ErrorHandlers/GQLErrorHandler';
import { JWTStrategy } from './utils/Strategies/JWTStrategy';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: getEnv(),
      load: [...confFiles],
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      typePaths: ['./**/*.graphql'],
      formatError: GraphQLErrorHandling,
      useGlobalPrefix: true,
      csrfPrevention: false,
    }),
    SharedModule,
    UserModule,
    FlagModule,
  ],
  providers: [JWTStrategy],
})
export class AppModule {}
