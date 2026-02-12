import { Navigation } from "@/components/Navigation";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { TechStack } from "@/components/sections/TechStack";
import { Projects } from "@/components/sections/Projects";
import { Timeline } from "@/components/sections/Timeline";
import { Footer } from "@/components/sections/Footer";
import { supabase } from "@/supabase/server";

export default async function Home() {
  const [
    skillsRes,
    aboutProfileRes,
    aboutStatsRes,
    aboutResumeRes,
    footerLinksRes,
    footerContactsRes,
    footerMetaRes,
  ] = await Promise.all([
    supabase.from("skills").select("*"),
    supabase.from("about_profile").select("*").limit(1).maybeSingle(),
    supabase.from("about_stats").select("*").order("sort_order", { ascending: true }),
    supabase.from("about_resume").select("*").limit(1).maybeSingle(),
    supabase.from("footer_links").select("*").order("sort_order", { ascending: true }),
    supabase.from("footer_contacts").select("*").order("sort_order", { ascending: true }),
    supabase.from("footer_meta").select("*").limit(1).maybeSingle(),
  ]);

  return (
    <div className="min-h-screen">
      <Navigation />
      <Hero />
      <About
        profile={aboutProfileRes.data ?? null}
        stats={aboutStatsRes.data ?? []}
        resume={aboutResumeRes.data ?? null}
      />
      <TechStack skills={skillsRes.data ?? []} />
      <Projects />
      <Timeline />
      <Footer
        links={footerLinksRes.data ?? []}
        contacts={footerContactsRes.data ?? []}
        meta={footerMetaRes.data ?? null}
      />
    </div>
  );
}

