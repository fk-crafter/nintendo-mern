import Image from "next/image";
import Nintendologo from "@/public/img/nintendologo.png";

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
          <a href="#" className="hover:underline">
            About Us
          </a>
          <a href="#" className="hover:underline">
            Terms of Service
          </a>
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
          <a href="#" aria-label="Facebook" className="hover:opacity-75">
            {/* Icône Facebook */}
          </a>
          <a href="#" aria-label="Twitter" className="hover:opacity-75">
            {/* Icône Twitter */}
          </a>
          <a href="#" aria-label="Instagram" className="hover:opacity-75">
            {/* Icône Instagram */}
          </a>
        </div>
      </div>
    </footer>
  );
}
