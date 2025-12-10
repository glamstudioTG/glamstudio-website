import 'reflect-metadata';

import { MODULE_METADATA } from '@nestjs/common/constants';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';

import { AuthModule } from './auth.module';

describe('AuthModule', () => {
  it('correctly loads JWT_SECRET using ConfigService', () => {
    const imports = Reflect.getMetadata(MODULE_METADATA.IMPORTS, AuthModule) as any[];

    const jwtDynamicModule = imports.find((item) => item && item.module === JwtModule);

    expect(jwtDynamicModule).toBeDefined();

    const jwtOptionsProvider = (jwtDynamicModule.providers as any[]).find(
      (provider) =>
        provider &&
        typeof provider.useFactory === 'function' &&
        Array.isArray(provider.inject) &&
        provider.inject.includes(ConfigService),
    );

    expect(jwtOptionsProvider).toBeDefined();

    const configServiceMock = {
      get: jest.fn().mockReturnValue('test-secret'),
    } as unknown as ConfigService;

    jwtOptionsProvider.useFactory(configServiceMock);

    expect(configServiceMock.get).toHaveBeenCalledWith('JWT_SECRET');
  });

  it('correctly registers JwtModule asynchronously with ConfigModule imported', () => {
    const imports = Reflect.getMetadata(MODULE_METADATA.IMPORTS, AuthModule) as any[];

    const jwtDynamicModule = imports.find((item) => item && item.module === JwtModule);

    expect(jwtDynamicModule).toBeDefined();
    expect(jwtDynamicModule.imports).toContain(ConfigModule);
  });
});
