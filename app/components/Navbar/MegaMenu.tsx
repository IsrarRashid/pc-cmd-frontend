import {
  COUNTRY_API,
  DISTRICT_API,
  DIVISION_API,
  PRODUCT_API,
  PROVINCE_API,
} from "@/app/APIs";
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
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { ReactNode, useState } from "react";
import {
  FiArchive,
  FiBookOpen,
  FiPackage,
  FiSunrise,
  FiTarget,
  FiYoutube,
} from "react-icons/fi";
import { IoClose } from "react-icons/io5";
import { OptionType } from "../Form/CustomSelect";
import CountryForm from "./forms/CountryForm";
import Form from "./forms/Form";
import ProductForm, { Product } from "./forms/ProductForm";
import ProductionForm from "./forms/ProductionForm";
import ProvinceForm from "./forms/ProvinceForm";

export interface MegaMenuTile {
  label: string;
  description: string;
  icon: ReactNode;
  isBadge: boolean;
}

const MegaMenu = () => {
  const { data: products } = useQuery<Product[]>({
    queryKey: ["products"],
    queryFn: () => axios.get(PRODUCT_API).then((res) => res.data),
    staleTime: 60 * 1000, // 60s
    retry: 3,
  });

  const { data: countries } = useQuery<Product[]>({
    queryKey: ["countries"],
    queryFn: () => axios.get(COUNTRY_API).then((res) => res.data),
    staleTime: 60 * 1000, // 60s
    retry: 3,
  });

  const { data: provinces } = useQuery<Product[]>({
    queryKey: ["provinces"],
    queryFn: () => axios.get(PROVINCE_API).then((res) => res.data),
    staleTime: 60 * 1000, // 60s
    retry: 3,
  });

  const { data: divisions } = useQuery<Product[]>({
    queryKey: ["divisions"],
    queryFn: () => axios.get(DIVISION_API).then((res) => res.data),
    staleTime: 60 * 1000, // 60s
    retry: 3,
  });

  const { data: districts } = useQuery<Product[]>({
    queryKey: ["districts"],
    queryFn: () => axios.get(DISTRICT_API).then((res) => res.data),
    staleTime: 60 * 1000, // 60s
    retry: 3,
  });

  const productOptions: OptionType[] | undefined = products?.map((product) => {
    return {
      value: product.id.toString(),
      label: product.name,
    };
  });

  const countryOptions: OptionType[] | undefined = countries?.map((country) => {
    return {
      value: country.id.toString(),
      label: country.name,
    };
  });

  const provinceOptions: OptionType[] | undefined = provinces?.map(
    (province) => {
      return {
        value: province.id.toString(),
        label: province.name,
      };
    }
  );

  const divisionOptions: OptionType[] | undefined = divisions?.map(
    (division) => {
      return {
        value: division.id.toString(),
        label: division.name,
      };
    }
  );

  const districtOptions: OptionType[] | undefined = districts?.map(
    (district) => {
      return {
        value: district.id.toString(),
        label: district.name,
      };
    }
  );

  const provinceData = [
    {
      label: "Punjab",
      description: "Add Province Consumption",
      icon: <FiSunrise className="text-primary" size={24} />,
      isBadge: false,
    },

    {
      label: "Sindh",
      description: "Add Province Consumption",
      icon: <FiTarget className="text-primary" size={24} />,
      isBadge: false,
    },
    {
      label: "Baluchistan",
      description: "Add Province Consumption",
      icon: <FiPackage className="text-primary" size={24} />,
      isBadge: false,
    },
    {
      label: "KPK",
      description: "Add Province Consumption",
      icon: <FiPackage className="text-primary" size={24} />,
      isBadge: false,
    },
  ];

  const formsData = [
    {
      label: "Divisions Consumption",
      description: "Add Province Consumption",
      icon: <FiBookOpen className="text-primary" size={24} />,
      isBadge: false,
    },

    {
      label: "Divisions Production",
      description: "Add Province production",
      icon: <FiArchive className="text-primary" size={24} />,
      isBadge: false,
    },
    {
      label: "District Consumption",
      description: "Add District Consumption",
      icon: <FiYoutube className="text-primary" size={24} />,
      isBadge: false,
    },
    {
      label: "District production",
      description: "Add District production",
      icon: <FiYoutube className="text-primary" size={24} />,
      isBadge: false,
    },
  ];

  // const productData: MegaMenuTile[] = [
  //   {
  //     label: "Add Product",
  //     description: "Add product Data",
  //     icon: <FiAward className="text-primary" size={24} />,
  //     isBadge: false,
  //   },
  //   {
  //     label: "Add Production",
  //     description: "Add Production Data",
  //     icon: <FiUserCheck className="text-primary" size={24} />,
  //     isBadge: false,
  //   },
  //   {
  //     label: "Add Product Seasons",
  //     description: "Add Product Seasons",
  //     icon: <FiCrosshair className="text-primary" size={24} />,
  //     isBadge: false,
  //   },
  //   {
  //     label: "Affected Areas",
  //     description: "Add Affected Areas Data",
  //     icon: <FiUserCheck className="text-primary" size={24} />,
  //     isBadge: true,
  //   },
  // ];

  const getStartedData = [
    "Punjab",
    "KPK",
    "Baluchistan",
    "Sindh",
    "Import",
    "Export",
  ];
  const [open, setOpen] = useState(false);

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-[auto_auto_1fr_auto] gap-[3.125rem]">
      <Box>
        <Text as="p" size="2" weight="medium" className="text-primary" mb="4">
          Province Data
        </Text>
        {provinceData.map((d, i) => (
          <Dialog.Root key={i} open={open} onOpenChange={setOpen}>
            <Dialog.Trigger>
              <Flex
                gap="4"
                p="3"
                className="hover:!bg-gray-100 !rounded-md !transition-colors !duration-150"
              >
                {d.icon}
                <Box>
                  <Flex gap="2" align="center" mb="2">
                    <Text as="p" size="4" weight="medium">
                      {d.label}
                    </Text>
                    {d.isBadge && (
                      <Badge
                        className="!text-[#1F6142] !bg-[#E8FDF1] !font-normal !py-[.25em] !px-[.5em]"
                        radius="full"
                      >
                        NEW
                      </Badge>
                    )}
                  </Flex>
                  <Text as="p" size="2" className="!text-[#686868]">
                    {d.description}
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
                    New Form
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

              <Form />
            </Dialog.Content>
          </Dialog.Root>
        ))}
      </Box>
      <Box>
        <Text as="p" size="2" weight="medium" className="text-primary" mb="4">
          Forms
        </Text>
        {formsData.map((d, i) => (
          <Dialog.Root key={i}>
            <Dialog.Trigger>
              <Flex
                gap="4"
                p="3"
                className="hover:!bg-gray-100 !rounded-md !transition-colors !duration-150"
              >
                {d.icon}
                <Box>
                  <Flex gap="2" align="center" mb="2">
                    <Text as="p" size="4" weight="medium">
                      {d.label}
                    </Text>
                    {d.isBadge && (
                      <Badge
                        className="!text-[#1F6142] !bg-[#E8FDF1] !font-normal !py-[.25em] !px-[.5em]"
                        radius="full"
                      >
                        NEW
                      </Badge>
                    )}
                  </Flex>
                  <Text as="p" size="2" className="!text-[#686868]">
                    {d.description}
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
                    New Form
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

              <Form />

              <Flex gap="3" mt="4" justify="between">
                <Dialog.Close>
                  <Button className="!w-[187px] !h-[41px] !text-primary !py-[0.688em] !px-[1em] !font-bold !bg-[#EFF0F2] !rounded-[5px] !border-[1px] !border-[rgba(239,240,242,0.4)]">
                    Cancel
                  </Button>
                </Dialog.Close>
                <Dialog.Close>
                  <Button
                    form={d.label}
                    className="!w-[187px] !h-[41px] !bg-primary !py-[0.688em] !px-[1em] !font-bold !rounded-[5px] !border-[1px] !border-primary"
                  >
                    Save Form
                  </Button>
                </Dialog.Close>
              </Flex>
            </Dialog.Content>
          </Dialog.Root>
        ))}
      </Box>
      <Box>
        <Text as="p" size="2" weight="medium" className="text-primary" mb="4">
          Product
        </Text>
        <ProductForm />
        {/* <Link href="/production-consumption/list">
          <ActionButton
            name="Production / Consumption"
            icon={<FiAward className="text-primary" size={24} />}
            description="Production / Consumption Data"
          />
        </Link> */}
        {productOptions &&
          countryOptions &&
          provinceOptions &&
          divisionOptions &&
          districtOptions && (
            <ProductionForm
              productOptions={productOptions}
              countryOptions={countryOptions}
              provinceOptions={provinceOptions}
              divisionOptions={divisionOptions}
              districtOptions={districtOptions}
            />
          )}
        <CountryForm />
        <ProvinceForm />
      </Box>
      <Box>
        <Text as="p" size="2" weight="medium" className="text-primary" mb="4">
          Get Started
        </Text>
        {getStartedData.map((d) => (
          <Text
            key={d}
            as="p"
            weight="medium"
            size="4"
            className="!p-3 hover:!bg-gray-100 !rounded-md !transition-colors !duration-150"
            mb="2"
          >
            {d}
          </Text>
        ))}
      </Box>
    </div>
  );
};

export default MegaMenu;

// const useUsers = () =>
//   const {data:products, error, isLoading} = useQuery<string[]>({
//     queryKey: ["products"],
//     queryFn: () => axios.get(PRODUCT_API).then((res) => res.data),
//     staleTime: 60 * 1000, // 60s
//     retry: 3,
//   });
