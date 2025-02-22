import Image from "next/image";
import Nintendologo from "@/public/img/nintendologo.png";
import Link from "next/link";
import { Facebook, Instagram } from "lucide-react";
import { FaXTwitter } from "react-icons/fa6";

export default function Footer() {
  return (
    <footer className="bg-red-700 text-white py-8">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center md:items-start">
        <div className="mb-4 md:mb-0">
          <Image
            src={Nintendologo}
            alt="Nintendo Logo"
            width={150}
            height={50}
          />
          <p className="text-sm mt-2">Lorem ipsum dolor sit amet</p>
        </div>
        <div className="flex flex-col space-y-2">
          <Link href="#" className="hover:underline">
            About Us
          </Link>
          <Link href="#" className="hover:underline">
            Terms of Service
          </Link>
          <a href="#" className="hover:underline">
            Privacy Policy
          </a>
        </div>
        <div className="flex flex-col space-y-2">
          <h3 className="text-lg font-semibold">Contact</h3>
          <p>Email: contact@nintendo.com</p>
          <p>Phone: +123 456 789</p>
        </div>
        <div className="flex space-x-4 mt-4 md:mt-0">
          <Link
            href="https://facebook.com"
            target="_blank"
            aria-label="Facebook"
          >
            <Facebook className="w-6 h-6 hover:opacity-75 transition" />
          </Link>
          <Link href="https://x.com" target="_blank" aria-label="X (Twitter)">
            <FaXTwitter className="w-6 h-6 hover:opacity-75 transition" />
          </Link>
          <Link
            href="https://instagram.com"
            target="_blank"
            aria-label="Instagram"
          >
            <Instagram className="w-6 h-6 hover:opacity-75 transition" />
          </Link>
        </div>
      </div>
    </footer>
  );
}
