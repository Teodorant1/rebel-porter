import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "@/server/api/trpc";
import { actual_users, posts, arrival } from "@/server/db/schema";
import { and, gte, lte } from "drizzle-orm";

export const postRouter = createTRPCRouter({
  hello: publicProcedure
    .input(z.object({ text: z.string() }))
    .query(({ input }) => {
      return {
        greeting: `Hello ${input.text}`,
      };
    }),

  add_student_arrival: protectedProcedure
    .input(
      z.object({
        name: z.string().min(1),
        surname: z.string().min(1),
        major: z.string().min(2),
        year: z.string(),
        index: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      console.log("id", ctx.session.user.id);

      console.log("ATTEMPTING add_student_arrival");
      console.log("add_student_arrival.input", input);

      try {
        if (ctx.session.user.isAdmin === true) {
          const student_arrival = await ctx.db
            .insert(arrival)
            .values({
              first_name: input.name,
              surname: input.surname,
              major: input.major,
              year: input.year,
              index: input.index,
              authorizer: ctx.session.user.username,
              createdById: ctx.session.user.id,
              createdAt: new Date(),
              updatedAt: new Date(),
              isPublic: false,
            })
            .returning();
          return {
            student_arrival: student_arrival.at(0),
            error: false,
            error_description: null,
          };
        }
      } catch (error) {
        console.error("Error in adding question mutation:", error);
        if (error instanceof Error) {
          console.log(error.message);
          return {
            error: true,
            error_description: error.message,
            student_arrival: null,
          };
        }
      }
    }),

  getLatest_check_ins: protectedProcedure
    .input(z.object({ from: z.date(), to: z.date() }))
    .query(async ({ ctx, input }) => {
      if (ctx.session.user.isAdmin === true) {
        if (input.from && input.to) {
          const arrivals = await ctx.db.query.arrival.findMany({
            where: and(
              gte(arrival.createdAt, input.from),
              lte(arrival.createdAt, input.to),
            ),
          });
          console.log("arrivals", arrivals);

          return arrivals;
        } else {
          const arrivals = await ctx.db.query.arrival.findMany({
            orderBy: (arrival, { desc }) => desc(arrival.createdAt),
            limit: 50,
          });
          return arrivals;
        }
      }

      return [];
    }),
  create: protectedProcedure
    .input(z.object({ name: z.string().min(1) }))
    .mutation(async ({ ctx, input }) => {
      await ctx.db.insert(posts).values({
        name: input.name,
        createdById: ctx.session.user.id,
      });
    }),

  getLatest: protectedProcedure.query(async ({ ctx }) => {
    const post = await ctx.db.query.posts.findFirst({
      orderBy: (posts, { desc }) => [desc(posts.createdAt)],
    });

    return post ?? null;
  }),

  getSecretMessage: protectedProcedure.query(() => {
    return "you can now see this secret message!";
  }),
});
