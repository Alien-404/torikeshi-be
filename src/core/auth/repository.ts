import { createCustomError } from '@common/contracts/response';
import { config } from '@config/index';
import type { LoginTypeReq } from './validation';
import { generateToken } from '@common/utils/generate-jwt';
import type { UserLoginResponse } from './types';
import { findUserByUsername } from './service';

const createAuthRepo = () => {
  return {
    login: async (req: LoginTypeReq): Promise<UserLoginResponse> => {
      // check user
      const isUser = await findUserByUsername(req.username);
      if (!isUser) throw createCustomError(`not found: ${req.username}`, 404);

      // check password
      const isPassword = await Bun.password.verify(
        req.password,
        isUser.password
      );
      if (!isPassword) throw createCustomError(`invalid credential`, 401);

      // create access token
      const accessToken = await generateToken(
        {
          id: isUser.id,
          username: isUser.username,
          name: isUser.name,
        },
        Math.floor(Date.now() / 1000) + 24 * 3600,
        config.SECRET_KEY
      );

      const response: UserLoginResponse = {
        id: isUser.id,
        name: isUser.name,
        username: isUser.username,
        accessToken,
      };

      return response;
    },
  };
};

export const authRepository = createAuthRepo();
