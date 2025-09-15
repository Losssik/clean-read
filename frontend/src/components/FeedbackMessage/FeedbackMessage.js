import { useEffect, useState } from "react";

const FeedbackMessage = ({ message }) => {
  const [messageInfo, setMessageInfo] = useState(false);

  useEffect(() => {
    setMessageInfo(true);

    const timer = setTimeout(() => {
      setMessageInfo(false);
    }, 2000);

    return () => clearTimeout(timer); //clear
  }, [message]);

  return messageInfo && <p className="popup__message">{message}</p>;
};

export default FeedbackMessage;
