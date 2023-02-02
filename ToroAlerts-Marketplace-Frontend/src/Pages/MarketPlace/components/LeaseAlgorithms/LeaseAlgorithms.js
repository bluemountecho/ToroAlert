import React from "react";
import { useParams } from "react-router-dom";
import PointerBreadcrumb from "../../../../componets/Breadcrumb/PointerBreadcrumb/PointerBreadcrumb";
import TopPerformingStrategies from "./components/TopPerformingStrategies/TopPerformingStrategies";
import FreeAlgorithms from "./components/FreeAlgorithms/FreeAlgorithms";
import FindAlgorithms from "./components/FindAlgorithms/FindAlgorithms";
import Favourites from "./components/Favourites/Favourites";
import SubscribedAlgorithms from "./components/SubscribedAlgorithms/SubscribedAlgorithms";

const LeaseAlgorithms = () => {
  const { subType, searchType } = useParams();

  return (
    <div>
      <PointerBreadcrumb
        breadcrumbLabels={[
          {
            label: "Top Performing Strategies",
            url: "/marketplace/lease-algorithms/top-performing-strategies",
          },
          {
            label: "Free Algorithms",
            url: "/marketplace/lease-algorithms/free-algorithms",
          },
          {
            label: "Find Algorithms",
            url: `/marketplace/lease-algorithms/find-algorithms/${
              searchType ? searchType : "match-a-mutual-fund"
            }`,
          },
          {
            label: "Favourites",
            url: "/marketplace/lease-algorithms/favourite-algorithms",
          },
          {
            label: "Subscribed",
            url: "/marketplace/lease-algorithms/subscribed-algorithms",
          },
        ]}
      />
      {subType === "top-performing-strategies" && <TopPerformingStrategies />}
      {subType === "free-algorithms" && <FreeAlgorithms />}
      {subType === "find-algorithms" && <FindAlgorithms />}
      {subType === "favourite-algorithms" && <Favourites />}
      {subType === "subscribed-algorithms" && <SubscribedAlgorithms />}
    </div>
  );
};

export default LeaseAlgorithms;
