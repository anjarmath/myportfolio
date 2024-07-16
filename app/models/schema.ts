import { XataFile } from "@xata.io/client";
import { z } from "zod";

export const profileFormSchema = z.object({
  greeting: z.string(),
  desc_title: z.string(),
  desc_content: z.string(),
  email: z.string().email(),
  mood: z.string().max(2),
  resume: z
    .custom<XataFile | undefined>()
    .refine((file) => {
      return !file || file.mediaType.startsWith("application/");
    }, "Must be a Document!")
    .refine((file) => {
      return !file || !file.size || file.size < 1024 * 1024 * 2;
    }, "File size must be less than 2MB"),
  image: z
    .custom<XataFile | undefined>()
    .refine((file) => {
      return !file || file.mediaType.startsWith("image/");
    }, "Must be an image File!")
    .refine((file) => {
      return !file || !file.size || file.size < 1024 * 1024 * 5;
    }, "File size must be less than 2MB"),
});

export const portfolioFormSchema = z.object({
  title: z.string(),
  description: z.string(),
  url: z.string().optional(),
  github_url: z.string().optional(),
  image: z
    .custom<XataFile | undefined>()
    .refine((file) => {
      return !file || file.mediaType.startsWith("image/");
    }, "Must be an image File!")
    .refine((file) => {
      return !file || !file.size || file.size < 1024 * 1024 * 5;
    }, "File size must be less than 2MB"),
  is_show: z.boolean().default(true),
  tag: z.array(z.string()),
});

export const experienceFormSchema = z.object({
  company: z.string(),
  title: z.string(),
  period: z.string(),
  index: z.coerce.number(),
});
