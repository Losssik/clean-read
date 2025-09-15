import { ReadLaterListContext } from "../context/ReadLaterListContext";
import { useContext } from "react";

export const useReadLaterContext = () => {
  const context = useContext(ReadLaterListContext);

  if (!context) {
    throw Error(
      "useReadLater context must be used inside a ReadLaterContextProvider!"
    );
  }

  return context;
};
