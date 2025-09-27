"use client";

// import { LOGIN_API } from "@/app/APIs";
import { Button, Flex, Text, TextField } from "@radix-ui/themes";
import Image from "next/image";
import { useState } from "react";
import { PiArrowCircleRight } from "react-icons/pi";
// import Cookies from "js-cookie";
// import { loginMessage } from "@/app/utils/utils";
import { LOGIN_API } from "@/app/APIs";
import axios, { AxiosError } from "axios";
import Link from "next/link";
import { FaRegEye } from "react-icons/fa";
import { TbEyeClosed } from "react-icons/tb";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import apiClient from "@/app/services/api-client";
import Spinner from "@/app/components/Spinner";

const schema = z.object({
  email: z.string().min(1, { message: "Please add Username!" }),
  password: z.string().min(1, { message: "Please add Password!" }),
});

export type Login = z.infer<typeof schema>; // this interface is for form data

interface LoginResponse {
  responseCode: number;
  responseMessage: string;
  data: {
    token: string;
    expiration: string;
    role: [];
    userData: {
      id: string;
      userName: string;
      normalizedUserName: string;
      email: string;
      normalizedEmail: string;
      emailConfirmed: boolean;
      passwordHash: string;
      securityStamp: string;
      concurrencyStamp: string;
      phoneNumber: null;
      phoneNumberConfirmed: boolean;
      twoFactorEnabled: boolean;
      lockoutEnd: null;
      lockoutEnabled: boolean;
      accessFailedCount: number;
    };
    userProfile: null;
  };
}

const Form = () => {
  // "email": "super_admin@gmail.com",
  //   "password": "!Super@Admin!12"

  // "email": "test@gmail.com",
  // "password": "Abcd@123"

  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Login>({ resolver: zodResolver(schema) });
  const [isSubmitting, setSubmitting] = useState(false);

  const onSubmit = async (formData: Login) => {
    console.log("Form Data:", formData);
    try {
      setSubmitting(true);
      const res = await apiClient.post<LoginResponse>(LOGIN_API, formData);
      console.log("response", res);
      const response: LoginResponse = res.data;

      if (response.responseCode === 200) {
        toast.success(response.responseMessage);
        router.push("/");
      } else if (response.responseCode === 401) {
        toast.info(response.responseMessage);
      }
      console.log("response", response);
    } catch (err) {
      toast.error((err as AxiosError).message);
      setSubmitting(false);
      console.log(err);
    } finally {
      setSubmitting(false); // Always run after try/catch
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Flex direction="column" gap="6" className="mb-[30px]">
        <label>
          <Text as="div" size="2" mb="1" weight="bold" className="text-white">
            Email Address
          </Text>
          <TextField.Root
            {...register("email")}
            placeholder="Email"
            radius="full"
            size="3"
            className="!bg-white !h-[50px] [&_input]:!font-medium"
            autoComplete="on"
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
          {errors.email && (
            <p className="text-primary mt-1">{errors.email.message}</p>
          )}
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
            autoComplete="current-password"
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
                className="cursor-pointer focus:outline-none relative"
              >
                <FaRegEye
                  size={20}
                  className={`absolute -top-2 right-0 transition-all ${
                    showPassword
                      ? "opacity-100 scale-y-100 duration-400 "
                      : "opacity-0 scale-y-0 duration-500 "
                  }`}
                />

                {/* Closed Eye */}
                <TbEyeClosed
                  size={20}
                  className={`absolute right-0 rotate-0 transition-all duration-500  ${
                    !showPassword
                      ? "opacity-100 -top-1 scale-y-100 "
                      : "opacity-0 -top-3.5 scale-y-0"
                  }`}
                />

                {/* Eye Closed Flipped */}
                <TbEyeClosed
                  size={20}
                  className={`absolute right-0 rotate-180 transition-all duration-500 ${
                    showPassword
                      ? "opacity-100 -top-3.5 scale-y-100"
                      : "opacity-0 -top-1 scale-y-0"
                  }`}
                />
                {/* {showPassword ? (
                  <FaRegEye size={20} />
                ) : (
                  <TbEyeClosed size={20} />
                )} */}
              </button>
            </TextField.Slot>
          </TextField.Root>
          {errors.password && (
            <p className="text-primary mt-1">{errors.password.message}</p>
          )}
        </label>
      </Flex>
      <Button
        type="submit"
        className="!w-full !px-3 !py-6 !bg-primary !text-white bg-clip-border"
        radius="full"
        mb="8"
        disabled={isSubmitting}
      >
        <Text weight="bold" size="3">
          Login
        </Text>{" "}
        {isSubmitting ? <Spinner /> : <PiArrowCircleRight size={20} />}
      </Button>
      <Text as="p" align="center" size="4" className="!text-white">
        Don&apos;t have an Account?{" "}
        <Link href="/sign-up" className="text-primary underline">
          Sign up
        </Link>
      </Text>
    </form>
  );
};

export default Form;
