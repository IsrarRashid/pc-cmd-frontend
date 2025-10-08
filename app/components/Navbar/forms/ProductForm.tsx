"use client";

import {
  Badge,
  Box,
  Button,
  Dialog,
  Flex,
  Heading,
  IconButton,
  Text,
} from "@radix-ui/themes";
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
import { IoClose } from "react-icons/io5";
import { MegaMenuTile } from "../MegaMenu";

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

const ProductForm = ({ tileInfo }: { tileInfo: MegaMenuTile }) => {
  const [selectedFile, setSelectedFile] = useState<File>();
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const {
    register,
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
  console.log(previewUrl);
  console.log(isSubmitting);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleClick = (e: MouseEvent) => {
    e.stopPropagation();
    fileInputRef.current?.click();
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      console.log("Dropped file:", e.dataTransfer.files[0]);
      setSelectedFile(e.dataTransfer.files[0]);
      // Do your upload logic here
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const objectUrl = URL.createObjectURL(file);
      setPreviewUrl(objectUrl);
      setSelectedFile(file);
    }
  };

  const onSubmit = (data: ProductInput) => {
    console.log(data);
    // onClose(); // close dialog
  };

  return (
    <Dialog.Root>
      <Dialog.Trigger>
        <Flex
          gap="4"
          p="3"
          className="hover:!bg-gray-100 !rounded-md !transition-colors !duration-150"
        >
          {tileInfo.icon}
          <Box>
            <Flex gap="2" align="center" mb="2">
              <Text as="p" size="4" weight="medium">
                {tileInfo.label}
              </Text>
              {tileInfo.isBadge && (
                <Badge
                  className="!text-[#1F6142] !bg-[#E8FDF1] !font-normal !py-[.25em] !px-[.5em]"
                  radius="full"
                >
                  NEW
                </Badge>
              )}
            </Flex>
            <Text as="p" size="2" className="!text-[#686868]">
              {tileInfo.description}
            </Text>
          </Box>
        </Flex>
      </Dialog.Trigger>

      <Dialog.Content
        size="4"
        maxWidth="896px"
        className="!py-[15px] !px-[20px]"
      >
        <Dialog.Title>
          <Flex justify="between" align="center" className="!mb-5">
            <Heading as="h6" className="!text-primary !py-2">
              {tileInfo.label}
            </Heading>
            <Dialog.Close>
              <IconButton
                radius="full"
                className="!w-8 !h-8 !bg-primary/10 !py-2"
              >
                <IoClose className="text-primary" />
              </IconButton>
            </Dialog.Close>
          </Flex>
        </Dialog.Title>
        <Dialog.Description size="2" mb="4" className="!sr-only">
          Make changes to your profile.
        </Dialog.Description>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-1 md:grid-cols-3 mb-2.5 items-center gap-[1.25rem]">
            <CustomLabel
              inputNode={
                <CustomRadixInput
                  placeholder="Enter Name"
                  {...register("name")}
                />
              }
            >
              Name
            </CustomLabel>
            <CustomLabel
              inputNode={
                <CustomRadixInput
                  placeholder="Enter Description"
                  {...register("description")}
                />
              }
            >
              Description
            </CustomLabel>
            <CustomLabel
              inputNode={
                <CustomRadixInput
                  placeholder="Enter Amount"
                  {...register("amount")}
                />
              }
            >
              Amount
            </CustomLabel>
          </div>

          <div
            className="px-6 py-2.5 rounded-[15px] bg-white/80 border-[1.5px] border-[#EFF0F2] mb-5"
            onClick={(e) => handleClick(e)}
            onDragOver={(e) => e.preventDefault()}
            onDrop={handleDrop}
          >
            <CustomInput
              ref={fileInputRef}
              id="profilePicture"
              type="file"
              className="hidden"
              placeholder="Choose Profile Picture"
              onChange={handleFileChange}
              accept="image/*"
            />
            <Flex className="!gap-[0.625rem]" justify="center" align="center">
              <Box>
                <IconButton
                  className="!bg-primary/20 !w-12 !h-12"
                  radius="full"
                >
                  <TbFileUpload size={24} className="text-primary" />
                </IconButton>
              </Box>
              <Box>
                <Text size="2" weight="bold" className="!text-primary">
                  Click here{" "}
                </Text>
                <Text size="2" weight="medium" className="!text-[#475569]">
                  to upload your file or drag.
                </Text>
                <Text
                  as="p"
                  size="1"
                  weight="medium"
                  className="!text-[#94A3B8]"
                >
                  {selectedFile
                    ? selectedFile.name
                    : "Supported Format: JPG, PNG (10mb each)"}
                </Text>
              </Box>
            </Flex>
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

        <Flex gap="3" mt="4" justify="between">
          <Dialog.Close>
            <Button className="!w-[187px] !h-[41px] !text-primary !py-[0.688em] !px-[1em] !font-bold !bg-[#EFF0F2] !rounded-[5px] !border-[1px] !border-[rgba(239,240,242,0.4)]">
              Cancel
            </Button>
          </Dialog.Close>
          <Dialog.Close>
            <Button className="!w-[187px] !h-[41px] !bg-primary !py-[0.688em] !px-[1em] !font-bold !rounded-[5px] !border-[1px] !border-primary">
              Save Form
            </Button>
          </Dialog.Close>
        </Flex>
      </Dialog.Content>
    </Dialog.Root>
  );
};

export default ProductForm;
