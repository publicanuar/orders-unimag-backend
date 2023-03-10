FROM denoland/deno:alpine-1.31.1
EXPOSE 3000
RUN mkdir -p /home/app
COPY . /home/app
RUN deno cache home/app/src/deps.ts
RUN deno fmt home/app
CMD ["run", "--allow-all", "home/app/src/index.ts"]