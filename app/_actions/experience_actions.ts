"use server";

import { getXataClient } from "@/xata";
import { unstable_noStore as noStore } from "next/cache";

const xataClient = getXataClient();

export const getExperiences = async () => {
  noStore();
  // fetch experiences
  const resExperiences = await xataClient.db.experience.getAll();
  const experiences = resExperiences.sort((a, b) => b.index - a.index);

  return experiences;
};
