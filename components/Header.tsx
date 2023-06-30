"use client";

import React from "react";
import { SignedIn, UserButton } from "@clerk/nextjs";

const Header = () => {
  return (
    <header
      className="
  justify-right
  flex
  items-center
  gap-4
  p-4
  "
    >
      <SignedIn>
        <UserButton />
      </SignedIn>
    </header>
  );
};

export default Header;
