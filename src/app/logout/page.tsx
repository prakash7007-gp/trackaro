"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function LogoutPage() {
  const router = useRouter();

  useEffect(() => {
    document.cookie = "token=; Max-Age=0; path=/";
    router.push("/login");
  }, [router]); // ✅ no more ESLint warning

  return <p>Logging out...</p>;
}
