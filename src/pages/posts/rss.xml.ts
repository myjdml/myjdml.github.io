import { getCollection } from "astro:content";
import createRssFeed from "../../utils/createRssFeed";

export async function GET() {
  return createRssFeed(await getCollection("blog"));
}
