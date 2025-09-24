"use client";

// import { LOGIN_API } from "@/app/APIs";
import { Button, Text, TextField } from "@radix-ui/themes";
import Image from "next/image";
import { useState } from "react";
import { PiArrowCircleRight } from "react-icons/pi";
// import Cookies from "js-cookie";
// import { loginMessage } from "@/app/utils/utils";
import { FaRegEye } from "react-icons/fa";
import { TbEyeClosed } from "react-icons/tb";

const Form = () => {
  // const [isSubmitting, setSubmitting] = useState(false);
  // "email": "super_admin@gmail.com",
  //   "password": "!Super@Admin!12"

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);

  // Submit handler
  // const handleSubmit = async (e: React.FormEvent) => {
  //   e.preventDefault();

  //   try {
  //     const response = await axios.post(
  //       `${process.env.NEXT_PUBLIC_BACKEND_URL}${LOGIN_API}`,
  //       {
  //         email, // API expects "username"
  //         password,
  //       }
  //     );

  //     if (response.data.responseCode === 200) {
  //       toast.success(loginMessage);
  //       console.log("responseCode", response.data.responseCode);
  //       console.log("responseMessage", response.data.responseMessage);
  //       console.log("user logged in successfully", response);
  //       console.log("Login Success:", response.data);
  //       Cookies.set("token", response.data.data.token, {
  //         expires: new Date(response.data.data.expiration),
  //       });
  //       Cookies.set("userName", response.data.data.userData.userName, {
  //         expires: new Date(response.data.data.expiration),
  //       });
  //       Cookies.set("userId", response.data.data.userData.id.toString(), {
  //         expires: new Date(response.data.data.expiration),
  //       });
  //       Cookies.set("email", response.data.data.userData.email, {
  //         expires: new Date(response.data.data.expiration),
  //       });

  //       const timer = setTimeout(() => {
  //         router.push("/");
  //       }, 5000);

  //       return () => clearTimeout(timer); // Cleanup if component unmounts
  //     }
  //   } catch (err) {
  //     console.log("Login Failed:", err);
  //     toast.error((err as AxiosError).message);
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
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
            Role
          </Text>
          <TextField.Root
            placeholder="Write your Role"
            radius="full"
            size="3"
            className="!bg-white !h-[50px] [&_input]:!font-medium"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
            District
          </Text>
          <TextField.Root
            placeholder="Write your District"
            radius="full"
            size="3"
            className="!bg-white !h-[50px] [&_input]:!font-medium"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
            Division
          </Text>
          <TextField.Root
            placeholder="Write your Division"
            radius="full"
            size="3"
            className="!bg-white !h-[50px] [&_input]:!font-medium"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
            Tehsil
          </Text>
          <TextField.Root
            placeholder="Write your Tehsil"
            radius="full"
            size="3"
            className="!bg-white !h-[50px] [&_input]:!font-medium"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
            Phone No.
          </Text>
          <TextField.Root
            placeholder="Write your Phone No."
            radius="full"
            size="3"
            className="!bg-white !h-[50px] [&_input]:!font-medium"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
            Password
          </Text>
          <TextField.Root
            type={showPassword ? "text" : "password"}
            placeholder="**********"
            radius="full"
            size="3"
            className="!bg-white !h-[50px] [&_input]:!font-medium"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
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
