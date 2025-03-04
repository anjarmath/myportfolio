"use server";

import { getXataClient } from "@/xata";
import { profileFormSchema } from "../models/schema";
import { z } from "zod";
import { revalidatePath, unstable_noStore as noStore } from "next/cache";

const xataClient = getXataClient();

export const getProfile = async () => {
  noStore();
  const profileData = await xataClient.db.my_profile.read(
    "rec_clbronl1j6d65ssbjt60"
  );
  // Transform `XataFile` objects into client-compatible plain objects
  const formattedProfile = {
    ...profileData,
    image: profileData?.image
      ? JSON.parse(JSON.stringify(profileData?.image as Object))
      : undefined,
    resume: profileData?.resume
      ? JSON.parse(JSON.stringify(profileData?.resume))
      : undefined,
  };

  return formattedProfile; // Return the transformed profile object
};

export const updateProfile = async (
  data: z.infer<typeof profileFormSchema>
) => {
  try {
    await xataClient.db.my_profile.update("rec_clbronl1j6d65ssbjt60", data);
    revalidatePath("/dashboard");
  } catch (error) {
    return "Failed to update profile!";
  }
};
