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
        return !file || !file.size || file.size < 1024 * 1024 * 5;
      }, "File size must be less than 5MB"),
    image: z
      .custom<XataFile | undefined>()
      .refine((file) => {
        return (
          !file ||
           file.mediaType.startsWith("image/")
        );
      }, "Must be an image File!")
      .refine((file) => {
        return !file || !file.size || file.size < 1024 * 1024 * 5;
      }, "File size must be less than 5MB"),
  });