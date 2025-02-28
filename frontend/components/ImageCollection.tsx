"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image1 from "@/public/img/hero1.png";
import Image2 from "@/public/img/hero2.png";
import Image3 from "@/public/img/hero3.png";

gsap.registerPlugin(ScrollTrigger);

const images = [
  { src: Image1, title: "Zelda Collection", text: "Choose your own world" },
  { src: Image2, title: "Mario Collection", text: "Jump into the adventure" },
  { src: Image3, title: "Pokémon Collection", text: "Catch them all" },
];

export default function ImageCollection() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const imagesRef = useRef<HTMLDivElement[]>([]);
  const [activeText, setActiveText] = useState(images[0].text);

  useEffect(() => {
    if (!containerRef.current || imagesRef.current.length === 0) return;

    const sections = imagesRef.current;

    gsap.to(sections, {
      y: `-${window.innerHeight * (sections.length - 1)}px`,
      ease: "power1.inOut",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: `+=${window.innerHeight * sections.length}`,
        scrub: true,
        pin: true,
      },
    });

    sections.forEach((section, index) => {
      gsap.to(section, {
        scale: 1.3,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
          onUpdate: (self) => {
            if (self.progress > 0.5) {
              setActiveText(images[index].text);
            }
          },
        },
      });
    });
  }, []);

  return (
    <div ref={containerRef} className="relative w-full">
      {/* Texte Fixe Dynamique */}
      <div className="absolute top-20 left-1/2 -translate-x-1/2 text-5xl font-extrabold text-[#E60012] drop-shadow-lg uppercase tracking-wide transition-all duration-500 ease-in-out">
        {activeText}
      </div>

      {images.map((image, index) => (
        <div
          key={index}
          ref={(el) => {
            if (el) imagesRef.current[index] = el;
          }}
          className="w-full h-screen flex justify-center items-center"
        >
          <Image
            src={image.src}
            alt={image.title}
            className="object-contain w-[40vw] h-[40vh] max-w-screen max-h-screen"
          />

          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 bg-black bg-opacity-60 px-6 py-3 rounded-lg text-white text-xl font-semibold">
            {image.title}
          </div>
        </div>
      ))}
    </div>
  );
}
