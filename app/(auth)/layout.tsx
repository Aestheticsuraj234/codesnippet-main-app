import React from "react";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col justify-center items-center h-full m-6 pb-10"> 
      {children}
    </div>
  );
};

export default AuthLayout;
