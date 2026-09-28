import rss from "@astrojs/rss";
import type { ContentEntry } from "../types";
import getSortedPosts from "./getSortedPosts";
import { SITE } from "../config";

interface RssFeedOptions {
  title?: string;
  description?: string;
}

const createRssFeed = (
  entries: ContentEntry[],
  { title = SITE.title, description = SITE.desc }: RssFeedOptions = {}
) => {
  const sortedEntries = getSortedPosts(entries);

  return rss({
    title,
    description,
    site: SITE.website,
    items: sortedEntries.map(({ data, slug, collection }) => ({
      link: `/${collection === "journal" ? "journal" : "posts"}/${slug}/`,
      title: data.title,
      description: data.description,
      pubDate: new Date(data.modDatetime ?? data.pubDatetime),
      ...(collection === "journal" ? { categories: ["Journal"] } : {}),
    })),
  });
};

export default createRssFeed;
