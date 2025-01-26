"use client"
import { useSearch } from "@/context/searchContext";
import { useEffect, useState } from "react";
import ProductCard from "../cards/ProductCard";
import MainButton from "../common/MainButton";
import { client } from "@/sanity/lib/client";
import { ImportedData } from "@/types";
import { query } from "@/utils/query";


// Component Setup
function OurProductSection() {
  const { searchQuery } = useSearch();
  const [PRODUCTS, setPRODUCTS] = useState<ImportedData[]>([]);
  const [skipNumberOfProducts, setSkipNumberOfProducts] = useState<number>(8);

  useEffect(() => {
    const fetchDataFromSanity = async () => {
      try {
        if (!client || !searchQuery) {
          throw new Error("Sanity client or query is not defined");
        }

        const fetchedProducts = await client.fetch(query);
        if (fetchedProducts) {
          setPRODUCTS(fetchedProducts);
        } else {
          console.error("No products were returned from the query.");
        }
      } catch (error) {
        console.error("Error fetching products from Sanity:", error);
      }
    };

    fetchDataFromSanity();
  }, []);

  // Filter the products based on the search query
  const filteredProducts = PRODUCTS.filter((product) => {
    const title = product.title?.toLowerCase() || "";
    const description = product.description?.toLowerCase() || "";
    return (
      title.includes(searchQuery.toLowerCase()) ||
      description.includes(searchQuery.toLowerCase())
    );
  });

  return (
    <section className="w-full overflow-x-hidden">
      <div>
        <p className="text-[32px] font-bold text-center">Our Product</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-[20px] mt-[30px]">
        {filteredProducts.slice(0, skipNumberOfProducts).map((item) => (
          <ProductCard {...item} key={item._id} />
        ))}
      </div>
      <div className="flex justify-center my-[32px]">
        <MainButton
          action={() => {
            setSkipNumberOfProducts((prev) => (prev > 24 ? 8 : prev + 4));
          }}
          text="Show More"
          classes="bg-transparent hover:bg-transparent text-primary font-bold border border-primary h-[48px]"
        />
      </div>
    </section>
  );
}

export default OurProductSection;
