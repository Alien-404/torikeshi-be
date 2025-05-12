import { config } from '@config/index';

// frameworks
import HonoServer from '@web/hono/index';

// init server
export default {
  port: config.PORT,

  // change http server only change this line
  fetch: HonoServer.fetch,
};
