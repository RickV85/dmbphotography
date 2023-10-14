"use client";

import { useEffect } from "react";
import styles from "../../about_contact/page.module.css";

export default function AboutTextAnimator() {
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        entry.target.classList.add(styles["pre-animate-hide"]);
        if (entry.isIntersecting) {
          entry.target.classList.add(styles["animate-in"]);
        }
      });
    }, {threshold: .25});

    const bioText = document.querySelectorAll(".page_bio-text__gnrlz");
    const clientDiv = document.querySelector("#clientDiv");
    const contactHeading = document.querySelector("#contactHeading");
    const address = document.querySelector("#address");

    if (bioText) bioText.forEach((node) => observer.observe(node));
    if (clientDiv) observer.observe(clientDiv);
    if (contactHeading) observer.observe(contactHeading);
    if (address) observer.observe(address);

    return () => {
      if (bioText) bioText.forEach((node) => observer.unobserve(node));
      if (clientDiv) observer.unobserve(clientDiv);
      if (contactHeading) observer.unobserve(contactHeading);
      if (address) observer.unobserve(address);
    };
  }, []);

  return null;
}
