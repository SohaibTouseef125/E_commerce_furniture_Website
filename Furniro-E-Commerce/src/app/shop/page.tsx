import ShopBannerSection from "@/components/sections/shop/ShopBannerSection";
import ShopFilterSection from "@/components/sections/shop/ShopFilterSection";
import ShopHeroSection from "@/components/sections/shop/ShopHeroSection";
import ShopProductSection from "@/components/sections/shop/ShopProductSection";
import { SearchProvider } from "@/context/searchContext";

function ShopPage() {
  return (
    <div>
      <ShopHeroSection />
      <ShopFilterSection />
      <SearchProvider>
        <div className="mx-4 md:mx-[130px]">
          <ShopProductSection />
        </div>
      </SearchProvider>
      <ShopBannerSection />
    </div>
  );
}

export default ShopPage;
