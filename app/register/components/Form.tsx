"use client";

import { Button, Text, TextField } from "@radix-ui/themes";
import Image from "next/image";
import { PiArrowCircleRight } from "react-icons/pi";

// interface DivisionType {
//   id: number;
//   name: string;
// }

// interface DistrictType {
//   id: number;
//   name: string;
//   divisionId: number;
// }
// interface TehsilType {
//   id: number;
//   name: string;
//   districtId: number;
// }

const Form = () => {
  return (
    <form>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-1 mb-3">
        <div>
          <Text as="div" size="2" mb="1" weight="bold" className="text-white">
            Email Address
          </Text>
          <TextField.Root
            placeholder="Email"
            size="3"
            radius="full"
            className="!bg-white"
            // {...register("email")}
          >
            <TextField.Slot>
              <Image
                src="/icons/mail-at-sign-02.svg"
                alt="email"
                height={20}
                width={20}
              />
            </TextField.Slot>
          </TextField.Root>
          {/* {errors.email && (
            <span className="text-red-500">{errors.email.message}</span>
          )} */}
        </div>

        {/* Full Name */}
        <div>
          <Text as="div" size="2" mb="1" weight="bold" className="text-white">
            Full Name
          </Text>
          <TextField.Root
            placeholder="Name"
            size="3"
            radius="full"
            className="!bg-white"
            // {...register("userProfile.fullName")}
          >
            <TextField.Slot>
              <Image
                src="/icons/mail-at-sign-02.svg"
                alt="name"
                height={20}
                width={20}
              />
            </TextField.Slot>
          </TextField.Root>
          {/* {errors.userProfile?.fullName && (
            <span className="text-red-500">
              {errors.userProfile.fullName.message}
            </span>
          )} */}
        </div>

        {/* Role - read only */}
        <div>
          <Text as="div" size="2" mb="1" weight="bold" className="text-white">
            Role
          </Text>
          <TextField.Root
            size="3"
            radius="full"
            className="!bg-white"
            disabled
            // {...register("roleID")}
          >
            <TextField.Slot>
              <Image
                src="/icons/mail-at-sign-02.svg"
                alt="role"
                height={20}
                width={20}
              />
            </TextField.Slot>
          </TextField.Root>
        </div>

        {/* Division */}
        {/* <CustomSelect
          label="Division"
          name="divisionId"
          placeholder="Select Division"
          value={String(watch("userProfile.divisionId"))}
          onChange={(val) => setValue("userProfile.divisionId", Number(val))}
          options={divisionData.map((division) => ({
            label: division.name,
            value: division.id,
          }))}
          error={errors.userProfile?.divisionId?.message}
        /> */}

        {/* District */}
        {/* <CustomSelect
          label="District"
          placeholder="Select District"
          disabled={!selectedDivisionId}
          value={String(watch("userProfile.districtId") || "")}
          onChange={(val) => setValue("userProfile.districtId", Number(val))}
          options={districts.map((d) => ({ label: d.name, value: d.id }))}
          error={errors.userProfile?.districtId?.message}
        /> */}

        {/* Tehsil */}
        {/* <CustomSelect
          label="Tehsil"
          placeholder="Select Tehsil"
          disabled={!selectedDistrictId}
          value={String(watch("userProfile.tehsilId") || "")}
          onChange={(val) => setValue("userProfile.tehsilId", Number(val))}
          options={tehsilData.map((d) => ({ label: d.name, value: d.id }))}
          error={errors.userProfile?.tehsilId?.message}
        /> */}

        {/* Phone */}
        <div>
          <Text as="div" size="2" mb="1" weight="bold" className="text-white">
            Phone No
          </Text>
          <TextField.Root
            placeholder="Number"
            size="3"
            radius="full"
            className="!bg-white"
            // {...register("userProfile.phoneNumber")}
          >
            <TextField.Slot>
              <Image
                src="/icons/mail-at-sign-02.svg"
                alt="phone"
                height={20}
                width={20}
              />
            </TextField.Slot>
          </TextField.Root>
          {/* {errors.userProfile?.phoneNumber && (
            <span className="text-red-500">
              {errors.userProfile.phoneNumber.message}
            </span>
          )} */}
        </div>

        {/* Password */}
        <div>
          <Text as="div" size="2" mb="1" weight="bold" className="text-white">
            Password
          </Text>
          <TextField.Root
            type="password"
            placeholder="**********"
            radius="full"
            size="3"
            className="!bg-white"
            // {...register("password")}
          >
            <TextField.Slot>
              <Image
                src="/icons/password-validation.svg"
                alt="password"
                height={20}
                width={20}
              />
            </TextField.Slot>
          </TextField.Root>
          {/* {errors.password && (
            <span className="text-red-500">{errors.password.message}</span>
          )} */}
        </div>
      </div>

      <Button
        type="submit"
        className="!w-full !px-3 !py-6 !bg-primary text-white bg-clip-border "
        radius="full"
        // disabled={isSubmitting}
      >
        <Text>Sign up</Text> <PiArrowCircleRight size={20} />
      </Button>
    </form>
  );
};

export default Form;
