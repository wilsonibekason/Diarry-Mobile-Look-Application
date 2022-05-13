import { createContext, useState } from "react";
const AuthContext = createContext({});

export const AuthProvider = ({ childern }) => {
  const [auth, setAuth] = useState({ second });

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {childern}
    </AuthContext.Provider>
  );
};

export default AuthContext;
