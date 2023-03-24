import redis from "../config/redis.js";
import { JwtService, CustomErrorHandler } from "../services/index.js";

export const authenticate = async (req, res, next) => {
  try {
    const access_token = req.cookies?.access_token?.split(" ")[1];
    const blacklist = await redis.lrange("blacklist", 0, -1);

    console.log(access_token);
    if (!access_token || blacklist.includes(access_token)) {
      return next(CustomErrorHandler.unAuthorised());
    }

    try {
      const { _id, email } = await JwtService.verify(access_token);
      req.user = { _id, email, access_token };
    } catch (err) {
      return next(err);
    }

    return next();
  } catch (err) {
    return next(CustomErrorHandler.unAuthorised());
  }
};
