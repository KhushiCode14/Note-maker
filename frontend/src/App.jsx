import React from "react";
import BasicTabs from "./pages/Home";

const App = () => {
  const LoginForm = () => <div>Login Form</div>;
  const RegisterForm = () => <div>Register Form</div>;
  const AddNote = () => <div>Add Note Form</div>;
  const SeeNote = () => <div>See Note Form</div>;
  const tabsData = [
    { label: "Login", content: <LoginForm /> },
    { label: "Register", content: <RegisterForm /> },
    { label: "Add Note", content: <AddNote /> },
    { label: "See Note", content: <SeeNote /> },
  ];

  return <BasicTabs tabs={tabsData} />;
};

export default App;
