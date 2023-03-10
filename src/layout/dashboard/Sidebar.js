import React from "react";
import { Link } from "react-router-dom";
import { FaChevronLeft } from "react-icons/fa";
import { useSelector } from "react-redux";
import { useGetDmsQuery } from "../../features/dm/dmApi";
const Sidebar = () => {
  let oppositeRole = "";
  const { email, role } = useSelector((state) => state.auth.user);
  const { data } = useGetDmsQuery({ role, email }, { pollingInterval: 500 });

  if (role === "employer") oppositeRole = "candidate";
  else oppositeRole = "employer";

  console.log(data);

  return (
    <div className="bg-primary/10 col-span-2 h-screen sticky top-0">
      <ul className="flex flex-col gap-2 w-full h-full  p-3">
        <div className="flex justify-between items-center text-primary my-1">
          <Link to="/" className="flex items-center">
            <FaChevronLeft />
            <h1>Back</h1>
          </Link>
          <h1 className="text-xl">Dashboard</h1>
        </div>
        {role === "employer" && (
          <>
            <li>
              <Link
                className="hover:bg-primary hover:text-white bg-primary/10 transition-all w-full block py-2 px-3 rounded-full"
                to="add-job"
              >
                Add Job
              </Link>
            </li>
            <li>
              <Link
                className="hover:bg-primary hover:text-white bg-primary/10 transition-all w-full block py-2 px-3 rounded-full"
                to="job-posted-by-employer"
              >
                Job Posted By Me
              </Link>
            </li>
            <h1 className="text-xl">Direct Messages</h1>
            {data?.data?.map((dm) => (
              <Link to={`messages/employer/${dm.candidate}`}>
                <li className="hover:bg-primary hover:text-white bg-primary/10 transition-all w-full block py-2 px-3 rounded-full">
                  {dm[oppositeRole]}
                </li>
              </Link>
            ))}
          </>
        )}
        {role === "candidate" && (
          <>
            <li>
              <Link
                className="hover:bg-primary hover:text-white bg-primary/10 transition-all w-full block py-2 px-3 rounded-full"
                to="job-applied-by-candidate"
              >
                Applied jobs
              </Link>
            </li>
            <h1 className="text-xl">Direct Messages</h1>
            {data?.data?.map((dm) => (
              <Link to={`messages/candidate/${dm.employer}`}>
                <li className="hover:bg-primary hover:text-white bg-primary/10 transition-all w-full block py-2 px-3 rounded-full">
                  {dm[oppositeRole]}
                </li>
              </Link>
            ))}
          </>
        )}
      </ul>
    </div>
  );
};

export default Sidebar;
