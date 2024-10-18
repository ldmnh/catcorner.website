"use client";

import React from "react";
import { ShoppingBag, UserRound, Search } from "lucide-react";
import {
  CustomerHeaderCategories,
  CustomerHeaderNavigation,
  CustomerHeaderLogo,
  CustomerHeaderMenu,
  CustomerHeaderSearch,
  CustomerHeaderCart,
  CustomerHeaderUser,
} from "./components";

export default function CustomerHeader() {
  return (
    <header className="bg-white dark:bg-black shadow-sm w-screen">
      <div className="mx-auto flex justify-between items-center desktop:w-4/5 laptop:w-11/12 phone:block laptop:flex">
        <div className="phone:px-4 phone:py-1 phone:bg-pri-1 dark:bg-teal-700 dark:laptop:bg-transparent laptop:bg-transparent phone:flex phone:justify-between laptop:px-0 tablet:px-9">
          <CustomerHeaderLogo></CustomerHeaderLogo>
          <CustomerHeaderMenu></CustomerHeaderMenu>
        </div>

        <CustomerHeaderNavigation></CustomerHeaderNavigation>
        <CustomerHeaderCategories></CustomerHeaderCategories>

        <div className="phone:px-4 phone:py-3 tablet:px-9 flex justify-between">
          <CustomerHeaderSearch></CustomerHeaderSearch>
          {/* Cart-phone+tablet */}
          <a
            href="#"
            className="laptop:hidden relative flex text-pri-1 dark:text-white hover:text-teal-700 dark:hover:text-teal-300 items-center"
          >
            <div className="relative flex">
              <ShoppingBag />
              <span className="absolute top-3 left-4 bg-orange-500 text-white text-[8px] font-medium w-4 h-4 flex items-center justify-center rounded-full">
                12
              </span>
              <span className="hidden ml-2 font-semibold tablet:block tablet:text-sm">
                Shopping bag
              </span>
            </div>
          </a>
          {/* Cart-phone+tablet */}
        </div>

        <div className="phone:hidden laptop:flex items-center space-x-4">
          <CustomerHeaderUser></CustomerHeaderUser>
          <CustomerHeaderCart></CustomerHeaderCart>
        </div>
      </div>
    </header>
  );
}