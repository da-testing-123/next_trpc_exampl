import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
//defining a synthentic post table
const posts = [
  {
    id: 1,
    title: "First",
    body: "Hello World",
  },
  {
    id: 2,
    title: "Second",
    body: "Foo Bar",
  },
  {
    id: 3,
    title: "Thrid",
    body: "FizzBuzz",
  },
];

export const postRouter = createTRPCRouter({
  create: publicProcedure
    .input(z.object({ title: z.string().min(1), body: z.string().min(1) }))
    .mutation(async ({ input }) => {
      // simulate a slow db call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      posts.push({
        id: posts[posts.length - 1]?.id ?? 0 + 1,
        title: input.title,
        body: input.body,
      });
      return posts;
    }),
  getAllPosts: publicProcedure.query(async () => {
    //const res = await conn.execute("SELECT * FROM Post") // however you interface with your db
    // simulate a slow db call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return posts;
  }),
  getLatest: publicProcedure.query(() => {
    return posts[posts.length - 1];
  }),
});
