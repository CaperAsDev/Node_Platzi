import  boom from "@hapi/boom";
import { config } from "../config/config.js";

export function checkApiKey (req, res, next) {
  const apiKey = req.headers.api;
  if (apiKey === config.apiKey) {
    next();
  } else {
    next(boom.unauthorized({message: 'Invalid API KEY in headers request'}));
  }
}
export function checkAdminRole (req, res, next) {
  const user = req.user;
  if (user.role === 'admin') {
    next();
  } else {
    next(boom.unauthorized());
  }
}
export function checkRoles (roles) {
  return (req, res, next) => {
    const user = req.user;
    if (roles.includes(user.role)) {
      next();
    } else {
      next(boom.unauthorized());
    }
  }
}
