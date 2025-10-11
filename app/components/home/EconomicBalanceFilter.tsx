"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const EconomicBalanceFilter = () => {
  const searchParams = useSearchParams();
  const departmentCategory =
    searchParams.get("departmentCategory") || undefined;

  const [selectedButton, setSelectedButton] = useState(1);
  // const router = useRouter();
  // const handleStatusChange = useCallback(
  //   (departmentCategory: string) => {
  //     const query =
  //       departmentCategory && `?departmentCategory=${departmentCategory}`;
  //     router.push(currentPath + query);
  //   },
  //   [router, currentPath]
  // );

  useEffect(() => {
    if (departmentCategory) setSelectedButton(2);
  }, [departmentCategory]);

  return (
    <div className="flex flex-wrap bg-[#063A6A] shadow-[0_0_0_1px_#1BCEF5]">
      <div className="relative flex w-full overflow-hidden " role="group">
        {/* SLIDING GRADIENT DIV */}
        <div
          className="absolute  border-0 transition-all duration-300 ease-in-out shadow-inner"
          style={{
            zIndex: 1,
            top: 0,
            bottom: 0,
            width: "33.3333%",
            transform: `translateX(${selectedButton * 100}%)`,
            background:
              selectedButton === 0
                ? "linear-gradient(to right, #609052, #3D6730)" // Production
                : selectedButton === 1
                ? "linear-gradient(to right, #FEB019, #C5870F)" // Consumption
                : "linear-gradient(to right, #E61313, #B60C0C)", // Deficit
            boxShadow: "inset 0 0px 15px rgba(0, 0, 0, .34)",
          }}
        ></div>

        {/* BUTTONS */}
        {["Production", "Consumption", "Deficit"].map((label, index) => (
          <button
            key={index}
            type="button"
            onClick={() => setSelectedButton(index)}
            className={`relative z-[2] flex items-center justify-center w-1/3 text-sm font-medium  border-0 shadow-none transition-colors duration-200 ${
              selectedButton === index ? "text-white" : "text-gray-200"
            }`}
            style={{
              height: "44px",
            }}
          >
            {label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default EconomicBalanceFilter;
