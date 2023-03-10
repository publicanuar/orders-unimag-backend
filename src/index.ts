import config from './config.ts';
import { Application, oakCors } from './deps.ts';
import { errorHandler } from './middlewares/error.middleware.ts';
import { router } from './routes/index.ts';

const app = new Application();

app.use(oakCors({
  credentials: true,
  origin: '*',
}));

// Logger
app.use(async (ctx, next) => {
  await next();
  const rt = ctx.response.headers.get('x-response-time');
  console.log(`${ctx.request.method} ${ctx.request.url} - ${rt}`);
});

app.use(errorHandler);

// Routes
app.use(router.routes());
app.use(router.allowedMethods());

const port = config.PORT;
console.log(`Server on port: ${port}`);
await app.listen({ port });
