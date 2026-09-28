import { slugifyStr } from "../utils/slugify";
import Datetime from "./Datetime";
import type { ContentEntry } from "../types";

export interface Props {
  href?: string;
  frontmatter: ContentEntry["data"];
  secHeading?: boolean;
  typeLabel?: string;
}

export default function Card({
  href,
  frontmatter,
  secHeading = true,
  typeLabel,
}: Props) {
  const { title, pubDatetime, modDatetime, description } = frontmatter;

  const headerProps = {
    style: { viewTransitionName: slugifyStr(title) },
    className: "text-lg font-medium decoration-dashed hover:underline",
  };

  return (
    <li className="my-6">
      {typeLabel && (
        <span className="mb-1 block text-sm uppercase tracking-wide opacity-70">
          {typeLabel}
        </span>
      )}
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
      <p>{description}</p>
    </li>
  );
}
