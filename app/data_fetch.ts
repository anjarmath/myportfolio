import { Experience, MyProfile, Portfolio } from "@/xata";

export const getProfile = async () => {
  // fetch my profile
  const resMe = await fetch("https://anjar.algieba-id.com/api/profile", {
    cache: "no-store",
  });
  const me: MyProfile = await resMe.json();

  return me;
};

export const getPortfolios = async () => {
  // fetch portfolios
  const resPortfolios = await fetch("https://anjar.algieba-id.com/api/portfolio", {
    cache: "no-store",
  });
  const portfolios: Portfolio[] = await resPortfolios.json();

  return portfolios;
};

export const getExperiences = async () => {
  // fetch experiences
  const resExperiences = await fetch("https://anjar.algieba-id.com/api/experience", {
    cache: "no-store",
  });
  const jsonRes: Experience[] = await resExperiences.json();
  const experiences: Experience[] = jsonRes.sort((a, b) => b.index - a.index);

  return experiences;
};
