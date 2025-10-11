"use client";
import { PRODUCT_API } from "@/app/APIs";
import { Avatar, Flex, IconButton } from "@radix-ui/themes";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import classnames from "classnames";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { FaRegCircle } from "react-icons/fa";
import { Product } from "../Navbar/forms/ProductForm";

// export const ProductId = {
//   WIN: "WIN",
// } as const;

// export type ProductId = (typeof ProductId)[keyof typeof ProductId];

// const statues: { label: string; value?: Status }[] = [
//   { label: "All" },
//   { label: "Win", value: "WIN" },
// ];

const ProductFilter = () => {
  const router = useRouter();
  const { data } = useQuery<Product[]>({
    queryKey: ["data"],
    queryFn: () => axios.get(PRODUCT_API).then((res) => res.data),
    staleTime: 60 * 1000, // 60s
    retry: 3,
  });

  const [selectedButton, setSelectedButton] = useState<number>();

  // ✅ useMemo to avoid recreating `products` each render
  const products = useMemo(
    () =>
      data?.map((product) => ({
        label: product.name.toUpperCase(),
        value: String(product.id),
        icon: product.icon,
      })) ?? [],
    [data]
  );
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    if (!initialized && products.length > 0) {
      setInitialized(true);
      setSelectedButton(Number(products[0].value));
      const query = products[0].value ? `?product=${products[0].value}` : "";
      router.push("/" + query);
      console.log("Navigating to:", "/" + query);
    }
  }, [products, initialized, router]);

  return (
    <>
      <Flex
        justify="between"
        align="center"
        gap="2"
        className="!px-2 !py-[5px]"
      >
        {products.map((product) => (
          <IconButton
            key={product.value}
            className={classnames({
              "w-8 !h-8 !relative !rounded-full !transition-all !duration-200":
                true,
              "!text-white !bg-[rgba(170,60,49,0.1)] !border-[1.44px] !border-[#AA3C31] ":
                selectedButton === Number(product.value),
              " !bg-transparent": selectedButton !== Number(product.value),
            })}
            onClick={() => {
              setSelectedButton(Number(product.value));
              const query = product.value ? `?product=${product.value}` : "";
              router.push("/" + query);
              console.log("Navigating to:", "/" + query);
            }}
          >
            {selectedButton === Number(product.value) && (
              <div className="absolute">
                <FaRegCircle size={36} className="text-[#AA3C31]" />
              </div>
            )}
            <div className="absolute">
              <Avatar
                src={
                  product.icon.startsWith("/upload")
                    ? product.icon
                    : `/upload/${product.icon}`
                }
                alt={product.icon}
                width={23}
                height={23}
                className="!w-[23px] !h-[23px]"
                fallback="?"
              />
            </div>
          </IconButton>
        ))}
      </Flex>
    </>
  );
};

export default ProductFilter;
