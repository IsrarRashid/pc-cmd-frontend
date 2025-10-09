"use client";

import { PRODUCT_API } from "@/app/APIs";
import apiClient, { AxiosError } from "@/app/services/api-client";
import { createdMessage } from "@/app/utils/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Box,
  Button,
  Dialog,
  Flex,
  Heading,
  IconButton,
  Text,
} from "@radix-ui/themes";
import { useRouter } from "next/navigation";
import { MouseEvent, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { FiAward } from "react-icons/fi";
import { IoClose } from "react-icons/io5";
import { TbFileUpload } from "react-icons/tb";
import { toast } from "react-toastify";
import z from "zod";
import ActionButton from "../../Form/ActionButton";
import CustomInput from "../../Form/CustomInput";
import CustomLabel from "../../Form/CustomLabel";
import CustomRadixInput from "../../Form/CustomRadixInput";
import ErrorMessage from "../../Form/ErrorMessage";
import SubmitButton from "../../Form/SubmitButton";

const schema = z.object({
  id: z.number().default(0),
  name: z.string().min(1, { message: "Please add Product Name!" }),
  description: z.string().default(""),
  amount: z
    .number()
    .min(1, "Please add Rate!")
    .transform((val) => Number(val))
    .refine((val) => !isNaN(val), { message: "Please add Rate!" }),
  icon: z.string().default(""),
  createdAt: z.string().optional().default(new Date().toISOString()),
  // createdBy: z.string().optional().min(1, { message: "Please add Created By!" }),
  createdBy: z.string().optional().default(""),
  updatedAt: z.string().default(new Date().toISOString()),
  // updatedBy: z.string().optional().min(1, { message: "Please add Updated By!" }),
  updatedBy: z.string().optional().default(""),
  isActive: z.boolean().default(true),
});

// Output type (what you get after validation)
export type Product = z.infer<typeof schema>;

// Input type (what the form needs)
type ProductInput = z.input<typeof schema>;

const tileInfo = {
  label: "Add Product",
  description: "Add product Data",
  icon: <FiAward className="text-primary" size={24} />,
  isBadge: false,
};

const ProductForm = () => {
  const [selectedFile, setSelectedFile] = useState<File>();
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProductInput>({
    resolver: zodResolver(schema),
  });
  console.log(previewUrl);
  console.log("errors", errors);

  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const router = useRouter();
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

  const [isDialogOpen, setDialogOpen] = useState(false);

  const onSubmit = async (formData: ProductInput) => {
    console.log("formData", formData);
    handleClose();
    const modifiedFormData: ProductInput = {
      ...formData,
      // UpdateBy: formData.parentId === 0 ? null : formData.parentId,
      updatedAt: new Date().toISOString(),
    };
    try {
      const response = await apiClient({
        method: "POST",
        url: PRODUCT_API,
        data: modifiedFormData,
      });
      console.log("Response:", response);
      router.refresh();
      toast.success(createdMessage);
      handleClose();
    } catch (err) {
      console.error("Submission error:", err);
      toast.error((err as AxiosError).message);
    }
  };

  const handleClose = () => {
    setDialogOpen(false);
    console.log("close dialog");
  };

  return (
    <Dialog.Root open={isDialogOpen} onOpenChange={setDialogOpen}>
      <Dialog.Trigger>
        <ActionButton
          name={tileInfo.label}
          icon={tileInfo.icon}
          description={tileInfo.description}
        />
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
                <>
                  <CustomRadixInput
                    placeholder="Enter Name"
                    {...register("name")}
                  />
                  <ErrorMessage>{errors.name?.message}</ErrorMessage>
                </>
              }
            >
              Name
            </CustomLabel>

            <CustomLabel
              inputNode={
                <>
                  <CustomRadixInput
                    placeholder="Enter Description"
                    {...register("description")}
                  />
                  <ErrorMessage>{errors.description?.message}</ErrorMessage>
                </>
              }
            >
              Description
            </CustomLabel>

            <CustomLabel
              inputNode={
                <>
                  <CustomRadixInput
                    placeholder="Enter Rate"
                    {...register("amount", { valueAsNumber: true })}
                  />
                  <ErrorMessage>{errors.amount?.message}</ErrorMessage>
                </>
              }
            >
              Rate
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

          <Flex gap="3" mt="4" justify="between">
            <Dialog.Close>
              <Button className="!w-[187px] !h-[41px] !text-primary !py-[0.688em] !px-[1em] !font-bold !bg-[#EFF0F2] !rounded-[5px] !border-[1px] !border-[rgba(239,240,242,0.4)]">
                Cancel
              </Button>
            </Dialog.Close>
            <SubmitButton>Save Product</SubmitButton>
          </Flex>
        </form>
      </Dialog.Content>
    </Dialog.Root>
  );
};

export default ProductForm;
