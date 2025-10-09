"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { FiAward } from "react-icons/fi";
import z from "zod";
import ActionButton from "../../Form/ActionButton";

const schema = z.object({
  id: z.number().default(0),
  name: z.string().min(1, { message: "Please add Production Name!" }),
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
export type Production = z.infer<typeof schema>;

// Input type (what the form needs)
export type ProductionInput = z.input<typeof schema>;

const tileInfo = {
  label: "Production / Consumption",
  description: "Production / Consumption Data",
  icon: <FiAward className="text-primary" size={24} />,
  isBadge: false,
};

const ProductionForm = () => {
  const {
    // register,
    // handleSubmit,
    formState: { errors },
  } = useForm<ProductionInput>({
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
  console.log("errors", errors);

  // const onSubmit = async (formData: ProductionInput) => {
  //   console.log("formData", formData);
  //   handleCloseDialog();
  //   const modifiedFormData: ProductionInput = {
  //     ...formData,
  //     // UpdateBy: formData.parentId === 0 ? null : formData.parentId,
  //     updatedAt: new Date().toISOString(),
  //   };
  //   try {
  //     const response = await apiClient({
  //       method: "POST",
  //       url: PRODUCT_API,
  //       data: modifiedFormData,
  //     });
  //     console.log("Response:", response);
  //     router.refresh();
  //     toast.success(createdMessage);
  //     handleCloseDialog();
  //   } catch (err) {
  //     console.error("Submission error:", err);
  //     toast.error((err as AxiosError).message);
  //   }
  // };

  // const handleCloseDialog = () => {
  //   setIsDialogOpen(false);
  //   console.log("close dialog");
  // };

  return (
    <Link href="/production-consumption/list">
      <ActionButton
        name={tileInfo.label}
        icon={tileInfo.icon}
        description={tileInfo.description}
      />
    </Link>
    // <Dialog.Root open={isDialogOpen} onOpenChange={setIsDialogOpen}>
    //   <Dialog.Trigger>
    //     <ActionButton
    //       name="Production / Consumption"
    //       icon={<FiAward className="text-primary" size={24} />}
    //       description="Production / Consumption Data"
    //     />
    //   </Dialog.Trigger>

    //   <Dialog.Content
    //     size="4"
    //     className="!py-[15px] !px-[20px] !max-w-[95vw] !w-auto !max-h-[90vh] !overflow-hidden"
    //   >
    //     <Dialog.Title>
    //       <Flex justify="between" align="center" className="!mb-5">
    //         <Heading as="h6" className="!text-primary !py-2">
    //           Production / Consumption
    //         </Heading>
    //         <Dialog.Close>
    //           <IconButton
    //             radius="full"
    //             className="!w-8 !h-8 !bg-primary/10 !py-2"
    //           >
    //             <IoClose className="text-primary" />
    //           </IconButton>
    //         </Dialog.Close>
    //       </Flex>
    //     </Dialog.Title>
    //     <Dialog.Description size="2" mb="4" className="!sr-only">
    //       Make changes to your profile.
    //     </Dialog.Description>
    //     <TableTopArea
    //       heading="Production / Consumption"
    //       searchTerm={""}
    //       filteredData={[]}
    //       data={[]}
    //     />
    //     <ScrollArea
    //       type="auto"
    //       scrollbars="horizontal"
    //       style={{
    //         maxWidth: "100%",
    //         overflowX: "auto",
    //         maxHeight: "100vh",
    //       }}
    //       className="!max-w-full !overflow-x-auto !rounded-md !border !border-gray-200"
    //     >
    //       <TableRoot className="min-w-[1200px]">
    //         <TableHeader>
    //           <Table.Row className="!text-white">
    //             <TableHeading name="id" isFirst={true} />
    //             <TableHeading name="product" />
    //             <TableHeading name="countary" />
    //             <TableHeading name="province" />
    //             <TableHeading name="division" />
    //             <TableHeading name="district" />
    //             <TableHeading name="population" />
    //             <TableHeading name="productionQuantity" />
    //             <TableHeading name="consumptionQuantity" />
    //             <TableHeading name="unitId" />
    //             <TableHeading name="createdAt" />
    //             <TableHeading name="updatedAt" />
    //             <TableHeading name="createdBy" />
    //             <TableHeading name="updatedBy" />
    //             <TableHeading name="" />
    //           </Table.Row>
    //         </TableHeader>

    //         <Table.Body className="bg-theme !text-sm">
    //           <Table.Row className="odd:bg-gray-50 even:bg-white hover:!bg-gray-200 transition-colors">
    //             <TableRowHeaderCell>1</TableRowHeaderCell>
    //             <Table.Cell>Bahawalnagar</Table.Cell>
    //             <Table.Cell>12,709,365</Table.Cell>
    //             <Table.Cell>1020</Table.Cell>
    //             <Table.Cell>255</Table.Cell>
    //             <Table.Cell>293</Table.Cell>
    //             <Table.Cell>293</Table.Cell>
    //             <Table.Cell>293</Table.Cell>
    //             <Table.Cell>293</Table.Cell>
    //             <Table.Cell>293</Table.Cell>
    //             <Table.Cell>293</Table.Cell>
    //             <Table.Cell>293</Table.Cell>
    //             <Table.Cell>293</Table.Cell>
    //             <Table.Cell>293</Table.Cell>
    //             <Table.Cell>
    //               <IconButton className="!bg-transparent">
    //                 <Image
    //                   src="/icons/eye.svg"
    //                   alt="eye"
    //                   width={20}
    //                   height={20}
    //                   className="w-5 h-5"
    //                 />
    //               </IconButton>
    //             </Table.Cell>
    //           </Table.Row>
    //           <Table.Row className="odd:bg-gray-50 even:bg-white hover:!bg-gray-200 transition-colors">
    //             <TableRowHeaderCell>1</TableRowHeaderCell>
    //             <Table.Cell>Bahawalnagar</Table.Cell>
    //             <Table.Cell>12,709,365</Table.Cell>
    //             <Table.Cell>1020</Table.Cell>
    //             <Table.Cell>255</Table.Cell>
    //             <Table.Cell>293</Table.Cell>
    //             <Table.Cell>293</Table.Cell>
    //             <Table.Cell>293</Table.Cell>
    //             <Table.Cell>293</Table.Cell>
    //             <Table.Cell>293</Table.Cell>
    //             <Table.Cell>293</Table.Cell>
    //             <Table.Cell>293</Table.Cell>
    //             <Table.Cell>293</Table.Cell>
    //             <Table.Cell>293</Table.Cell>
    //             <Table.Cell>
    //               <IconButton className="!bg-transparent">
    //                 <Image
    //                   src="/icons/eye.svg"
    //                   alt="eye"
    //                   width={20}
    //                   height={20}
    //                   className="w-5 h-5"
    //                 />
    //               </IconButton>
    //             </Table.Cell>
    //           </Table.Row>
    //           <Table.Row className="odd:bg-gray-50 even:bg-white hover:!bg-gray-200 transition-colors">
    //             <TableRowHeaderCell>1</TableRowHeaderCell>
    //             <Table.Cell>Bahawalnagar</Table.Cell>
    //             <Table.Cell>12,709,365</Table.Cell>
    //             <Table.Cell>1020</Table.Cell>
    //             <Table.Cell>255</Table.Cell>
    //             <Table.Cell>293</Table.Cell>
    //             <Table.Cell>293</Table.Cell>
    //             <Table.Cell>293</Table.Cell>
    //             <Table.Cell>293</Table.Cell>
    //             <Table.Cell>293</Table.Cell>
    //             <Table.Cell>293</Table.Cell>
    //             <Table.Cell>293</Table.Cell>
    //             <Table.Cell>293</Table.Cell>
    //             <Table.Cell>293</Table.Cell>
    //             <Table.Cell>
    //               <IconButton className="!bg-transparent">
    //                 <Image
    //                   src="/icons/eye.svg"
    //                   alt="eye"
    //                   width={20}
    //                   height={20}
    //                   className="w-5 h-5"
    //                 />
    //               </IconButton>
    //             </Table.Cell>
    //           </Table.Row>
    //           <Table.Row className="odd:bg-gray-50 even:bg-white hover:!bg-gray-200 transition-colors">
    //             <TableRowHeaderCell>1</TableRowHeaderCell>
    //             <Table.Cell>Bahawalnagar</Table.Cell>
    //             <Table.Cell>12,709,365</Table.Cell>
    //             <Table.Cell>1020</Table.Cell>
    //             <Table.Cell>255</Table.Cell>
    //             <Table.Cell>293</Table.Cell>
    //             <Table.Cell>293</Table.Cell>
    //             <Table.Cell>293</Table.Cell>
    //             <Table.Cell>293</Table.Cell>
    //             <Table.Cell>293</Table.Cell>
    //             <Table.Cell>293</Table.Cell>
    //             <Table.Cell>293</Table.Cell>
    //             <Table.Cell>293</Table.Cell>
    //             <Table.Cell>293</Table.Cell>
    //             <Table.Cell>
    //               <IconButton className="!bg-transparent">
    //                 <Image
    //                   src="/icons/eye.svg"
    //                   alt="eye"
    //                   width={20}
    //                   height={20}
    //                   className="w-5 h-5"
    //                 />
    //               </IconButton>
    //             </Table.Cell>
    //           </Table.Row>
    //         </Table.Body>
    //       </TableRoot>
    //     </ScrollArea>
    //   </Dialog.Content>
    // </Dialog.Root>
  );
};

export default ProductionForm;
