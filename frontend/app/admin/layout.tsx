"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      role?: string;
    } & {
      name?: string | null;
      email?: string | null;
      image?: string | null;
    };
  }
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "loading") return;
    if (!session || !session.user || session.user.role !== "admin") {
      router.push("/");
    }
  }, [session, status, router]);

  if (status === "loading" || !session) {
    return <p>Loading...</p>;
  }

  return <>{children}</>;
}
