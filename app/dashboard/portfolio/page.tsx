import React, { useEffect, useState } from "react";
import DashboardNav from "../../__components/DashboardNav";
import { FiPlus } from "react-icons/fi";
import { Portfolio } from "@/xata";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { getPortfolios } from "@/app/actions";

const PortfolioPage = async () => {
  const portfolios = await getPortfolios();

  return (
    <div>
      <DashboardNav></DashboardNav>

      <div className=" max-w-5xl my-8 mx-auto">
        <Link href="/dashboard/portfolio/new">
          <Button variant="outline" className=" mb-5">
            <FiPlus className="mr-2 h-4 w-4" /> Add New Portfolio
          </Button>
        </Link>
        {portfolios.map((portfolio) => (
          <Link
            key={portfolio.id}
            href={`/dashboard/portfolio/detail/${portfolio.id}`}
            className={cn(
              "flex gap-4 select-none space-y-1 border rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground mb-3"
            )}
          >
            <Image
              alt={portfolio.image?.name ?? ""}
              width={1000}
              height={1000}
              src={portfolio.image!.url}
              className=" w-[320px] h-[180px] object-cover"
            ></Image>
            <div>
              <div className="text-sm font-medium leading-none">
                {portfolio.title}
              </div>
              <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                {portfolio.description}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default PortfolioPage;
