"use client";

import { useSearch } from "@/context/searchContext";
import { useEffect, useState } from "react";
import { client } from "@/sanity/lib/client"; // Ensure correct import
import { ImportedData } from "@/types"; // Ensure ImportedData is properly defined in your types
import { query } from "@/utils/query"; // Ensure the query is a valid GROQ query
// import ProductCard from "@/components/cards/ProductCard"; // Ensure ProductCard is exported correctly
import MainButton from "@/components/common/MainButton"; // Ensure MainButton is exported correctly

import ProductCard from "@/components/cards/ProductCard";

function OurProductSection() {
  const { searchQuery } = useSearch(); // Context for search input
  const [PRODUCTS, setPRODUCTS] = useState<ImportedData[]>([]); // Products state
  const [skipNumberOfProducts, setSkipNumberOfProducts] = useState<number>(8); // Pagination state

  useEffect(() => {
    const fetchDataFromSanity = async () => {
      try {
        if (!client) throw new Error("Sanity client is not defined.");

        const fetchedProducts: ImportedData[] = await client.fetch(query);
        setPRODUCTS(fetchedProducts || []);
      } catch (error) {
        console.error("Error fetching products from Sanity:", error);
      }
    };

    fetchDataFromSanity();
  }, []);

  // Filter products based on search query
  const filteredProducts = PRODUCTS.filter((product) => {
    const title = product?.title?.toLowerCase() || "";
    const description = product?.description?.toLowerCase() || "";
    return (
      title.includes(searchQuery?.toLowerCase() || "") ||
      description.includes(searchQuery?.toLowerCase() || "")
    );
  });

  return (
    <section className="w-full overflow-x-hidden">
      <div>
        <p className="text-[32px] font-bold text-center">Our Products</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-[20px] mt-[30px]">
        {filteredProducts.slice(0, skipNumberOfProducts).map((item) => (
          // <ProductCard {...item} key={item._id} />
          <ProductCard {...item} key={item._id} />
           
        ))}
      </div>
      <div className="flex justify-center my-[32px]">
        <MainButton
          action={() =>
            setSkipNumberOfProducts((prev) =>
              prev > PRODUCTS.length ? 8 : prev + 4
            )
          }
          text="Show More"
          classes="bg-transparent hover:bg-transparent text-primary font-bold border border-primary h-[48px]"
        />
      </div>
    </section>
  );
}

export default OurProductSection;
