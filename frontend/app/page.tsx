"use client";
import React, { useState, useEffect } from "react";
import SplashScreen from "@/components/SplashScreen";
import Footer from "@/components/Footer";
import HeroSection from "@/components/HeroSection";
import MainSection from "@/components/MainSection";
import Navbar from "@/components/Navbar";
import WelcomeMessage from "@/components/WelcomeMessage";
import "./globals.css";

export default function Home() {
  const [isSplashVisible, setIsSplashVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsSplashVisible(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div>
      {isSplashVisible ? (
        <SplashScreen />
      ) : (
        <>
          <Navbar />
          <WelcomeMessage />
          <HeroSection />
          <MainSection />
          <Footer />
        </>
      )}
    </div>
  );
}
