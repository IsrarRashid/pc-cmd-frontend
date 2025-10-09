import { PRODUCT_API, PRODUCTION_API } from "@/app/APIs";
import { OptionType } from "@/app/components/Form/CustomSelect";
import { Product } from "@/app/components/Navbar/forms/ProductForm";
import TableHeader from "@/app/components/table/TableHeader";
import TableHeading from "@/app/components/table/TableHeading";
import TableRoot from "@/app/components/table/TableRoot";
import TableTopArea from "@/app/components/table/TableTopArea";
import { ScrollArea, Table } from "@radix-ui/themes";
import Form, { Production } from "./Form";

const WinnerPricePage = async () => {
  const res = await fetch(`${process.env.BACKEND_URL}${PRODUCTION_API}`, {
    cache: "no-store",
  });

  const productionData: Production[] = await res.json();

  const res2 = await fetch(`${process.env.BACKEND_URL}${PRODUCT_API}`, {
    cache: "no-store",
  });

  const productData: Product[] = await res2.json();

  const productOptions: OptionType[] = productData.map((product) => {
    return {
      value: product.id.toString(),
      label: product.name,
    };
  });

  return (
    <>
      <TableTopArea
        heading="Production / Consumption"
        searchTerm={""}
        filteredData={[]}
        data={[]}
      />
      <ScrollArea
        type="auto"
        scrollbars="both"
        style={{
          maxWidth: "100%",
          maxHeight: "70vh",
        }}
        className="!max-w-full !rounded-md !border !border-gray-200"
      >
        <TableRoot className="min-w-[1200px]">
          <TableHeader>
            <Table.Row className="!text-white">
              <TableHeading name="id" isFirst={true} />
              <TableHeading name="product" />
              <TableHeading name="country" />
              <TableHeading name="province" />
              <TableHeading name="division" />
              <TableHeading name="district" />
              <TableHeading name="population" />
              <TableHeading name="productionQuantity" />
              <TableHeading name="consumptionQuantity" />
              <TableHeading name="unitId" />
              <TableHeading name="createdAt" />
              <TableHeading name="updatedAt" />
              <TableHeading name="createdBy" />
              <TableHeading name="updatedBy" />
              <TableHeading colSpan={2} name="" />
            </Table.Row>
          </TableHeader>

          <Table.Body className="bg-theme !text-sm">
            {productionData.map((d) => (
              <Form
                key={d.id}
                api={PRODUCTION_API}
                method="PUT"
                data={d}
                productOptions={productOptions}
              />
            ))}
          </Table.Body>
        </TableRoot>
      </ScrollArea>
      {/* <Suspense fallback={<Spinner />}>
        <Pagination
          pageSize={pageSize}
          currentPage={myPage}
          itemCount={totalCount}
        />
      </Suspense> */}
    </>
  );
};

export default WinnerPricePage;
