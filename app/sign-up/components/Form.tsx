"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Text, TextField } from "@radix-ui/themes";
import Image from "next/image";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { FaRegEye } from "react-icons/fa";
import { FiPhone } from "react-icons/fi";
import { LuUserRound } from "react-icons/lu";
import { PiArrowCircleRight } from "react-icons/pi";
import { TbEyeClosed, TbMap2 } from "react-icons/tb";
import z from "zod";

const userProfileSchema = z.object({
  id: z.string().min(1, { message: "Please add id!" }),
  userId: z.string().min(1, { message: "Please add userId!" }),
  typeId: z.number().min(1, { message: "Please add typeId!" }),
  name: z.string().min(1, { message: "Please add name!" }),
  licenseNo: z.string().min(1, { message: "Please add licenseNo!" }),
  designation: z.string().min(1, { message: "Please add designation!" }),
  phoneNumber: z.string().min(1, { message: "Please add phoneNumber!" }),
  email: z.email().min(1, { message: "Please add Username!" }),
  cnic: z.string().min(1, { message: "Please add cnic!" }),
  divisionId: z.number().min(1, { message: "Please add divisionId!" }),
  districtId: z.number().min(1, { message: "Please add districtId!" }),
  tehsilId: z.number().min(1, { message: "Please add tehsilId!" }),
  address: z.string().min(1, { message: "Please add address!" }),
  profilePic: z.string().min(1, { message: "Please add profilePic!" }),
  capacity: z.number().min(1, { message: "Please add capacity!" }),
  createdAt: z.number().min(1, { message: "Please add createdAt!" }),
  createdBy: z.number().min(1, { message: "Please add createdBy!" }),
  updatedAt: z.number().min(1, { message: "Please add updatedAt!" }),
  updatedBy: z.number().min(1, { message: "Please add updatedBy!" }),
});

const schema = z.object({
  username: z.string().min(1, { message: "Please add Username!" }),
  email: z.email().min(1, { message: "Please add Username!" }),
  password: z.string().min(1, { message: "Please add Password!" }),
  roleID: z.string().min(1, { message: "Please add Role!" }),
  userProfile: userProfileSchema,
});

export type Register = z.infer<typeof schema>; // this interface is for form data

// interface RegisterResponse {
//   responseCode: number;
//   responseMessage: string;
//   data: null;
// }

const Form = () => {
  const [showPassword, setShowPassword] = useState(false);
  // const router = useRouter();

  const {
    register,
    // handleSubmit,
    // formState: { errors },
  } = useForm<Register>({ resolver: zodResolver(schema) });
  // const [isSubmitting, setSubmitting] = useState(false);

  // const onSubmit = async (formData: Register) => {
  //   console.log("Form Data:", formData);
  //   try {
  //     setSubmitting(true);
  //     const res = await apiClient.post<RegisterResponse>(LOGIN_API, formData);
  //     console.log("response", res);
  //     const response: RegisterResponse = res.data;

  //     if (response.responseCode === 200) {
  //       toast.success(response.responseMessage);
  //       router.push("/");
  //     } else if (response.responseCode === 401) {
  //       toast.info(response.responseMessage);
  //     }
  //     console.log("response", response);
  //   } catch (err) {
  //     toast.error((err as AxiosError).message);
  //     setSubmitting(false);
  //     console.log(err);
  //   } finally {
  //     setSubmitting(false); // Always run after try/catch
  //   }
  // };

  return (
    <form>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-[30px]">
        {/* <Flex direction="column" gap="6" className="mb-[30px]"> */}
        <label>
          <Text as="div" size="2" mb="1" weight="bold" className="text-white">
            Email Address
          </Text>
          <TextField.Root
            placeholder="Write your Email"
            type="email"
            radius="full"
            size="3"
            className="!bg-white !h-[50px] [&_input]:!font-medium"
            {...register("email")}
          >
            <TextField.Slot className="!font-medium">
              <Image
                src="/icons/mail-at-sign-02.svg"
                alt="email"
                height={20}
                width={20}
                style={{ width: "20px", height: "20px" }}
              />
            </TextField.Slot>
          </TextField.Root>
        </label>
        <label>
          <Text as="div" size="2" mb="1" weight="bold" className="text-white">
            Full Name
          </Text>
          <TextField.Root
            placeholder="Write your Full Name"
            radius="full"
            size="3"
            className="!bg-white !h-[50px] [&_input]:!font-medium"
            {...register("username")}
          >
            <TextField.Slot className="!font-medium">
              <LuUserRound className="text-[#475569]" size={20} />
            </TextField.Slot>
          </TextField.Root>
        </label>
        <label>
          <Text as="div" size="2" mb="1" weight="bold" className="text-white">
            Role
          </Text>
          <TextField.Root
            {...register("roleID")}
            placeholder="Write your Role"
            radius="full"
            size="3"
            className="!bg-white !h-[50px] [&_input]:!font-medium"
          >
            <TextField.Slot className="!font-medium">
              <Image
                src="/icons/mentoring.svg"
                alt="mentoring"
                height={20}
                width={20}
                style={{ width: "20px", height: "20px" }}
              />
            </TextField.Slot>
          </TextField.Root>
        </label>
        <label>
          <Text as="div" size="2" mb="1" weight="bold" className="text-white">
            District
          </Text>
          <TextField.Root
            {...register("userProfile.districtId")}
            placeholder="Write your District"
            radius="full"
            size="3"
            className="!bg-white !h-[50px] [&_input]:!font-medium"
          >
            <TextField.Slot className="!font-medium">
              <TbMap2 className="text-[#475569]" size={20} />
            </TextField.Slot>
          </TextField.Root>
        </label>
        <label>
          <Text as="div" size="2" mb="1" weight="bold" className="text-white">
            Division
          </Text>
          <TextField.Root
            {...register("userProfile.divisionId")}
            placeholder="Write your Division"
            radius="full"
            size="3"
            className="!bg-white !h-[50px] [&_input]:!font-medium"
          >
            <TextField.Slot className="!font-medium">
              <Image
                src="/icons/maping.svg"
                alt="maping"
                height={20}
                width={20}
                style={{ width: "20px", height: "20px" }}
              />
            </TextField.Slot>
          </TextField.Root>
        </label>
        <label>
          <Text as="div" size="2" mb="1" weight="bold" className="text-white">
            Tehsil
          </Text>
          <TextField.Root
            {...register("userProfile.tehsilId")}
            placeholder="Write your Tehsil"
            radius="full"
            size="3"
            className="!bg-white !h-[50px] [&_input]:!font-medium"
          >
            <TextField.Slot className="!font-medium">
              <Image
                src="/icons/maps-circle-01.svg"
                alt="email"
                height={20}
                width={20}
                style={{ width: "20px", height: "20px" }}
              />
            </TextField.Slot>
          </TextField.Root>
        </label>
        <label>
          <Text as="div" size="2" mb="1" weight="bold" className="text-white">
            Phone No.
          </Text>
          <TextField.Root
            {...register("userProfile.phoneNumber")}
            placeholder="Write your Phone No."
            radius="full"
            size="3"
            className="!bg-white !h-[50px] [&_input]:!font-medium"
          >
            <TextField.Slot className="!font-medium">
              <FiPhone className="text-[#475569]" size={20} />
              <Image
                src="/icons/mail-at-sign-02.svg"
                alt="email"
                height={20}
                width={20}
                style={{ width: "20px", height: "20px" }}
              />
            </TextField.Slot>
          </TextField.Root>
        </label>
        <label>
          <Text as="div" size="2" mb="1" weight="bold" className="text-white">
            Password
          </Text>
          <TextField.Root
            {...register("password")}
            type={showPassword ? "text" : "password"}
            placeholder="**********"
            radius="full"
            size="3"
            className="!bg-white !h-[50px] [&_input]:!font-medium"
          >
            <TextField.Slot>
              <Image
                src="/icons/password-validation.svg"
                alt="password"
                height={20}
                width={20}
                style={{ width: "20px", height: "20px" }}
              />
            </TextField.Slot>

            {/* Right eye toggle slot */}
            <TextField.Slot side="right">
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="cursor-pointer focus:outline-none"
              >
                {showPassword ? (
                  <FaRegEye size={20} />
                ) : (
                  <TbEyeClosed size={20} />
                )}
              </button>
            </TextField.Slot>
          </TextField.Root>
        </label>
      </div>
      <Button
        type="submit"
        className="!w-full !px-3 !py-6 !bg-primary text-white bg-clip-border"
        radius="full"
      >
        <Text weight="bold" size="3">
          Sign up
        </Text>{" "}
        <PiArrowCircleRight size={20} />
      </Button>
      {/* <Text as="p" align="center" size="4" className="!text-white">
        have an Account?{" "}
        <Link href="/login" className="text-primary underline">
          Login
        </Link>
      </Text> */}
    </form>
  );
};

export default Form;
