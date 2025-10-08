"use client";

import { Box, Button, Flex, IconButton, Text } from "@radix-ui/themes";
import { MouseEvent, useRef, useState } from "react";
import { TbFileUpload } from "react-icons/tb";
import z from "zod";
import CustomInput from "../../Form/CustomInput";
import CustomLabel from "../../Form/CustomLabel";
import CustomRadixInput from "../../Form/CustomRadixInput";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Spinner from "../../Spinner";
import { PiArrowCircleRight } from "react-icons/pi";

const schema = z.object({
  id: z.number().default(0),
  name: z.string().min(1, { message: "Please add Product Name!" }),
  description: z.string().default(""),
  amount: z.number().min(1, { message: "Please add amount!" }),
  icon: z.string().default(""),
  createdAt: z.string().default(new Date().toISOString()),
  createdBy: z.string().min(1, { message: "Please add Created By!" }),
  updatedAt: z.string().default(new Date().toISOString()),
  updatedBy: z.string().min(1, { message: "Please add Updated By!" }),
  isActive: z.boolean().default(true),
});

// Output type (what you get after validation)
export type Product = z.infer<typeof schema>;

// Input type (what the form needs)
export type ProductInput = z.input<typeof schema>;

const ProductionForm = () => {
  const {
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<ProductInput>({
    resolver: zodResolver(schema),
    defaultValues: {
      id: 0,
      name: "",
      description: "",
      amount: 0,
      icon: "",
      createdAt: new Date().toISOString(),
      createdBy: "",
      updatedAt: new Date().toISOString(),
      updatedBy: "",
      isActive: true,
    },
  });

  const onSubmit = (data: ProductInput) => {
    console.log(data);
    // onClose(); // close dialog
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="grid grid-cols-1 md:grid-cols-3 mb-2.5 items-center gap-[1.25rem]">
        <CustomLabel
          inputNode={<CustomRadixInput placeholder="Enter Product Id" />}
        >
          Product Id
        </CustomLabel>
        <CustomLabel
          inputNode={
            <CustomRadixInput placeholder="Enter Production Session Id" />
          }
        >
          Production Session Id
        </CustomLabel>
        <CustomLabel
          inputNode={<CustomRadixInput placeholder="Enter Quantity" />}
        >
          Quantity
        </CustomLabel>
      </div>

      {/* <Flex gap="3" mt="4" justify="between">
        <Button
          onClick={onClose}
          className="!w-[187px] !h-[41px] !text-primary !py-[0.688em] !px-[1em] !font-bold !bg-[#EFF0F2] !rounded-[5px] !border-[1px] !border-[rgba(239,240,242,0.4)]"
        >
          Cancel
        </Button>
        <Button className="!w-[187px] !h-[41px] !bg-primary !py-[0.688em] !px-[1em] !font-bold !rounded-[5px] !border-[1px] !border-primary">
          Save Form{" "}
          {isSubmitting ? <Spinner /> : <PiArrowCircleRight size={20} />}
        </Button>
      </Flex> */}
    </form>
  );
};

export default ProductionForm;
