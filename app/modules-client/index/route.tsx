import { BuildWith } from "~/components/landingpage/BuildWith";
import { Feature } from "~/components/landingpage/Feature";
import { Footer } from "~/components/landingpage/footer";
import { Hero } from "@/components/landingpage/Hero/inde";
import { Tiper } from "@/components/landingpage/Tiper";

export function Route() {
  return (
    <div className="flex flex-col pt-[200px] items-center">
      <Tiper title="2025" content="👋 Happy New Year" />
      <Hero />
      <BuildWith />
      <Feature />
      <Footer />
    </div>
  );
}
