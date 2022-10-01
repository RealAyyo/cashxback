import { Server } from './app/server';

Server.start().catch((e) => {
  console.error(e);
  process.exit(1);
});
