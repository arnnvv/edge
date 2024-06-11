import { createClient } from "@libsql/client";
import { drizzle } from "drizzle-orm/libsql";

const getTursoCredentials: () => {
  tursoURL: string;
  tursoAuthToken: string;
} = (): {
  tursoURL: string;
  tursoAuthToken: string;
} => {
  const tursoURL: string | undefined = process.env.TURSO_DATABASE_URL;
  const tursoAuthToken: string | undefined = process.env.TURSO_AUTH_TOKEN;

  if (!tursoURL || tursoURL.length === 0) {
    throw new Error("TURSO_DATABASE_URL is not set");
  }

  if (!tursoAuthToken || tursoAuthToken.length === 0) {
    throw new Error("TURSO_AUTH_TOKEN is not set");
  }

  return {
    tursoURL,
    tursoAuthToken,
  };
};

const client = createClient({
  url: getTursoCredentials().tursoURL,
  authToken: getTursoCredentials().tursoAuthToken,
});

const db = drizzle(client);

export default db;
