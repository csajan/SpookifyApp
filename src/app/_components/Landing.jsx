"use client";

import React from "react";
import Image from "next/image";
import { useUser, UserButton } from "@clerk/nextjs";
import Link from "next/link";
import styles from "../landing.module.css";

function Landing() {
  const { user, isSignedIn } = useUser();
  return (
    <>

    <div className={styles.container}>

        <div className={styles.leftside}>

          <div className={styles.imageContainer}>
              <Image className={styles.image}
                src={"/herophoto.png"}
                alt="Logo"
                width={600}
                height={600}
              ></Image>
          </div>

        </div>

         
          
        <div className={styles.rightside}>

          <div className={styles.titlesContainer}>
              <Image className={styles.titles}
                src={"/titles.png"}
                alt="Logo"
                width={2560/2}
                height={1440/2}
              ></Image>
          </div>




           {isSignedIn ? (
            <UserButton />
          ) : (
            <div className={styles.buttonsContainer}>
              <Link href="/sign-in">
                <button className={styles.button}>Get started</button>
              </Link>
            </div>
          )}


        </div>
    </div>

      
      </>
  );
}

export default Landing;
