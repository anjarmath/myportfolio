"use client";

import React, { useState, Key } from "react";
import Link from "next/link";
import { HiMenuAlt3 } from "react-icons/hi";

interface MenuItem {
  id: Key;
  title: String;
  route: String;
}

const NavBar = () => {
  const menuItems: MenuItem[] = [
    {
      id: 1,
      title: "Home",
      route: "#home",
    },
    {
      id: 2,
      title: "About Me",
      route: "#profile",
    },
    {
      id: 3,
      title: "Services",
      route: "#tools",
    },
    {
      id: 4,
      title: "Portfolio",
      route: "#portfolio",
    },
    {
      id: 5,
      title: "Post",
      route: "#",
    },
  ];

  const [showDrawer, setShowDrawer] = useState(false);
  function drawerButtonClick() {
    setShowDrawer(!showDrawer);
  }

  return (
    <div className=" bg-white py-3 px-5 border-b sticky top-0 z-50">
      <div className=" max-w-5xl flex gap-4 items-center justify-between mx-auto">
        <Link href={"#"}>
          <h1 className=" font-bold text-hprimary text-2xl">Anjar.Hariadi</h1>
        </Link>
        <div
          className={` flex flex-col lg:flex-row p-4 justify-center shadow-md lg:shadow-none bg-white gap-4  items-center fixed lg:static w-[70%] lg:w-max h-screen lg:h-fit ${
            showDrawer ? "left-0" : "left-[-100%]"
          } top-0 transition-all`}
        >
          <ul className=" flex flex-col lg:flex-row gap-4">
            {menuItems.map((item) => (
              <li key={item.id}>
                <Link href={`${item.route}`} className=" hover:text-hprimary">
                  {item.title}
                </Link>
              </li>
            ))}
          </ul>
          <Link
            href={"#contact"}
            className=" p-3 rounded-md bg-hprimary hover:bg-hprimary-dark text-white transition-colors"
          >
            Contact Me
          </Link>
        </div>
        <button className=" p-3 block lg:hidden" onClick={drawerButtonClick}>
          <HiMenuAlt3></HiMenuAlt3>
        </button>
      </div>
    </div>
  );
};

export default NavBar;
