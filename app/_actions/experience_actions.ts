"use server";

import { getXataClient } from "@/xata";

const xataClient = getXataClient();

export const getExperiences = async () => {
  // fetch experiences
  const resExperiences = await xataClient.db.experience.getAll();
  const experiences = resExperiences.sort((a, b) => b.index - a.index);

  return experiences;
};
