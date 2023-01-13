import React, { useRef } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  useGetDmsQuery,
  usePostDmAsCandidateMutation,
} from "../../features/dm/dmApi";

const DirectMessageForCandidate = () => {
  const { email: employerEmail } = useParams();
  const { email, role } = useSelector((state) => state.auth.user);
  const { data: dms } = useGetDmsQuery(
    { role, email },
    { pollingInterval: 500 }
  );
  const dmsForThisEmployer = dms?.data.find(
    (dm) => dm.employer === employerEmail
  );
  const messageRef = useRef("");
  const [sendDm, {}] = usePostDmAsCandidateMutation();

  const handleMessage = (e) => {
    e.preventDefault();
    const data = {
      employer: employerEmail,
      candidate: email,
      message: messageRef.current.value,
    };

    if (messageRef.current.value.length) {
      sendDm(data);
      messageRef.current.value = "";
    }
  };

  return (
    <div className="w-4/5 m-auto p-3">
      <h1 className="text-2xl">Direct Message With {employerEmail}</h1>
      <hr className="border-1 border-black my-3" />
      <div className="flex flex-col gap-3 mb-5">
        {dmsForThisEmployer?.conversation?.map((message) => (
          <p
            className={
              message.role === "employer"
                ? "bg-red-300 w-1/3 p-3 rounded-md"
                : "bg-green-300 ml-auto w-1/3 p-3 rounded-md text-right"
            }
          >
            {message.message}
          </p>
        ))}
      </div>
      <form className="flex gap-5" onSubmit={(e) => handleMessage(e)}>
        <input className="w-full" type="text" ref={messageRef} />
        <button className="btn" type="submit">
          Send
        </button>
      </form>
    </div>
  );
};

export default DirectMessageForCandidate;
