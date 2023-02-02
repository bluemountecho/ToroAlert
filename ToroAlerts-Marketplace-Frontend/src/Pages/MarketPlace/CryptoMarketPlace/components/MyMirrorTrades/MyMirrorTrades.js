import React from "react";
import { useParams } from "react-router-dom";
import PointerBreadcrumb from "../../../../../componets/Breadcrumb/PointerBreadcrumb/PointerBreadcrumb";
import ConfiguredTrades from "./components/ConfiguredTrades/ConfiguredTrades";
import NotConfiguredTrades from "./components/NotConfiguredTrades/NotConfiguredTrades";

const MyMirrorTrades = () => {
  const { subType } = useParams();
  return (
    <div>
      <PointerBreadcrumb
        breadcrumbLabels={[
          {
            label: "Confgured Platform",
            url: "/marketplace/my-mirror-trades/configured-platform",
          },
          {
            label: "Available Platform",
            url: "/marketplace/my-mirror-trades/available-platform",
          },
        ]}
      />
      {subType === "configured-platform" && <ConfiguredTrades />}
      {subType === "available-platform" && <NotConfiguredTrades />}
    </div>
  );
};

export default MyMirrorTrades;
