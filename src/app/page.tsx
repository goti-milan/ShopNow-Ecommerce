import Banner from "@/components/home/Banner";
import Category from "@/components/home/Category";
import CollectionGrid from "@/components/home/CollectionGrid";
import DealOfWeek from "@/components/home/DealofWeek";
import ServicesSection from "@/components/home/ServiceSection";
import TrendingProduct from "@/components/home/TrendingProduct";

export default function Home() {
  return (
    <>
      <Banner />
      <CollectionGrid />
      <Category />
      <TrendingProduct />
      <DealOfWeek />
      <ServicesSection />
    </>
  );
}
