import Banner from "@/components/home/Banner";
import Category from "@/components/home/Category";
import CollectionGrid from "@/components/home/CollectionGrid";
import DealOfWeek from "@/components/home/DealofWeek";
import ServicesSection from "@/components/home/ServiceSection";
import TrendingProduct from "@/components/home/TrendingProduct";
import RecentlyReviewed from "@/components/home/RecentlyReviewed";
import Ticker from "@/components/home/Ticker";
import NewArrivals from "@/components/home/NewArrivals";
import FeaturedProducts from "@/components/home/FeaturedProducts";
import FlashSale from "@/components/home/FlashSale";
import TodayDeals from "@/components/home/TodayDeals";
import ComboOffers from "@/components/home/ComboOffers";

export default function Home() {
  return (
    <>
      <Banner />
      <Ticker />
      <CollectionGrid />
      <Category />

      {/* New Separate Sections */}
      <NewArrivals />
      <FeaturedProducts />
      <FlashSale />
      <TodayDeals />
      <ComboOffers />

      <TrendingProduct />
      <RecentlyReviewed />
      <DealOfWeek />
      <ServicesSection />
    </>
  );
}
