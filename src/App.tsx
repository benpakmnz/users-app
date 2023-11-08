import React from "react";
import UsersPage from "./Pages/UsersPage";
import StoreContextProvider from "./utils/store";
import "./theme/index.scss";

const App: React.FC = () => {
  return (
    <StoreContextProvider>
      <UsersPage />
    </StoreContextProvider>
  );
};

export default App;
