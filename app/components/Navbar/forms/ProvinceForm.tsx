"use client";

import { PROVINCE_API } from "@/app/APIs";
import apiClient, { AxiosError } from "@/app/services/api-client";
import { createdMessage } from "@/app/utils/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Dialog, Flex, Heading, IconButton } from "@radix-ui/themes";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { FiAward } from "react-icons/fi";
import { IoClose } from "react-icons/io5";
import { toast } from "react-toastify";
import z from "zod";
import ActionButton from "../../Form/ActionButton";
import CustomLabel from "../../Form/CustomLabel";
import CustomRadixInput from "../../Form/CustomRadixInput";
import ErrorMessage from "../../Form/ErrorMessage";
import SubmitButton from "../../Form/SubmitButton";

const schema = z.object({
  id: z.number().default(0),
  countaryId: z
    .number()
    .min(1, "Please add Province!")
    .transform((val) => Number(val))
    .refine((val) => !isNaN(val), { message: "Please add Province!" }),
  name: z.string().min(1, { message: "Please add Province Name!" }),
});

// Output type (what you get after validation)
export type Province = z.infer<typeof schema>;

// Input type (what the form needs)
type ProvinceInput = z.input<typeof schema>;

const tileInfo = {
  label: "Add Province",
  description: "Add Province Data",
  icon: <FiAward className="text-primary" size={24} />,
  isBadge: false,
};

const ProvinceForm = () => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<ProvinceInput>({
    resolver: zodResolver(schema),
  });
  console.log("errors", errors);

  const router = useRouter();

  const [isDialogOpen, setDialogOpen] = useState(false);

  const onSubmit = async (formData: ProvinceInput) => {
    console.log("formData", formData);
    handleClose();
    // const modifiedFormData: ProvinceInput = {
    //   ...formData,
    //   // UpdateBy: formData.parentId === 0 ? null : formData.parentId,
    //   updatedAt: new Date().toISOString(),
    // };
    try {
      const response = await apiClient({
        method: "POST",
        url: PROVINCE_API,
        data: formData,
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

      <Dialog.Content size="4" className="!py-[15px] !px-[20px]">
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
                  {/* <Controller
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
                  /> */}
                  <ErrorMessage>{errors.countaryId?.message}</ErrorMessage>
                </>
              }
            >
              Country
            </CustomLabel>
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
          </div>

          <Flex gap="3" mt="4" justify="between">
            <Dialog.Close>
              <Button className="!w-[187px] !h-[41px] !text-primary !py-[0.688em] !px-[1em] !font-bold !bg-[#EFF0F2] !rounded-[5px] !border-[1px] !border-[rgba(239,240,242,0.4)]">
                Cancel
              </Button>
            </Dialog.Close>
            <SubmitButton>Save Province</SubmitButton>
          </Flex>
        </form>
      </Dialog.Content>
    </Dialog.Root>
  );
};

export default ProvinceForm;
