import { Heading, Text } from "@radix-ui/themes";
import Image from "next/image";
import RegisterForm from "./components/Form";

const SignUpPage = () => {
  return (
    <div className="!w-[100vw] overflow-x-hidden min-h-screen bg-[url('/images/wheat-bg.jpg')] bg-center bg-cover -m-5">
      <div className="">
        <div className="flex justify-center items-center  min-h-screen">
          <div
            className="
        w-3/4
        bg-blur-3 
        border border-white/30 
        rounded-[25px] 
        p-4
      "
          >
            <div className="text-center" style={{ marginBottom: "20px" }}>
              <Image
                src="/images/Logo-wheat.png"
                alt="logo"
                width={90}
                height={77}
                style={{ width: "90px", height: "77px" }}
                className="mx-auto"
              />
            </div>
            <div className="row m-0">
              <div className="col text-center">
                <Heading
                  size="8"
                  mb="2"
                  className="text-white fw-6 font-extrabold"
                >
                  Sign up
                </Heading>
                <Text mb="8" as="p" className="text-white">
                  Please enter your email and password to Sign up and continue.
                </Text>
              </div>
            </div>
            <RegisterForm />
          </div>
        </div>
      </div>

      {/* <BgChanger /> */}
    </div>
  );
};

export default SignUpPage;
