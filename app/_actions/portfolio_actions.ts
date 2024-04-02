"use server";

import { getXataClient } from "@/xata";

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
