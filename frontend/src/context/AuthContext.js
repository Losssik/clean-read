import { createContext, useReducer, useEffect } from "react";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const initialState = { user: null };

  const authReducer = (state, action) => {
    switch (action.type) {
      case "LOGIN":
        return {
          user: action.payload,
        };
      case "LOGOUT": {
        return { user: null };
      }
      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(authReducer, initialState);

  useEffect(() => {
    // get user from local storage if exists - if we refresh the page this will fire a LOGIN dispatch so user is logged in even after refreshing
    const user = JSON.parse(localStorage.getItem("user"));

    if (user) {
      dispatch({ type: "LOGIN", payload: user });
    }
  }, []);

  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};
