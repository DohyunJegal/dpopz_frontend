import type { Metadata } from "next";
import { Suspense } from "react";
import LoginForm from "@/components/LoginForm";

export const metadata: Metadata = { title: "Login - Double Play Optionz" };

export default function LoginPage() {
  return (
    <Suspense>
      <LoginForm />
    </Suspense>
  );
}
