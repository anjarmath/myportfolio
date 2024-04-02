import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

const DashboardNav = () => {
  return (
    <header className=" px-5 py-3 bg-primary sticky top-0">
      <div className=" max-w-5xl flex justify-between items-center mx-auto">
        <div className=" flex gap-3 text-white">
          <Link href={"/dashboard"} className=" hover:text-primary-foreground">
            Profile
          </Link>
          <Link href={"/dashboard/portfolio"}>Portfolio</Link>
          <Link href={"/dashboard/experience"}>Experience</Link>
          <Link href={"/dashboard/blog"}>Blog</Link>
        </div>

        <Link href={"/api/auth/signout"}>
          <Button>Sign Out</Button>
        </Link>
      </div>
    </header>
  );
};

export default DashboardNav;
