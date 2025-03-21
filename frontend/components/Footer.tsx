import Image from "next/image";
import Nintendologo from "@/public/img/nintendologo.png";
import Link from "next/link";
import { Facebook, Instagram, Linkedin } from "lucide-react";
import { FaXTwitter, FaYoutube } from "react-icons/fa6";

export default function Footer() {
  return (
    <footer className="bg-red-700 text-white py-8">
      <div className="max-w-screen-xl mx-auto px-6 flex flex-col md:flex-row md:justify-between md:items-start">
        <div className="mb-6 md:mb-0 text-center md:text-left">
          <Image
            src={Nintendologo}
            alt="Nintendo Logo"
            width={150}
            height={50}
          />
          <p className="text-sm mt-2 max-w-xs">
            Nintendo, a pioneer in video gaming for decades. Discover our
            consoles, games, and innovations!
          </p>
        </div>

        <div className="grid grid-cols-2 md:flex md:space-x-8 text-center md:text-left mb-6 md:mb-0">
          <div>
            <h3 className="font-semibold mb-2">Information</h3>
            <Link href="#" className="block hover:underline">
              About Us
            </Link>
            <Link href="#" className="block hover:underline">
              Careers
            </Link>
            <Link href="#" className="block hover:underline">
              Support
            </Link>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Legal</h3>
            <Link href="#" className="block hover:underline">
              Terms of Service
            </Link>
            <Link href="#" className="block hover:underline">
              Privacy Policy
            </Link>
            <Link href="#" className="block hover:underline">
              Cookies
            </Link>
          </div>
        </div>

        <div className="text-center md:text-left">
          <h3 className="font-semibold mb-2">Contact</h3>
          <p>Email: support@nintendo.com</p>
          <p>Phone: +123 456 789</p>
        </div>

        <div className="text-center mt-5 lg:mt-0 md:text-left">
          <h3 className="font-semibold mb-2">Follow Us</h3>
          <div className="flex justify-center md:justify-start space-x-4">
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
            <Link
              href="https://linkedin.com"
              target="_blank"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-6 h-6 hover:opacity-75 transition" />
            </Link>
            <Link
              href="https://youtube.com"
              target="_blank"
              aria-label="YouTube"
            >
              <FaYoutube className="w-6 h-6 hover:opacity-75 transition" />
            </Link>
          </div>

          <div className="mt-4">
            <h3 className="font-semibold mb-2">Subscribe to our Newsletter</h3>
            <div className="flex items-center justify-center md:justify-start">
              <input
                type="email"
                placeholder="Enter your email"
                className="px-4 py-2 rounded-l-md text-black"
              />
              <button className="bg-black px-4 py-2 rounded-r-md hover:bg-gray-800">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 border-t border-white/25 pt-4 text-center text-sm">
        &copy; {new Date().getFullYear()} Nintendo. All rights reserved.
      </div>
    </footer>
  );
}
