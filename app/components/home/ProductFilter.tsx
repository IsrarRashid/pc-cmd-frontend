"use client";
import { PRODUCT_API } from "@/app/APIs";
import { Avatar, Flex, IconButton } from "@radix-ui/themes";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import classnames from "classnames";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";
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
  const searchParams = useSearchParams();
  const currentPath = usePathname();

  const { data } = useQuery<Product[]>({
    queryKey: ["data"],
    queryFn: () => axios.get(PRODUCT_API).then((res) => res.data),
    staleTime: 60 * 1000,
    retry: 3,
  });

  const [selectedButton, setSelectedButton] = useState<number>();
  const [initialized, setInitialized] = useState(false);

  // ✅ Memoized products list
  const products = useMemo(
    () =>
      data?.map((product) => ({
        label: product.name.toUpperCase(),
        value: String(product.id),
        icon: product.icon,
      })) ?? [],
    [data]
  );

  // ✅ Reusable method to update URL without losing other params
  const handleChange = useCallback(
    (productValue: string) => {
      if (!productValue) return;
      setSelectedButton(Number(productValue));

      const params = new URLSearchParams(searchParams.toString());
      params.set("product", productValue);

      router.push(`${currentPath}?${params.toString()}`);
      console.log("Navigating to:", `${currentPath}?${params.toString()}`);
    },
    [router, searchParams, currentPath]
  );

  // ✅ Initialize on first load
  useEffect(() => {
    if (!initialized && products.length > 0) {
      setInitialized(true);
      handleChange(products[0].value);
    }
  }, [products, initialized, handleChange]);

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
              handleChange(product.value);
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
