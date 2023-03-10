import { mod, Router } from '../deps.ts';

const PATH_ROUTER = `${new URL('.', import.meta.url).pathname}`;
const router = new Router();

const cleanFileName = (fileName: string) => {
  return fileName.split('.').shift();
};

const files = await mod.readdir(PATH_ROUTER);

files.filter((fileName: string) => {
  const cleanName = cleanFileName(fileName);

  if (cleanName !== 'index') {
    import(`./${cleanName}.route.ts`).then((moduleRouter) => {
      router.use(`/${cleanName}`, moduleRouter.router.routes());
    });
  }
});

export { router };
