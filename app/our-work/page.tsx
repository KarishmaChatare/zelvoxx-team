import { Metadata } from "next";
import Navbar from "@/src/components/layout/Navbar";
import Footer from "@/src/components/layout/Footer";
import OurWorkClient from "./OurWorkClient";

export const metadata: Metadata = {
  title: "Our Work | Zelvoxx",
  description:
    "Explore our live client flagships, conversion architectures, and digital systems built for measurable scale.",
  openGraph: {
    title: "Our Work | Zelvoxx",
    description:
      "Explore our live client flagships, conversion architectures, and digital systems built for measurable scale.",
    url: "https://zelvoxx.com/our-work",
  },
};

export default function OurWorkPage() {
  return (
    <>
      <Navbar />
      <OurWorkClient />
      <Footer />
    </>
  );
}
