/* eslint-disable no-console */

import { register } from "register-service-worker";

register(`${process.env.BASE_URL}sw.js`, {
  ready() {},
  cached(registration) {},
  updatefound(registration) {},
  updated(registration) {},
  offline() {},
  error(error) {}
});
