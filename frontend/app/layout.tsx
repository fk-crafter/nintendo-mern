import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";
import CustomSessionProvider from "@/components/SessionProvider";
import { CartProvider } from "@/context/CartContext";
import { Toaster } from "@/components/ui/toaster"; // ✅ Import ShadCN Toaster

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Nintendo e-Shop",
  description: "A little shop for Nintendo fans",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fr">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <CustomSessionProvider>
          <AuthProvider>
            <CartProvider>
              <Toaster /> {/* ✅ Utilisation du Toaster de ShadCN */}
              {children}
            </CartProvider>
          </AuthProvider>
        </CustomSessionProvider>
      </body>
    </html>
  );
}
