import { ArticleContext } from "../context/ArticleContext";
import { useContext } from "react";

export const useArticlesContext = () => {
  const context = useContext(ArticleContext);

  if (!context) {
    throw Error(
      "useArtcile context must be used inside an ArticleContextProvider!"
    );
  }

  return context;
};
