import rss from "@astrojs/rss";
import { getCollection } from "astro:content";
import getSortedPosts from "../../utils/getSortedPosts";
import { SITE } from "../../config";

export async function GET() {
  const sortedJournal = getSortedPosts(await getCollection("journal"));

  return rss({
    title: `${SITE.title} Journal`,
    description: "Short records and notes.",
    site: SITE.website,
    items: sortedJournal.map(({ data, slug }) => ({
      link: `journal/${slug}/`,
      title: data.title,
      description: data.description,
      pubDate: new Date(data.modDatetime ?? data.pubDatetime),
      categories: ["Journal"],
    })),
  });
}
