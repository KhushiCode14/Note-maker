// import React from "react";
import BasicTabs from "../../pages/Home";
import AddNote from "./AddNote";
import SeeNote from "./SeeNote";
import { useLocation, useNavigate } from "react-router-dom";

import { useEffect, useState } from "react";
const Note = () => {
  const [activeTab, setActiveTab] = useState(0); // Track active tab state
  const location = useLocation();
  const navigate = useNavigate();
  const tabsData = [
    { label: "Add Note", content: <AddNote />, path: "/note/add" },
    { label: "See Note", content: <SeeNote />, path: "/note/see" },
  ];
  // Use location to determine which tab to activate
  useEffect(() => {
    const activeTabIndex = tabsData.findIndex(
      (tab) => tab.path === location.pathname
    );
    setActiveTab(activeTabIndex !== -1 ? activeTabIndex : 0);
  }, [location.pathname]);

  // Handle tab change when URL is changed
  const handleTabChange = (index) => {
    navigate(tabsData[index].path);
  };

  return (
    <div>
      <BasicTabs
        tabs={tabsData}
        activeTabIndex={activeTab}
        onTabChange={handleTabChange} // Set the active tab
      />
    </div>
  );
};

export default Note;
