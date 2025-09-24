"use client";
import {
  Avatar,
  Box,
  DropdownMenu,
  Flex,
  Heading,
  Text,
  useThemeContext,
} from "@radix-ui/themes";
import Image from "next/image";
import Link from "next/link";
import { FaChevronDown } from "react-icons/fa";

const Navbar = () => {
  return (
    <nav className="py-2.5 px-[25px] bg-primary">
      <Flex align="center" justify="between" gap="2">
        <Box>
          <Link href="/">
            <div className="flex items-center gap-[22px]">
              <Image
                className="rounded-full"
                src="/images/logo-white.png"
                width={61}
                height={61}
                style={{ width: "61px", height: "61px" }}
                alt="logo"
              />
              <Heading size="6" className="text-white">
                PC & CMD
              </Heading>
            </div>
          </Link>
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
  const status: string = "authenticated";
  const theme = useThemeContext();

  if (status === "loading") return null;
  if (status === "unauthenticated")
    return (
      <Link
        className={`nav-link bg-theme ${
          theme.appearance === "dark" ? "!text-white" : ""
        }`}
        href="/signin"
      >
        Login
      </Link>
    );

  return (
    <Box className="hidden md:block ">
      {status === "authenticated" && (
        <DropdownMenu.Root>
          <DropdownMenu.Trigger>
            <Box className="bg-[rgba(245,247,250,0.3)] rounded-full pe-4 p-1">
              <Flex align="center" gap="4" className="text-white">
                <Box>
                  <Avatar
                    src="/images/user.png"
                    fallback="?"
                    radius="full"
                    className="cursor-pointer"
                    size="4"
                  />
                </Box>
                <Box>
                  <Heading as="h6" className="!text-[0.938rem] !font-semibold">
                    DFC Food
                  </Heading>
                  <Text as="p" className="text-[0.563rem]">
                    admin@gmail.com
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
              <Link href="/signout">Log out</Link>
            </DropdownMenu.Item>
          </DropdownMenu.Content>
        </DropdownMenu.Root>
      )}
    </Box>
  );
};

export default Navbar;
