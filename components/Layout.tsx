import React from "react";
import Footer from "./common/Footer";
import Header from "./common/Header";

const Layout = ({ children, ...props }: any) => {
  return (
    <>
      <Header props={props} />
      <main {...props}>{children}</main>
      <Footer />
    </>
  );
};

export default Layout;
