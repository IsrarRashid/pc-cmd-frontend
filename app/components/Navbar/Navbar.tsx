"use client";
import {
  Avatar,
  Box,
  Dialog,
  DropdownMenu,
  Flex,
  Heading,
  Text,
  useThemeContext,
} from "@radix-ui/themes";
import axios from "axios";
import Cookies from "js-cookie";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FaChevronDown } from "react-icons/fa";
import { toast } from "react-toastify";
// import CustomLabel from "../Form/CustomLabel";
// import CustomInput from "../Form/CustomInput";
import MegaMenu from "./MegaMenu";

const Navbar = () => {
  return (
    <nav className="py-1 px-[25px] bg-primary">
      <Flex align="center" justify="between" gap="2">
        <Box>
          <div className="flex items-center gap-[22px]">
            <Link href="/">
              <Image
                className="rounded-full"
                src="/images/logo-white.png"
                width={40}
                height={40}
                style={{ width: "40px", height: "40px" }}
                alt="logo"
              />
            </Link>
            <Flex align="center" className="!gap-[0.875rem]">
              <Heading size="5" className="text-white">
                PC & CMD
              </Heading>
              <Dialog.Root>
                <Dialog.Trigger>
                  <Avatar
                    src="/icons/arrow-right-01.svg"
                    fallback="arrow"
                    className="!w-[22px] !h-[22px] bg-[rgba(255,255,255,0.1)]"
                    radius="full"
                  />
                </Dialog.Trigger>

                <Dialog.Content
                  size="4"
                  maxWidth="1100px"
                  className="!py-[20px] !px-[20px] sm:px-[60px] !rounded-[20px] !border-[#F2F2F5] !border-[1px]"
                >
                  <Dialog.Title className="!sr-only">title</Dialog.Title>
                  <Dialog.Description size="2" mb="4" className="!sr-only">
                    description
                  </Dialog.Description>
                  <MegaMenu />
                </Dialog.Content>
              </Dialog.Root>
            </Flex>
          </div>
        </Box>
        {/* <Box className="hidden lg:block">
          <NavLinks />
        </Box> */}
        <Flex align="center" className="gap-[13px]">
          <Image
            className="rounded-4xl"
            src="/icons/maximize-screen.svg"
            width={24}
            height={24}
            style={{ width: "24px", height: "24px" }}
            alt="maximize-screen"
          />
          <div className="flex items-center">
            <AuthStatus />
          </div>
        </Flex>
      </Flex>
    </nav>
  );
};

// const NavLinks = () => {
//   const links = [
//     { label: "Food", href: "/food" },
//     { label: "Member", href: "/member/member-details" },
//     // { label: "Accounts", href: "/accounts" },
//     { label: "Room", href: "/room" },
//     // { label: "Payroll", href: "/payroll" },
//     { label: "Games", href: "/games" },
//   ];

//   const currentPath = usePathname();
//   const theme = useThemeContext();
//   return (
//     <ul className={`flex space-x-6 items-center bg-theme rounded-full h-12`}>
//       {links.map((link) => (
//         <li key={link.href} className="!ml-0">
//           <Link
//             className={classnames({
//               "nav-link": true,
//               "!text-white": theme.appearance === "dark",
//               "bg-[var(--accent-9)] !text-white":
//                 link.href.split("/")[1] === currentPath.split("/")[1],
//             })}
//             href={link.href}
//           >
//             {link.label}
//           </Link>
//         </li>
//       ))}
//     </ul>
//   );
// };

const AuthStatus = () => {
  const [email, setEmail] = useState<string>();
  const [status, setStatus] = useState<string>("loading");
  const router = useRouter();

  useEffect(() => {
    const email = Cookies.get("email");
    if (email) {
      setEmail(email);
      setStatus("authenticated");
    } else {
      setStatus("unauthenticated");
    }
  }, []);

  const theme = useThemeContext();

  if (status === "loading") return null;
  if (status === "unauthenticated")
    return (
      <Link
        className={`nav-link bg-theme bg-white rounded-lg p-1 ${
          theme.appearance === "dark" ? "!text-white" : ""
        }`}
        href="/signin"
      >
        Login
      </Link>
    );

  const handleSubmit = async () => {
    try {
      const res = await axios.post("/api/Auth/logout");
      console.log("res", res);

      if (res.status === 200) {
        toast.success(res.data.message);
        router.push("/login");
      }
    } catch (err) {
      console.log("err", err);
    }
  };

  return (
    <Box className="hidden md:block ">
      {status === "authenticated" && email && (
        <DropdownMenu.Root>
          <DropdownMenu.Trigger>
            <Box className="bg-[rgba(245,247,250,0.3)] rounded-full pe-4 p-1">
              <Flex align="center" gap="4" className="text-white">
                <Box>
                  <Avatar
                    src="/images/user.png"
                    fallback="?"
                    radius="full"
                    size="4"
                  />
                </Box>
                <Box>
                  <Heading as="h6" className="!text-[0.938rem] !font-semibold">
                    DFC Food
                  </Heading>
                  <Text as="p" className="text-[0.563rem]">
                    {email}
                  </Text>
                </Box>
                <Box>
                  <FaChevronDown size={12} />
                </Box>
              </Flex>
            </Box>
          </DropdownMenu.Trigger>
          <DropdownMenu.Content>
            <DropdownMenu.Label>
              <Text size="2">admin@gmail.com</Text>
            </DropdownMenu.Label>
            <DropdownMenu.Item>
              <Link href="/settings">Settings</Link>
            </DropdownMenu.Item>
            <DropdownMenu.Item>
              <button onClick={handleSubmit}>Log out</button>
            </DropdownMenu.Item>
          </DropdownMenu.Content>
        </DropdownMenu.Root>
      )}
    </Box>
  );
};

export default Navbar;
