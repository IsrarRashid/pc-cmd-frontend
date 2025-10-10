import { PropsWithChildren } from "react";

const DashboardWrapper = ({ children }: PropsWithChildren) => {
  return (
    <div
      className="py-2.5 px-1 bg-no-repeat"
      style={{
        background: "#002344",
        backgroundSize: "100% 100%",
        backgroundPosition: "center",
      }}
    >
      {children}
    </div>
  );
};

export default DashboardWrapper;
