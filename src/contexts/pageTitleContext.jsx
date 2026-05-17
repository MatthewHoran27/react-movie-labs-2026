import React, { useState } from "react";

export const PageTitleContext = React.createContext(null);

const PageTitleProvider = (props) => {
  const [pageTitle, setPageTitle] = useState("Matthew's Awesome TMDB Client");

  return (
    <PageTitleContext.Provider
      value={{
        pageTitle,
        setPageTitle,
      }}
    >
      {props.children}
    </PageTitleContext.Provider>
  );
};

export default PageTitleProvider;
