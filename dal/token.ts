import { mongooseConnect } from '@/lib/mongoose';
import { Models } from '@/models/models';

export const getTokenObjBySessionToken = async (session: string) => {
  try {
    // await mongooseConnect();
    const token = await Models.Token.findOne({ refreshToken: session });
    if (!token) {
      return null;
    }
    return token;
  } catch (error) {
    return null;
  }
};
