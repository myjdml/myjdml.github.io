import { getCollection } from "astro:content";
import createRssFeed from "../utils/createRssFeed";

export async function GET() {
  const [posts, journal] = await Promise.all([
    getCollection("blog"),
    getCollection("journal"),
  ]);

  return createRssFeed([...posts, ...journal]);
}
