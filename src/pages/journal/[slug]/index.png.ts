import type { APIRoute } from "astro";
import { getCollection, type CollectionEntry } from "astro:content";
import { generateOgImageForPost } from "../../../utils/generateOgImages";
import { slugifyStr } from "../../../utils/slugify";
import getSortedPosts from "../../../utils/getSortedPosts";

export async function getStaticPaths() {
  const entries = getSortedPosts(await getCollection("journal")).filter(
    ({ data }) => !data.ogImage
  );

  return entries.map(post => ({
    params: { slug: slugifyStr(post.data.title) },
    props: post,
  }));
}

export const GET: APIRoute = async ({ props }) =>
  new Response(
    await generateOgImageForPost(props as CollectionEntry<"journal">),
    { headers: { "Content-Type": "image/png" } }
  );
