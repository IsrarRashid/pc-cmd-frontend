"use client";

import { MouseEvent, useRef, useState } from "react";
import CustomRadixInput from "../../Form/CustomRadixInput";
import CustomLabel from "../../Form/CustomLabel";
import CustomSelect, { defaultOption } from "../../Form/CustomSelect";
import CustomInput from "../../Form/CustomInput";
import { TbFileUpload } from "react-icons/tb";
import FileUpload from "../FileUpload";
import { Box, Flex, IconButton, Text } from "@radix-ui/themes";

const Form = () => {
  const [selectedDistrict, setSelectedDistrict] = useState<string>("");
  const [selectedFile, setSelectedFile] = useState<File>();
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const districtOptions = [
    { districtName: "Okara" },
    { districtName: "Sahiwal" },
    { districtName: "Sargodha" },
  ].map((district) => {
    return {
      value: district.districtName,
      label: district.districtName,
    };
  });

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

  const handleFile = (file: File) => {
    console.log("Selected file:", file);
  };

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-3 mb-2.5 items-center gap-[1.25rem]">
        <CustomLabel
          inputNode={<CustomRadixInput placeholder="Enter First Name" />}
        >
          First Name
        </CustomLabel>
        <CustomLabel
          inputNode={<CustomRadixInput placeholder="Enter Last Name" />}
        >
          Last Name
        </CustomLabel>
        <CustomLabel
          inputNode={<CustomRadixInput placeholder="Enter Buyer Name" />}
        >
          Buyer Name
        </CustomLabel>
        <CustomLabel
          inputNode={
            <CustomSelect
              options={[defaultOption, ...districtOptions]}
              id="division"
              closeMenuOnSelect={true}
              // value={
              //   smdpIdentifierOptions.find(
              //     (opt) => opt.value === formData.smdpIdentifier
              //   )
              //     ? [
              //         smdpIdentifierOptions.find(
              //           (opt) => opt.value === formData.smdpIdentifier
              //         )!,
              //       ]
              //     : null
              // }
              // onChangeSingle={(nv, meta) =>
              //   handleSelectChange("smdpIdentifier", nv, meta, setFormData)
              // }
            />
          }
        >
          Division
        </CustomLabel>
        <CustomLabel
          inputNode={
            <CustomSelect
              options={[defaultOption, ...districtOptions]}
              id="district"
              closeMenuOnSelect={true}
              // value={
              //   smdpIdentifierOptions.find(
              //     (opt) => opt.value === formData.smdpIdentifier
              //   )
              //     ? [
              //         smdpIdentifierOptions.find(
              //           (opt) => opt.value === formData.smdpIdentifier
              //         )!,
              //       ]
              //     : null
              // }
              // onChangeSingle={(nv, meta) =>
              //   handleSelectChange("smdpIdentifier", nv, meta, setFormData)
              // }
            />
          }
        >
          District
        </CustomLabel>

        <CustomLabel
          inputNode={
            <CustomSelect
              options={[defaultOption, ...districtOptions]}
              id="tehsil"
              closeMenuOnSelect={true}
              // value={
              //   smdpIdentifierOptions.find(
              //     (opt) => opt.value === formData.smdpIdentifier
              //   )
              //     ? [
              //         smdpIdentifierOptions.find(
              //           (opt) => opt.value === formData.smdpIdentifier
              //         )!,
              //       ]
              //     : null
              // }
              // onChangeSingle={(nv, meta) =>
              //   handleSelectChange("smdpIdentifier", nv, meta, setFormData)
              // }
            />
          }
        >
          Tehsil
        </CustomLabel>

        <CustomLabel
          inputNode={
            <CustomSelect
              options={[defaultOption, ...districtOptions]}
              id="sector"
              closeMenuOnSelect={true}
              // value={
              //   smdpIdentifierOptions.find(
              //     (opt) => opt.value === formData.smdpIdentifier
              //   )
              //     ? [
              //         smdpIdentifierOptions.find(
              //           (opt) => opt.value === formData.smdpIdentifier
              //         )!,
              //       ]
              //     : null
              // }
              // onChangeSingle={(nv, meta) =>
              //   handleSelectChange("smdpIdentifier", nv, meta, setFormData)
              // }
            />
          }
        >
          Sector
        </CustomLabel>
        <CustomLabel
          inputNode={
            <CustomSelect
              options={[defaultOption, ...districtOptions]}
              id="field"
              closeMenuOnSelect={true}
              // value={
              //   smdpIdentifierOptions.find(
              //     (opt) => opt.value === formData.smdpIdentifier
              //   )
              //     ? [
              //         smdpIdentifierOptions.find(
              //           (opt) => opt.value === formData.smdpIdentifier
              //         )!,
              //       ]
              //     : null
              // }
              // onChangeSingle={(nv, meta) =>
              //   handleSelectChange("smdpIdentifier", nv, meta, setFormData)
              // }
            />
          }
        >
          Field
        </CustomLabel>
        <CustomLabel inputNode={<CustomRadixInput placeholder="Enter value" />}>
          Stock
        </CustomLabel>
      </div>
      {/* <FileUpload onFileSelect={handleFile} /> */}

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
            <IconButton className="!bg-primary/20 !w-12 !h-12" radius="full">
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
            <Text as="p" size="1" weight="medium" className="!text-[#94A3B8]">
              {selectedFile
                ? selectedFile.name
                : "Supported Format: JPG, PNG (10mb each)"}
            </Text>
          </Box>
        </Flex>
      </div>
    </>
  );
};

export default Form;
