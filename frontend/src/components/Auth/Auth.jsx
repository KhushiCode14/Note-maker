// import React from "react";
import BasicTabs from "../../pages/Home";
import Login from "./Login";
import Register from "./Register";

const Auth = () => {
  const tabsData = [
    { label: "Login", content: <Login />, path: "/auth/login" },
    { label: "Register", content: <Register />, path: "/auth/register" },
  ];
  return (
    <div>
      <BasicTabs tabs={tabsData} />
    </div>
  );
};

export default Auth;
