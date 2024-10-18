"use client";

import React from "react";
import Image from "next/image";
import { useUser, UserButton } from "@clerk/nextjs";
import Link from "next/link";
import styles from "../styles.module.css";

function Header() {
  const { user, isSignedIn } = useUser();
  return (
    <div className={styles.header}>
      <div className={styles.logoContainer}>
        <Image
          src={"/pumpkin.png"}
          alt="Logo"
          width={50}
          height={55}
          priority={true}
        ></Image>
        <span className={styles.brandName}>Spookify</span>
      </div>


    </div>
  );
}

export default Header;
