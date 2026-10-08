import type { Metadata } from "next";
import SignupForm from "@/components/SignupForm";

export const metadata: Metadata = { title: "Sign Up - Double Play Optionz" };

export default function SignupPage() {
  return <SignupForm />;
}
