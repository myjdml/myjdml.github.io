import { slugifyStr } from "../utils/slugify";
import getContentExcerpt from "../utils/getContentExcerpt";
import Datetime from "./Datetime";
import type { CollectionEntry } from "astro:content";

export interface Props {
  href?: string;
  frontmatter: CollectionEntry<"journal">["data"];
  body: string;
  secHeading?: boolean;
}

export default function JournalCard({
  href,
  frontmatter,
  body,
  secHeading = true,
}: Props) {
  const { title, pubDatetime, modDatetime } = frontmatter;

  const headerProps = {
    style: { viewTransitionName: slugifyStr(title) },
    className: "text-lg font-medium decoration-dashed hover:underline",
  };

  return (
    <li className="my-6">
      <a
        href={href}
        className="inline-block text-lg font-medium text-skin-accent decoration-dashed underline-offset-4 focus-visible:no-underline focus-visible:underline-offset-0"
      >
        {secHeading ? (
          <h2 {...headerProps}>{title}</h2>
        ) : (
          <h3 {...headerProps}>{title}</h3>
        )}
      </a>
      <Datetime pubDatetime={pubDatetime} modDatetime={modDatetime} />
      <p className="line-clamp-3">{getContentExcerpt(body)}</p>
    </li>
  );
}
