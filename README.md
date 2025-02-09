# Mashgin Menu

The app is live on https://mashgin-menu-self.vercel.app

The backend endpoints are in server/routers/menu.ts

The frontend app components live in app/

## Building Locally

Make sure you've installed nvm, bun, and Docker

```
$ nvm install v22.13.1
$ nvm use v22.13.1
$ bun install
$ ./start-database.sh
$ bun run prisma db push
$ bun run dev
```

To seed the database with the example data run `$ bun run prisma/seed.ts`

## Tools

This is built using [T3 Stack](https://create.t3.gg/)

- [Next.js](https://nextjs.org)
- [Prisma](https://prisma.io)
- [tRPC](https://trpc.io)
- [MySQL](https://mysql.com)

## Deployment

Continuous deployment is set up on Vercel, and image blobs are stored in Vercel blob storage. The MySQL database is running on DigitalOcean.
