import React, { useRef } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  useGetDmsQuery,
  usePostDmAsEmployerMutation,
} from "../../features/dm/dmApi";

const DirectMessagesForEmployer = () => {
  const { email: candidateEmail } = useParams();
  const { email, role } = useSelector((state) => state.auth.user);
  const { data: dms } = useGetDmsQuery(
    { role, email },
    { pollingInterval: 500 }
  );
  const dmsForThisCandidate = dms?.data.find(
    (dm) => dm.candidate === candidateEmail
  );

  const messageRef = useRef("");

  const [postDmAsEmployer, {}] = usePostDmAsEmployerMutation();

  const handleSendMessage = (e) => {
    e.preventDefault();
    const data = {
      employer: email,
      candidate: candidateEmail,
      message: messageRef.current.value,
    };

    if (messageRef.current.value.length) {
      console.log(data);
      postDmAsEmployer(data);
      messageRef.current.value = "";
    }
  };

  return (
    <div className="w-4/5 m-auto p-3">
      <h1 className="text-2xl">Direct Message With {candidateEmail}</h1>
      <hr className="border-1 border-black my-3" />
      <div className="flex flex-col gap-3 mb-5">
        {dmsForThisCandidate?.conversation?.map((message) => (
          <p
            className={
              message.role === "candidate"
                ? "bg-green-300 w-1/3 p-3 rounded-md"
                : "bg-red-300 ml-auto w-1/3 p-3 rounded-md text-right"
            }
          >
            {message.message}
          </p>
        ))}
      </div>
      <form className="flex gap-5" onSubmit={(e) => handleSendMessage(e)}>
        <input className="w-full" type="text" ref={messageRef} />
        <button className="btn" type="submit">
          Send
        </button>
      </form>
    </div>
  );
};

export default DirectMessagesForEmployer;
