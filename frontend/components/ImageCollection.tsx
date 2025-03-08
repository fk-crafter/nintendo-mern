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
  const containerRef = useRef(null);
  const imagesRef = useRef<HTMLDivElement[]>([]);
  const [activeText, setActiveText] = useState(images[0].text);

  useEffect(() => {
    if (!containerRef.current || imagesRef.current.length === 0) return;

    const sections = imagesRef.current;
    const totalHeight = window.innerHeight * (sections.length - 1);

    gsap.to(sections, {
      y: `-${totalHeight}px`,
      ease: "power1.inOut",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: `+=${totalHeight}px`,
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
    <div ref={containerRef} className="relative w-full h-[120vh]">
      <div className="absolute top-24 lg:top-32 left-1/2 -translate-x-1/2">
        <div
          key={activeText}
          className="text-xl lg:text-4xl font-extrabold text-[#E60012] drop-shadow-[0_0_10px_rgba(255,0,0,0.6)] uppercase tracking-wide text-center whitespace-nowrap animate-fadeInOut"
        >
          {activeText}
        </div>
      </div>

      {images.map((image, index) => (
        <div
          key={index}
          ref={(el) => {
            if (el) imagesRef.current[index] = el;
          }}
          className="w-full h-screen flex justify-center items-center relative"
        >
          <Image
            src={image.src}
            alt={image.title}
            className="object-contain w-[80vw] h-[30vh] lg:w-[40vw] lg:h-[40vh] max-w-screen max-h-screen"
          />

          <div
            className={`absolute bottom-16 lg:bottom-20 left-1/2 -translate-x-1/2 px-4 py-2 lg:px-6 lg:py-3 rounded-lg text-white text-sm lg:text-xl font-semibold ${
              index === 0
                ? "bg-green-800"
                : index === 1
                ? "bg-red-800"
                : "bg-yellow-600"
            }`}
          >
            {image.title}
          </div>
        </div>
      ))}
    </div>
  );
}
