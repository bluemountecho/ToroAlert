import React from "react";
import { useParams } from "react-router-dom";
import PointerBreadcrumb from "../../../../../componets/Breadcrumb/PointerBreadcrumb/PointerBreadcrumb";
import TopPerformingStrategies from "./components/TopPerformingStrategies/TopPerforminStrategies";
import Free from "./components/Free/Free";
import FindMirroredTrades from "./components/FindMirroredTrades/FindMirroredTrades";
import FavouritesMirrorTrades from "./components/Favourites/Favourites";
import SubscribedMirrorTrades from "./components/SubscribedMirrorTrades/SubscribedMirrorTrades";

const LeaseMirrorTrades = () => {
  const { subType } = useParams();

  return (
    <div>
      <PointerBreadcrumb
        breadcrumbLabels={[
          {
            label: "Top Performing Strategies",
            url: "/marketplace/lease-mirror-trades/top-performing-strategies",
          },
          {
            label: "Free",
            url: "/marketplace/lease-mirror-trades/free-mirror-trades",
          },
          {
            label: "Find Mirrored Trades",
            url: "/marketplace/lease-mirror-trades/find-mirrored-trades/",
          },
          {
            label: "Favourites",
            url: "/marketplace/lease-mirror-trades/favourite-algorithms",
          },
          {
            label: "Subscribed",
            url: "/marketplace/lease-mirror-trades/subscribed-algorithms",
          },
        ]}
      />
      {subType === "top-performing-strategies" && <TopPerformingStrategies />}
      {subType === "free-mirror-trades" && <Free />}
      {subType === "find-mirrored-trades" && <FindMirroredTrades />}
      {subType === "favourite-algorithms" && <FavouritesMirrorTrades />}
      {subType === "subscribed-algorithms" && <SubscribedMirrorTrades />}
    </div>
  );
};

export default LeaseMirrorTrades;
