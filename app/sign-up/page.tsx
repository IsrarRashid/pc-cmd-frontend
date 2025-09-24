import { Heading, Text } from "@radix-ui/themes";
import Image from "next/image";
import Link from "next/link";
import BgChanger from "../components/BgChanger";
import Form from "./components/Form";

const SignUpPage = () => {
  return (
    <div>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-[rgba(0,0,0,0.65)]"
        style={{ zIndex: 1 }}
      />
      {/* content */}
      <div
        style={{
          position: "relative",
          zIndex: "2",
        }}
      >
        <div className="fixed">
          <Link href="/" className="text-white text-lg">
            Back
          </Link>
        </div>
        <div className="flex justify-center">
          <div
            className="
        fixed 
        top-1/2 left-1/2 
        -translate-x-1/2 -translate-y-1/2 
        w-[95%] sm:w-[90%] md:w-8/12 lg:w-[988px] 
        bg-blur-3 
        border border-[rgba(203,213,225,0.2)] 
        rounded-[25px] 
        px-[30px] py-[45px]
      "
          >
            <div className="text-center" style={{ marginBottom: "20px" }}>
              <Image
                src="/images/Logo-wheat.png"
                alt="logo"
                width={80}
                height={66}
                style={{ width: "80px", height: "66px" }}
                className="mx-auto"
              />
            </div>
            <div className="row m-0">
              <div className="col text-center">
                <Heading
                  mb="2"
                  className="text-white fw-6 !font-extrabold !text-[2.25rem]"
                >
                  Sign up
                </Heading>
                <Text mb="8" as="p" size="4" className="text-white">
                  Please enter your email and password to Sign up and continue.
                </Text>
              </div>
            </div>
            <Form />
          </div>
        </div>
      </div>

      <BgChanger />
    </div>
  );
};

export default SignUpPage;
