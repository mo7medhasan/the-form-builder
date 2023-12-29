import Link from "next/link";
import React from "react";

function Logo() {
  return (
    <Link
      href={"/"}
      className="font-bold text-3xl bg-gradient-to-r from-[#d56da1] to-[#d153ea] text-transparent bg-clip-text hover:cursor-pointer font-Petit"
    >
      FormBuilder
    </Link>
  );
}

export default Logo;