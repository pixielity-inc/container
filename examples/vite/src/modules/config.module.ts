import { Module, forRoot, type DynamicModule } from "@abdokouta/react-di";
import { ConfigService, type AppConfig } from "@/services/config.service";
import { CONFIG_SERVICE, APP_CONFIG } from "@/constants";

@Module({})
export class ConfigModule {
  /**
   * Dynamic module pattern: forRoot
   * Used to configure a module with runtime options
   */
  static forRoot(config: AppConfig): DynamicModule {
    return forRoot(ConfigModule, {
      providers: [
        {
          provide: APP_CONFIG,
          useValue: config,
        },
        {
          provide: CONFIG_SERVICE,
          useFactory: (context) => () => {
            const options = context.container.get<AppConfig>(APP_CONFIG);

            return new ConfigService(options);
          },
        },
      ],
      exports: [CONFIG_SERVICE],
    });
  }
}
