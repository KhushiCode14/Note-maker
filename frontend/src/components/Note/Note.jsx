// import React from "react";
import BasicTabs from "../../pages/Home";
import AddNote from "./AddNote";
import SeeNote from "./SeeNote";

const Note = () => {
  const tabsData = [
    { label: "Add Note", content: <AddNote />, path: "/note/add" },
    { label: "See Note", content: <SeeNote />, path: "/note/see" },
  ];
  return (
    <div>
      <BasicTabs tabs={tabsData} />
    </div>
  );
};

export default Note;
