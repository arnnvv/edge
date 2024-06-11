import { initTRPC } from "@trpc/server";
import { experimental_nextAppDirCaller } from "@trpc/server/adapters/next-app-dir";
import { currentUser } from "./auth";

interface Meta {
  span: string;
}

export const t = initTRPC.meta<Meta>().create();

const serverActionProcedure = t.procedure
  .experimental_caller(
    experimental_nextAppDirCaller({
      pathExtractor: ({ meta }): string => (meta as Meta).span,
    }),
  )
  .use(async (req) => {
    const user = await currentUser();
    return req.next({ ctx: { user } });
  });
