"use client";

import { PRODUCTION_API } from "@/app/APIs";
import apiClient, { AxiosError } from "@/app/services/api-client";
import { createdMessage } from "@/app/utils/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Dialog, Flex, Heading, IconButton } from "@radix-ui/themes";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { FiAward } from "react-icons/fi";
import { IoClose } from "react-icons/io5";
import { toast } from "react-toastify";
import z from "zod";
import ActionButton from "../../Form/ActionButton";
import CustomLabel from "../../Form/CustomLabel";
import CustomRadixInput from "../../Form/CustomRadixInput";
import CustomSelect, { OptionType } from "../../Form/CustomSelect";
import ErrorMessage from "../../Form/ErrorMessage";
import SubmitButton from "../../Form/SubmitButton";

const schema = z.object({
  id: z.number().optional().default(0),
  productId: z
    .number()
    .min(1, "Please add product!")
    .transform((val) => Number(val))
    .refine((val) => !isNaN(val), { message: "Please add product!" }),
  countaryId: z
    .number()
    .min(1, "Please add countary!")
    .transform((val) => Number(val))
    .refine((val) => !isNaN(val), { message: "Please add country!" }),
  provinceId: z
    .number()
    .min(1, "Please add province!")
    .transform((val) => Number(val))
    .refine((val) => !isNaN(val), { message: "Please add province!" }),
  divisionId: z
    .number()
    .min(1, "Please add division!")
    .transform((val) => Number(val))
    .refine((val) => !isNaN(val), { message: "Please add division!" }),
  districtId: z
    .number()
    .min(1, "Please add district!")
    .transform((val) => Number(val))
    .refine((val) => !isNaN(val), { message: "Please add district!" }),
  population: z
    .preprocess((val) => {
      if (val === "" || val === undefined || val === null) return 0; // 👈 default 0 for empty
      return Number(val);
    }, z.number().min(0, { message: "Population cannot be negative!" }).default(0))
    .optional(),
  productionQuantity: z
    .preprocess((val) => {
      if (val === "" || val === undefined || val === null) return 0; // 👈 default 0 for empty
      return Number(val);
    }, z.number().min(0, { message: "Production Quantity cannot be negative!" }).default(0))
    .optional(),
  consumptionQuantity: z
    .preprocess((val) => {
      if (val === "" || val === undefined || val === null) return 0; // 👈 default 0 for empty
      return Number(val);
    }, z.number().min(0, { message: "Consumption Quantity cannot be negative!" }).default(0))
    .optional(),
  unitId: z
    .preprocess((val) => {
      if (val === "" || val === undefined || val === null) return 0; // 👈 default 0 for empty
      return Number(val);
    }, z.number().min(0, { message: "Unit cannot be negative!" }).default(0))
    .optional(),
  createdAt: z.string().optional().default(new Date().toISOString()),
  createdBy: z.string().optional().default("admin"),
  updatedAt: z.string().optional().default(new Date().toISOString()),
  updatedBy: z.string().optional().default("admin"),
});

const defaultValues: ProductionInput = {
  id: 0,
  productId: 0,
  countaryId: 0,
  provinceId: 0,
  divisionId: 0,
  districtId: 0,
  population: 0,
  productionQuantity: 0,
  consumptionQuantity: 0,
  unitId: 0,
  createdAt: new Date().toISOString(),
  createdBy: "admin",
  updatedAt: new Date().toISOString(),
  updatedBy: "admin",
};

// Output type (what you get after validation)
export type Production = z.infer<typeof schema>;

// Input type (what the form needs)
export type ProductionInput = z.input<typeof schema>;

const tileInfo = {
  label: "Production / Consumption",
  description: "Production / Consumption Data",
  icon: <FiAward className="text-primary" size={24} />,
  isBadge: false,
};

interface Props {
  productOptions: OptionType[];
  countryOptions: OptionType[];
  provinceOptions: OptionType[];
  divisionOptions: OptionType[];
  districtOptions: OptionType[];
}

const ProductionForm = ({
  productOptions,
  countryOptions,
  provinceOptions,
  divisionOptions,
  districtOptions,
}: Props) => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<ProductionInput>({
    resolver: zodResolver(schema),
    defaultValues,
  });
  console.log("errors", errors);
  const [isDialogOpen, setDialogOpen] = useState(false);
  const router = useRouter();

  const onSubmit = async (formData: ProductionInput) => {
    console.log("formData", formData);

    handleCloseDialog();
    const modifiedFormData: ProductionInput = {
      ...formData,
      createdBy: "admin",
      updatedBy: "admin",
      updatedAt: new Date().toISOString(),
    };
    try {
      const response = await apiClient({
        method: "POST",
        url: PRODUCTION_API,
        data: modifiedFormData,
      });
      console.log("Response:", response);
      router.refresh();
      toast.success(createdMessage);
      handleCloseDialog();
    } catch (err) {
      console.error("Submission error:", err);
      toast.error((err as AxiosError).message);
    }
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
    console.log("close dialog");
  };

  // <Link href="/production-consumption/list">
  //   <ActionButton
  //     name={tileInfo.label}
  //     icon={tileInfo.icon}
  //     description={tileInfo.description}
  //   />
  // </Link>
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
                  <Controller
                    name="productId"
                    control={control}
                    render={({ field }) => (
                      <CustomSelect
                        {...field}
                        options={productOptions} // must be in format { value, label }
                        closeMenuOnSelect={true}
                        // Convert between react-select and raw value
                        value={
                          productOptions.find(
                            (opt) =>
                              opt.value ===
                              (field.value != null
                                ? field.value.toString()
                                : "")
                          )
                            ? [
                                productOptions.find(
                                  (opt) =>
                                    opt.value ===
                                    (field.value != null
                                      ? field.value.toString()
                                      : "")
                                )!,
                              ]
                            : null
                        }
                        onChangeSingle={(selectedOption) => {
                          field.onChange(
                            selectedOption ? Number(selectedOption.value) : null
                          );
                        }}
                      />
                    )}
                  />
                  <ErrorMessage>{errors.productId?.message}</ErrorMessage>
                </>
              }
            >
              Product
            </CustomLabel>
            <CustomLabel
              inputNode={
                <>
                  <Controller
                    name="countaryId"
                    control={control}
                    render={({ field }) => (
                      <CustomSelect
                        {...field}
                        options={countryOptions} // must be in format { value, label }
                        closeMenuOnSelect={true}
                        // Convert between react-select and raw value
                        value={
                          countryOptions.find(
                            (opt) =>
                              opt.value ===
                              (field.value != null
                                ? field.value.toString()
                                : "")
                          )
                            ? [
                                countryOptions.find(
                                  (opt) =>
                                    opt.value ===
                                    (field.value != null
                                      ? field.value.toString()
                                      : "")
                                )!,
                              ]
                            : null
                        }
                        onChangeSingle={(selectedOption) => {
                          field.onChange(
                            selectedOption ? Number(selectedOption.value) : null
                          );
                        }}
                      />
                    )}
                  />
                  <ErrorMessage>{errors.countaryId?.message}</ErrorMessage>
                </>
              }
            >
              Country
            </CustomLabel>
            <CustomLabel
              inputNode={
                <>
                  <Controller
                    name="provinceId"
                    control={control}
                    render={({ field }) => (
                      <CustomSelect
                        {...field}
                        options={provinceOptions} // must be in format { value, label }
                        closeMenuOnSelect={true}
                        // Convert between react-select and raw value
                        value={
                          provinceOptions.find(
                            (opt) =>
                              opt.value ===
                              (field.value != null
                                ? field.value.toString()
                                : "")
                          )
                            ? [
                                provinceOptions.find(
                                  (opt) =>
                                    opt.value ===
                                    (field.value != null
                                      ? field.value.toString()
                                      : "")
                                )!,
                              ]
                            : null
                        }
                        onChangeSingle={(selectedOption) => {
                          field.onChange(
                            selectedOption ? Number(selectedOption.value) : null
                          );
                        }}
                      />
                    )}
                  />
                  <ErrorMessage>{errors.provinceId?.message}</ErrorMessage>
                </>
              }
            >
              Province
            </CustomLabel>
            <CustomLabel
              inputNode={
                <>
                  <Controller
                    name="divisionId"
                    control={control}
                    render={({ field }) => (
                      <CustomSelect
                        {...field}
                        options={divisionOptions} // must be in format { value, label }
                        closeMenuOnSelect={true}
                        // Convert between react-select and raw value
                        value={
                          divisionOptions.find(
                            (opt) =>
                              opt.value ===
                              (field.value != null
                                ? field.value.toString()
                                : "")
                          )
                            ? [
                                divisionOptions.find(
                                  (opt) =>
                                    opt.value ===
                                    (field.value != null
                                      ? field.value.toString()
                                      : "")
                                )!,
                              ]
                            : null
                        }
                        onChangeSingle={(selectedOption) => {
                          field.onChange(
                            selectedOption ? Number(selectedOption.value) : null
                          );
                        }}
                      />
                    )}
                  />
                  <ErrorMessage>{errors.divisionId?.message}</ErrorMessage>
                </>
              }
            >
              Division
            </CustomLabel>
            <CustomLabel
              inputNode={
                <>
                  <Controller
                    name="districtId"
                    control={control}
                    render={({ field }) => (
                      <CustomSelect
                        {...field}
                        options={districtOptions} // must be in format { value, label }
                        closeMenuOnSelect={true}
                        // Convert between react-select and raw value
                        value={
                          districtOptions.find(
                            (opt) =>
                              opt.value ===
                              (field.value != null
                                ? field.value.toString()
                                : "")
                          )
                            ? [
                                districtOptions.find(
                                  (opt) =>
                                    opt.value ===
                                    (field.value != null
                                      ? field.value.toString()
                                      : "")
                                )!,
                              ]
                            : null
                        }
                        onChangeSingle={(selectedOption) => {
                          field.onChange(
                            selectedOption ? Number(selectedOption.value) : null
                          );
                        }}
                      />
                    )}
                  />
                  <ErrorMessage>{errors.districtId?.message}</ErrorMessage>
                </>
              }
            >
              District
            </CustomLabel>
            <CustomLabel
              inputNode={
                <>
                  <CustomRadixInput
                    type="number"
                    placeholder="Enter Population"
                    {...register("population", { valueAsNumber: true })}
                  />
                  <ErrorMessage>{errors.population?.message}</ErrorMessage>
                </>
              }
            >
              Population
            </CustomLabel>

            <CustomLabel
              inputNode={
                <>
                  <CustomRadixInput
                    type="number"
                    placeholder="Enter Production Quantity"
                    {...register("productionQuantity", { valueAsNumber: true })}
                  />
                  <ErrorMessage>
                    {errors.productionQuantity?.message}
                  </ErrorMessage>
                </>
              }
            >
              Production Quantity
            </CustomLabel>

            <CustomLabel
              inputNode={
                <>
                  <CustomRadixInput
                    type="number"
                    placeholder="Enter Consumption Quantity"
                    {...register("consumptionQuantity", {
                      valueAsNumber: true,
                    })}
                  />
                  <ErrorMessage>
                    {errors.consumptionQuantity?.message}
                  </ErrorMessage>
                </>
              }
            >
              Consumption Quantity
            </CustomLabel>

            <CustomLabel
              inputNode={
                <>
                  <CustomRadixInput
                    type="number"
                    placeholder="Enter Unit"
                    {...register("unitId", { valueAsNumber: true })}
                  />
                  <ErrorMessage>{errors.unitId?.message}</ErrorMessage>
                </>
              }
            >
              Unit
            </CustomLabel>
          </div>

          <Flex gap="3" mt="4" justify="between">
            <Dialog.Close>
              <Button className="!w-[187px] !h-[41px] !text-primary !py-[0.688em] !px-[1em] !font-bold !bg-[#EFF0F2] !rounded-[5px] !border-[1px] !border-[rgba(239,240,242,0.4)]">
                Cancel
              </Button>
            </Dialog.Close>
            <SubmitButton>Save Production</SubmitButton>
          </Flex>
        </form>
      </Dialog.Content>
    </Dialog.Root>
  );
};

export default ProductionForm;
