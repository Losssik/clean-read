import { createContext, useReducer } from "react";

export const ReadLaterListContext = createContext();

export const ReadLaterListContextProvider = ({ children }) => {
  const initialState = {
    readLaterList: [],
  };

  const readLaterReducer = (state, action) => {
    switch (action.type) {
      case "REMOVE_FROM_READ_LATER_LIST":
        return {
          readLaterList: state.readLaterList.filter(
            (item) => item._id !== action.payload._id
          ),
        };

      case "GET_READ_LATER_LIST":
        return {
          readLaterList: action.payload,
        };
      case "ADD_TO_READ_LATER_LIST":
        return {
          readLaterList: [...state.readLaterList, action.payload],
        };
      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(readLaterReducer, initialState);

  return (
    <ReadLaterListContext.Provider value={{ ...state, dispatch }}>
      {children}
    </ReadLaterListContext.Provider>
  );
};
