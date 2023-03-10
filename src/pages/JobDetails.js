import React, { useRef } from "react";

import meeting from "../assets/meeting.jpg";
import { BsArrowRightShort, BsArrowReturnRight } from "react-icons/bs";
import {
  useApplyToJobMutation,
  useCloseJobMutation,
  useGetJobByIdQuery,
  useHireCandidateMutation,
  usePostQueryMutation,
  useReplyQueryMutation,
} from "../features/job/jobApi";
import { Link, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { toast } from "react-hot-toast";
const JobDetails = () => {
  const { id } = useParams();
  const { data } = useGetJobByIdQuery(id, { pollingInterval: 1000 });
  const [applyToJob, {}] = useApplyToJobMutation();
  const [closeJob, {}] = useCloseJobMutation();
  const { email, role } = useSelector((state) => state.auth.user);
  const [hireCandidate, {}] = useHireCandidateMutation();
  const [postQuery, {}] = usePostQueryMutation();
  const [postReply, {}] = useReplyQueryMutation();

  const questionRef = useRef("");

  const {
    companyName,
    position,
    location,
    experience,
    workLevel,
    employmentType,
    salaryRange,
    skills,
    requirements,
    responsibilities,
    overview,
    queries,
    _id,
    applicants,
    isOpen,
    postedBy,
  } = data?.data || {};

  const handleApply = () => {
    if (role === "employer") {
      return toast.error("Cannot apply with an employer account.");
    }
    console.log(email);
    applyToJob({ jobId: _id, candidateData: { email: email } });
  };

  const handleCloseJob = () => {
    closeJob(_id);
  };

  const handleHireCandidate = (candidateData) => {
    console.log(candidateData);
    hireCandidate({ jobId: _id, candidateData: candidateData });
  };

  const handleSubmitQuery = () => {
    if (questionRef.current.value.length) {
      postQuery({
        jobId: _id,
        data: { email: email, question: questionRef.current.value },
      });
      questionRef.current.value = "";
    }
  };

  const handleQueryReply = (e, queryId) => {
    e.preventDefault();
    console.log(e.target[0].value, queryId);
    if (e.target[0].value.length) {
      postReply({
        jobId: _id,
        data: { queryId: queryId, answer: e.target[0].value },
      });
      e.target[0].value = "";
    }
  };

  return (
    <div className="pt-14 grid grid-cols-12 gap-5">
      <div className="col-span-9 mb-10">
        <div className="h-80 rounded-xl overflow-hidden">
          <img className="h-full w-full object-cover" src={meeting} alt="" />
        </div>
        <div className="space-y-5">
          <div className="flex justify-between items-center mt-5">
            <h1 className="text-xl font-semibold text-primary">{position}</h1>
            <h1 className="text-xl font-semibold text-primary">
              Status: {isOpen ? "OPEN" : "CLOSED"}
            </h1>
            {role === "employer" && email === postedBy ? (
              <button className="btn" onClick={handleCloseJob}>
                Close this position
              </button>
            ) : (
              <button disabled={!isOpen} className="btn" onClick={handleApply}>
                Apply
              </button>
            )}
          </div>
          <div>
            <h1 className="text-primary text-lg font-medium mb-3">Overview</h1>
            <p>{overview}</p>
          </div>
          <div>
            <h1 className="text-primary text-lg font-medium mb-3">Skills</h1>
            <ul>
              {skills?.map((skill) => (
                <li className="flex items-center">
                  <BsArrowRightShort /> <span>{skill}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h1 className="text-primary text-lg font-medium mb-3">
              Requirements
            </h1>
            <ul>
              {requirements?.map((skill) => (
                <li className="flex items-center">
                  <BsArrowRightShort /> <span>{skill}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h1 className="text-primary text-lg font-medium mb-3">
              Responsibilities
            </h1>
            <ul>
              {responsibilities?.map((skill) => (
                <li className="flex items-center">
                  <BsArrowRightShort /> <span>{skill}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <hr className="my-5" />
        {role === "employer" && email === postedBy && (
          <div>
            <p className="font-semibold text-lg">
              Applications for this position: {applicants?.length}
            </p>
            <table className="border-collapse border w-full">
              <thead className="border text-left">
                <tr>
                  <th className="p-3 text-lg">Email</th>
                  <th className="p-3 text-lg">State</th>
                  <th className="p-3 text-lg">Contact</th>
                </tr>
              </thead>
              <tbody>
                {applicants?.map((applicant) => (
                  <tr>
                    <td className="p-3">
                      <Link
                        to={`/candidate-details/${applicant.email}`}
                        className="text-blue-500 underline"
                      >
                        {applicant.email}
                      </Link>
                    </td>
                    <td className="p-3">
                      {applicant.approved ? (
                        "Hired"
                      ) : (
                        <button
                          className="btn"
                          onClick={() =>
                            handleHireCandidate({ email: applicant.email })
                          }
                        >
                          Hire
                        </button>
                      )}
                    </td>
                    <td className="p-3">
                      <Link
                        to={`/dashboard/messages/employer/${applicant.email}`}
                        className="btn"
                      >
                        Contact Candidate
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        <hr className="my-5" />
        <div>
          <div>
            <h1 className="text-xl font-semibold text-primary mb-5">
              General Q&A
            </h1>
            <div className="text-primary my-2">
              {queries?.map(({ question, email: userEmail, reply, _id }) => (
                <div className="px-5">
                  <small>{userEmail}</small>
                  <p className="text-lg font-medium">{question}</p>
                  {reply?.map((item) => (
                    <p className="flex items-center gap-2 relative left-5">
                      <BsArrowReturnRight /> {item}
                    </p>
                  ))}

                  {role === "employer" && email === postedBy && (
                    <div className="my-5">
                      <form className="flex gap-3" onSubmit={(e) => handleQueryReply(e, _id)}>
                        <input
                          placeholder="Reply"
                          type="text"
                          className="w-full"
                        />
                        <button
                          className="shrink-0 h-14 w-14 bg-primary/10 border border-primary hover:bg-primary rounded-full transition-all  grid place-items-center text-primary hover:text-white"
                          type="submit"
                        >
                          <BsArrowRightShort size={30} />
                        </button>
                      </form>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {role === "candidate" && (
              <div className="flex gap-3 my-5">
                <input
                  placeholder="Ask a question..."
                  type="text"
                  className="w-full"
                  ref={questionRef}
                />
                <button
                  className="shrink-0 h-14 w-14 bg-primary/10 border border-primary hover:bg-primary rounded-full transition-all  grid place-items-center text-primary hover:text-white"
                  type="button"
                  onClick={handleSubmitQuery}
                >
                  <BsArrowRightShort size={30} />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="col-span-3">
        <div className="rounded-xl bg-primary/10 p-5 text-primary space-y-5">
          <div>
            <p>Experience</p>
            <h1 className="font-semibold text-lg">{experience}</h1>
          </div>
          <div>
            <p>Work Level</p>
            <h1 className="font-semibold text-lg">{workLevel}</h1>
          </div>
          <div>
            <p>Employment Type</p>
            <h1 className="font-semibold text-lg">{employmentType}</h1>
          </div>
          <div>
            <p>Salary Range</p>
            <h1 className="font-semibold text-lg">{salaryRange}</h1>
          </div>
          <div>
            <p>Location</p>
            <h1 className="font-semibold text-lg">{location}</h1>
          </div>
        </div>
        <div className="mt-5 rounded-xl bg-primary/10 p-5 text-primary space-y-5">
          <div>
            <h1 className="font-semibold text-lg">{companyName}</h1>
          </div>
          <div>
            <p>Company Size</p>
            <h1 className="font-semibold text-lg">Above 100</h1>
          </div>
          <div>
            <p>Founded</p>
            <h1 className="font-semibold text-lg">2001</h1>
          </div>
          <div>
            <p>Email</p>
            <h1 className="font-semibold text-lg">company.email@name.com</h1>
          </div>
          <div>
            <p>Company Location</p>
            <h1 className="font-semibold text-lg">Los Angeles</h1>
          </div>
          <div>
            <p>Website</p>
            <a className="font-semibold text-lg" href="#">
              https://website.com
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDetails;
