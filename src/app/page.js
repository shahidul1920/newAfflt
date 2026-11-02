import Header from "@/components/Header";
import Ticker from "@/components/Ticker";
import HeroGrid from "@/components/HeroGrid";
import LatestReporting from "@/components/LatestReporting";
import TopicBands from "@/components/TopicBands";
import EditorialStandards from "@/components/EditorialStandards";
import Footer from "@/components/Footer";
import {
  getAllCategories,
  getTickerItems,
  getHeroLeadPost,
  getHeroSidePosts,
  getLatestReportingPosts,
  getTopicBands,
} from "@/lib/wordpress";

export const metadata = {
  title: "Longevity Reviewed – Longevity is confusing. Let's fix that.",
  description: "Independent, evidence-based reporting on human longevity, diet, exercise science, sleep, and emerging biotechnology.",
};

export default async function HomePage() {
  const [
    categories,
    tickerItems,
    leadPost,
    sidePosts,
    latestReportingPosts,
    bands,
  ] = await Promise.all([
    getAllCategories(),
    getTickerItems(),
    getHeroLeadPost(),
    getHeroSidePosts(),
    getLatestReportingPosts(),
    getTopicBands(),
  ]);

  return (
    <div className="lr-home">
      <Header categories={categories} />
      <Ticker items={tickerItems} />
      <HeroGrid leadPost={leadPost} sidePosts={sidePosts} />
      <LatestReporting posts={latestReportingPosts} />
      <TopicBands bands={bands} />
      <EditorialStandards />
      <Footer />
      <a href="#1" className="sticky-cta">
        See Top Pick →
      </a>
    </div>
  );
}
