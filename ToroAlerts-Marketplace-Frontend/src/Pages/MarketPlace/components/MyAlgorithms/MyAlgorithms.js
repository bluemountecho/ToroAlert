import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PointerBreadcrumb from "../../../../componets/Breadcrumb/PointerBreadcrumb/PointerBreadcrumb";
import BuildAlgorithms from "./components/BuildAlgorithms/BuildAlgorithms";
import ApprovedAlgorithms from "./components/ApprovedAlgorithms/ApprovedAlgorithms";
import axios from "../../../../helpers/axios/axios";
import RejectedAlgorithms from "./components/RejectedAlgorithms/RejectedAlgorithms";
import PendingAlgorithms from "./components/PendingAlgorithms/PendingAlgorithms";
import NotSubmittedAlgorithms from "./components/NotSubmitted/NotSubmitted";
import { BASE_URL } from "../../../../helpers/url/url";

const MyAlgorithms = ({ count, setCount }) => {
  const { subType } = useParams();
  const [allAlgorithms, setAllAlgorithms] = useState([]);
  const [isMainPageLoading, setIsMainPageLoading] = useState(true);

  useEffect(() => {
    const getMyAllAlgorithmsAPI = async () => {
      try {
        const response = await axios.post(
          `${BASE_URL}/api/algorithm/details/myAlgorithms`
        );
        //console.log(response);
        setAllAlgorithms([...response?.data?.data]);
        setIsMainPageLoading(false);
      } catch (err) {
        console.error(err);
        setIsMainPageLoading(false);
      }
    };
    getMyAllAlgorithmsAPI();
  }, []);

  //console.log(type, subType);
  return (
    <div>
      <PointerBreadcrumb
        breadcrumbLabels={[
          {
            label: "Build Algorithms",
            url: "/marketplace/my-algorithms/build-algorithms",
          },
          {
            label: "Approved",
            url: "/marketplace/my-algorithms/approved-algorithms",
          },
          {
            label: "Pending",
            url: "/marketplace/my-algorithms/pending-algorithms",
          },
          {
            label: "Rejected",
            url: "/marketplace/my-algorithms/rejected-algorithms",
          },
          {
            label: "Not Submitted",
            url: "/marketplace/my-algorithms/not-submitted-algorithms",
          },
        ]}
      />
      {subType === "build-algorithms" && (
        <BuildAlgorithms count={count} setCount={setCount} />
      )}
      {subType === "approved-algorithms" && (
        <ApprovedAlgorithms
          allAlgorithms={allAlgorithms}
          isMainPageLoading={isMainPageLoading}
        />
      )}
      {subType === "pending-algorithms" && (
        <PendingAlgorithms
          allAlgorithms={allAlgorithms}
          isMainPageLoading={isMainPageLoading}
        />
      )}
      {subType === "rejected-algorithms" && (
        <RejectedAlgorithms
          allAlgorithms={allAlgorithms}
          isMainPageLoading={isMainPageLoading}
        />
      )}
      {subType === "not-submitted-algorithms" && (
        <NotSubmittedAlgorithms
          allAlgorithms={allAlgorithms}
          isMainPageLoading={isMainPageLoading}
        />
      )}
    </div>
  );
};

export default MyAlgorithms;
