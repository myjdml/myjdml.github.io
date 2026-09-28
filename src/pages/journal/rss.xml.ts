import { getCollection } from "astro:content";
import createRssFeed from "../../utils/createRssFeed";
import { SITE } from "../../config";

export async function GET() {
  return createRssFeed(await getCollection("journal"), {
    title: `${SITE.title} Journal`,
    description: "Short records and notes.",
  });
}
