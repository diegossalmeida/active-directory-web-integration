import { Fragment } from "react";
import MainNavigation from "./MainNavigation";

const Layout = (props) => {
  return (
    <Fragment>
      <MainNavigation />
      <main className="mt-3">{props.children}</main>
    </Fragment>
  );
};

export default Layout;
