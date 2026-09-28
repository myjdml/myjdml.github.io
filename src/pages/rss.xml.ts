import rss from "@astrojs/rss";
import { getCollection } from "astro:content";
import getSortedPosts from "../utils/getSortedPosts";
import { SITE } from "../config";

export async function GET() {
  const [posts, journal] = await Promise.all([
    getCollection("blog"),
    getCollection("journal"),
  ]);
  const sortedPosts = getSortedPosts([...posts, ...journal]);
  return rss({
    title: SITE.title,
    description: SITE.desc,
    site: SITE.website,
    items: sortedPosts.map(({ data, slug, collection }) => ({
      link: `${collection === "journal" ? "journal" : "posts"}/${slug}/`,
      title: data.title,
      description: data.description,
      pubDate: new Date(data.modDatetime ?? data.pubDatetime),
      ...(collection === "journal" ? { categories: ["Journal"] } : {}),
    })),
  });
}
