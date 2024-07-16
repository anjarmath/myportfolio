"use server";

import { getXataClient } from "@/xata";
import { unstable_noStore as noStore, revalidatePath } from "next/cache";
import { experienceFormSchema } from "../models/schema";
import { z } from "zod";

const xataClient = getXataClient();

export const getExperiences = async () => {
  noStore();
  // fetch experiences
  const resExperiences = await xataClient.db.experience.getAll();
  const experiences = resExperiences.sort((a, b) => b.index - a.index);

  return experiences;
};

export const addExperience = async (
  data: z.infer<typeof experienceFormSchema>
) => {
  try {
    await xataClient.db.experience.create(data);
    revalidatePath(`/dashboard/experience`);
  } catch (error) {
    return "Failed to create experience!";
  }
};

export const updateExperience = async (
  id: string,
  data: z.infer<typeof experienceFormSchema>
) => {
  try {
    await xataClient.db.experience.update(id, data);
    revalidatePath(`/dashboard/experience`);
  } catch (error) {
    return "Failed to update experience!";
  }
};

export const deleteExperience = async (id: string) => {
  noStore();

  try {
    await xataClient.db.experience.delete(id);
    revalidatePath(`/dashboard/experience`);
  } catch (error) {
    return "Failed to delete experience!";
  }
};
