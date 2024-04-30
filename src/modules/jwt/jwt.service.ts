import * as jwt from 'jsonwebtoken';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ETokenType } from './enums/token.-type.enum';
import { IEmailPayload } from './interfaces/email-token.interface';
import { IAccessPayload } from './interfaces/access-token.interface';
import { UserEntity } from '../tenanted/users/entities/user.entity';

@Injectable()
export class JwtService {
  private readonly jwtConfig;
  private readonly issuer: string;
  private readonly domain: string;

  constructor(private readonly configService: ConfigService) {
    this.jwtConfig = this.configService.get('jwt');
    this.issuer = this.configService.get('appId');
    this.domain = this.configService.get('domain');
  }

  async generateToken(user: UserEntity, tokenType: ETokenType) {
    const jwtOptions: jwt.SignOptions = {
      issuer: this.issuer,
      subject: user.email,
      audience: this.domain,
    };

    switch (tokenType) {
      case ETokenType.CONFIRMATION:
        const { secret, time } = this.jwtConfig[tokenType];
        const payload = {
          id: user.id,
          version: user.credential.version,
        };
        const options = {
          ...jwtOptions,
          expiresIn: time,
        };
        return JwtService.generateTokenAsync(payload, secret, options);
    }
  }

  private static async generateTokenAsync(
    payload: IAccessPayload | IEmailPayload,
    secret: string,
    options: jwt.SignOptions,
  ): Promise<string> {
    return new Promise((resolve, rejects) => {
      jwt.sign(payload, secret, options, (err, token) => {
        if (err) {
          rejects(err);
          return;
        }
        resolve(token);
      });
    });
  }

  private static async verifyTokenAsync(
    token: string,
    secret: string,
    options: jwt.VerifyOptions,
  ) {
    return new Promise((resolve, reject) => {
      jwt.verify(token, secret, options, (err, decoded) => {
        if (err) {
          reject(err);
          return;
        }
        resolve(decoded);
      });
    });
  }
}
