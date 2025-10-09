"use client";

import CustomSelect, { OptionType } from "@/app/components/Form/CustomSelect";
import TableRowHeaderCell from "@/app/components/table/TableRowHeaderCell";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, IconButton, Table } from "@radix-ui/themes";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";

const schema = z.object({
  id: z.number().optional().default(0),
  // currency: z.string().min(1, { message: "Please add Currency!" }),
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
    .number()
    .min(1, "Please add population!")
    .transform((val) => Number(val))
    .refine((val) => !isNaN(val), { message: "Please add population!" }),
  productionQuantity: z
    .number()
    .min(1, "Please add production quantity!")
    .transform((val) => Number(val))
    .refine((val) => !isNaN(val), {
      message: "Please add production quantity!",
    }),
  consumptionQuantity: z
    .number()
    .min(1, "Please add consumption quantity!")
    .transform((val) => Number(val))
    .refine((val) => !isNaN(val), {
      message: "Please add consumption quantity!",
    }),
  unitId: z
    .number()
    .min(1, "Please add unit!")
    .transform((val) => Number(val))
    .refine((val) => !isNaN(val), { message: "Please add unit!" }),
  createdAt: z.string().min(1, { message: "Please add Created At!" }),
  createdBy: z.string().min(1, { message: "Please add Created By!" }),
  updatedAt: z.string().min(1, { message: "Please add Updated At!" }),
  updatedBy: z.string().min(1, { message: "Please add Updated By!" }),
});

// Output type (what you get after validation)
export type Production = z.infer<typeof schema>;

// Input type (what the form needs)
type ProductionInput = z.input<typeof schema>;

interface Props {
  api: string;
  method: "POST" | "PUT" | "PATCH";
  id?: number;
  data: Production;
  productOptions: OptionType[];
}

const Form = ({ data, api, method, id, productOptions }: Props) => {
  const [isAllowEdit, setAllowEdit] = useState<boolean>(false);
  const router = useRouter();
  const {
    // register,
    // handleSubmit,
    // setValue,
    // reset,
    control,
    formState: { errors },
  } = useForm<ProductionInput>({ resolver: zodResolver(schema) });

  // const onSubmit = async (formData: ProductionInput) => {
  //   console.log("Form Data:", formData);
  //   console.log(errors);

  //   const modifiedFormData = {
  //     ...formData,
  //     updatedAt: new Date().toISOString(),
  //     updatedBy: "is",
  //   };

  //   console.log("modifiedForm Data:", modifiedFormData);
  //   try {
  //     const response = await apiClient({
  //       method: method,
  //       url: method === "POST" ? api : `${api}/${id}`,
  //       data: modifiedFormData,
  //     });
  //     console.log("Response:", response);
  //     router.refresh();
  //     toast.success(method === "POST" ? createdMessage : updatedMessage);
  //   } catch (err) {
  //     console.error("Submission error:", err);
  //     toast.error((err as AxiosError).message);
  //   }
  // };

  return (
    <Table.Row className="odd:bg-gray-50 even:bg-white hover:!bg-gray-200 transition-colors">
      <TableRowHeaderCell>{data.id}</TableRowHeaderCell>
      <Table.Cell className="!min-w-[220px]">
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
                    (field.value != null ? field.value.toString() : "")
                )
                  ? [
                      productOptions.find(
                        (opt) =>
                          opt.value ===
                          (field.value != null ? field.value.toString() : "")
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
      </Table.Cell>
      <Table.Cell className="!min-w-[220px]">
        <Controller
          name="countaryId"
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
                    (field.value != null ? field.value.toString() : "")
                )
                  ? [
                      productOptions.find(
                        (opt) =>
                          opt.value ===
                          (field.value != null ? field.value.toString() : "")
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
      </Table.Cell>
      <Table.Cell>{data.provinceId}</Table.Cell>
      <Table.Cell>{data.divisionId}</Table.Cell>
      <Table.Cell>{data.districtId}</Table.Cell>
      <Table.Cell>{data.population}</Table.Cell>
      <Table.Cell>{data.productionQuantity}</Table.Cell>
      <Table.Cell>{data.consumptionQuantity}</Table.Cell>
      <Table.Cell>{data.unitId}</Table.Cell>
      <Table.Cell>{data.createdAt}</Table.Cell>
      <Table.Cell>{data.updatedAt}</Table.Cell>
      <Table.Cell>{data.createdBy}</Table.Cell>
      <Table.Cell>{data.updatedBy}</Table.Cell>
      <Table.Cell>
        <IconButton className="!bg-transparent ">
          <Image
            src="/icons/eye.svg"
            alt="eye"
            width={20}
            height={20}
            className="w-5 h-5"
          />
        </IconButton>
      </Table.Cell>
      <Table.Cell>
        <Button
          className="!bg-primary !p-2 !text-nowrap"
          onClick={() => setAllowEdit(!isAllowEdit)}
        >
          {isAllowEdit ? "Disable" : "Enable"} Edit
        </Button>
      </Table.Cell>
    </Table.Row>
  );
};

export default Form;
