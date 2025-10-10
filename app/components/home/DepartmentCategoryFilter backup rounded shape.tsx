"use client";

import { useState } from "react";

const DepartmentCategoryFilter = () => {
  // const searchParams = useSearchParams();
  // const departmentCategory =
  //   searchParams.get("departmentCategory") || undefined;

  const [selectedButton, setSelectedButton] = useState(1);

  // const handleStatusChange = useCallback(
  //   (departmentCategory: string) => {
  //     const query =
  //       departmentCategory && `?departmentCategory=${departmentCategory}`;
  //     router.push(currentPath + query);
  //   },
  //   [router, currentPath]
  // );

  // useEffect(() => {
  //   if (departmentCategory) setSelectedButton(2);
  // }, []);

  return (
    <div className="flex flex-wrap rounded-full bg-[rgba(235,239,253,0.33)] p-1">
      <div
        className="relative flex w-full overflow-hidden rounded-full bg-[#EBEFFD]"
        role="group"
      >
        {/* SLIDING GRADIENT DIV */}
        <div
          className="absolute rounded-full border-0 transition-all duration-300 ease-in-out shadow-inner"
          style={{
            zIndex: 1,
            background: "linear-gradient(to left, #13629B, #2377B6)",
            boxShadow: "inset 0 0px 15px rgba(0, 0, 0, .34)",
            top: 0,
            bottom: 0,
            // 🎯 FIX 1: Set a clean, equal width (100% / 3) for the slider
            width: "33.3333%",
            // 🎯 FIX 2: Translate based on index, multiplying by the button width (3)
            transform: `translateX(${selectedButton * 100}%)`,
          }}
        ></div>

        {/* Buttons */}
        {["Sponsoring", "Executing", "Both"].map((label, index) => (
          <button
            key={index}
            type="button"
            onClick={() => setSelectedButton(index)}
            // 🎯 FIX 3: Force each button to take exactly 1/3 of the width (w-1/3)
            // Ensure the text is perfectly centered within the button
            className={`relative z-[2] flex items-center justify-center w-1/3 flex-shrink-0 text-sm font-medium rounded-full border-0 shadow-none transition-colors duration-200 ${
              selectedButton === index ? "text-white" : "text-black"
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

export default DepartmentCategoryFilter;
