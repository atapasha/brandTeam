import Navbar from "./navbar";
import Hero from "./hero";
import Trusted from "./trusted";
import { Projects } from "./projects";
import Founders from "./founders";
import Statistics from "./stats";
import Faq from "./faq";
import Footer from "./footer";

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <Trusted />
      <Projects />
      <Founders />
      <Statistics />
      <Faq />
      <Footer />
    </main>
  );
}