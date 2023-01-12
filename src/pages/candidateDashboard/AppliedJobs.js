import React from "react";
import { useSelector } from "react-redux";
import JobCard from "../../components/reusable/JobCard";
import Loading from "../../components/reusable/Loading";
import { useGetJobByCandidateQuery } from "../../features/job/jobApi";

const AppliedJobs = () => {
  const {
    user: { email },
  } = useSelector((state) => state.auth);
  const { data, isLoading } = useGetJobByCandidateQuery(email);

  if (isLoading) {
    return <Loading />;
  }

  const approvedJobs = [];
  let jobs = data?.data;

  if (data.data) {
    data.data.forEach((job) => {
      job.applicants.forEach((applicant) => {
        if (applicant.email === email && applicant.approved)
          approvedJobs.push(job);
      });
    });
  }

  console.log(data);

  return (
    <div className="p-5">
      <h1 className="text-xl py-5">Applied jobs</h1>
      <h1 className="text-lg">All applications</h1>
      <div className="grid grid-cols-2 gap-5 pb-5 mt-3">
        {jobs.map((job) => (
          <JobCard jobData={job} />
        ))}
      </div>
      <h1 className="text-lg">Approved</h1>
      <div className="grid grid-cols-2 gap-5 pb-5 mt-3">
        {approvedJobs.map((job) => (
          <JobCard jobData={job} />
        ))}
      </div>
    </div>
  );
};

export default AppliedJobs;
