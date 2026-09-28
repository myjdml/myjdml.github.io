import { SITE } from "../config";
import { defineCollection, z, type SchemaContext } from "astro:content";

const schema = ({ image }: SchemaContext) =>
  z.object({
    author: z.string().default(SITE.author),
    pubDatetime: z.date(),
    modDatetime: z.date().optional().nullable(),
    title: z.string(),
    featured: z.boolean().optional(),
    draft: z.boolean().optional(),
    tags: z.array(z.string()).default(["others"]),
    ogImage: image()
      .refine(img => img.width >= 1200 && img.height >= 630, {
        message: "OpenGraph image must be at least 1200 X 630 pixels!",
      })
      .or(z.string())
      .optional(),
    description: z.string(),
    canonicalURL: z.string().optional(),
  });

const blog = defineCollection({ type: "content", schema });
const journal = defineCollection({
  type: "content",
  schema: context =>
    schema(context).extend({
      description: z
        .string()
        .nullish()
        .transform(value => value?.trim() || undefined),
    }),
});

export const collections = { blog, journal };
