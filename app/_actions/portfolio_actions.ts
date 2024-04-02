"use server";

import { getXataClient } from "@/xata";
import { portfolioFormSchema } from "../models/schema";
import { z } from "zod";
import { revalidatePath } from "next/cache";

const xataClient = getXataClient();

export const getPortfolios = async () => {
  const portfolios = await xataClient.db.portfolio.getAll();

  return portfolios;
};

export const getPortfolioById = async (id: string) => {
  const data = await xataClient.db.portfolio.read(id);
  const formattedData = {
    ...data,
    image: data?.image
      ? JSON.parse(JSON.stringify(data?.image as Object))
      : undefined,
  };
  return formattedData;
};

export const addPortfolio = async (
  data: z.infer<typeof portfolioFormSchema>
) => {
  try {
    await xataClient.db.portfolio.create(data);
    revalidatePath(`/dashboard/portfolio`);
  } catch (error) {
    return "Failed to create portfolio!";
  }
};

export const updatePortfolio = async (
  id: string,
  data: z.infer<typeof portfolioFormSchema>
) => {
  try {
    await xataClient.db.portfolio.update(id, data);
    revalidatePath(`/dashboard/portfolio/detail/${id}`);
  } catch (error) {
    return "Failed to update portfolio!";
  }
};

export const deletePortfolio = async (id: string) => {
  try {
    await xataClient.db.portfolio.delete(id);
    revalidatePath(`/dashboard/portfolio`);
  } catch (error) {
    return "Failed to delete portfolio!";
  }
};
