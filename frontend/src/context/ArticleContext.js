import { createContext, useReducer } from "react";

export const ArticleContext = createContext();

export const ArticleContextProvider = ({ children }) => {
  const initialState = {
    articles: [],
    loading: "loading...",
  };

  const articlesReducer = (state, action) => {
    switch (action.type) {
      case "SET_ARTICLES":
        return {
          articles: action.payload,
        };
      case "CREATE_ARTICLE":
        return {
          articles: [action.payload, ...state.articles],
        };
      case "DELETE_ARTICLE_FROM_SAVE_ON_LATER_LIST":
        return {
          articles: state.articles.filter(
            (article) => article._id !== action.payload._id
          ),
        };
      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(articlesReducer, initialState);

  return (
    <ArticleContext.Provider value={{ ...state, dispatch }}>
      {children}
    </ArticleContext.Provider>
  );
};
