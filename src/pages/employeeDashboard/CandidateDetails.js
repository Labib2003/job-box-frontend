import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useGetUserQuery } from "../../features/auth/authApi";

const CandidateDetails = () => {
  const { email } = useParams();
  const { data } = useGetUserQuery(email);

  console.log(data?.data);

  return (
    <div className="p-5">
      <h1 className="text-5xl mb-3">Candidate Details</h1>
      <p className="text-xl font-semibold">Name: {data?.data?.firstName + " " + data?.data?.lastName}</p>
      <p className="text-xl font-semibold">
        Address:{" "}
        {data?.data?.address +
          ", " +
          data?.data?.city +
          ", " +
          data?.data?.country}
      </p>
      <p className="text-xl font-semibold">Email: {data?.data?.email}</p>
    </div>
  );
};

export default CandidateDetails;
