import type { Metadata } from "next";
import OTPCalculator from "@/components/OTPCalculator";

export const metadata: Metadata = {
  title: "CalConfig LazyCal",
  description: "The calculator to enter Micros CalConfig ",
};

export default function Page() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8 bg-gray-50">
      <OTPCalculator className="w-full max-w-md" />
    </main>
  );
}