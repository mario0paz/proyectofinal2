import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";

function Layout() {

  return (

    <div style={{ display: "flex" }}>

      <Sidebar />

      <div style={{ padding: "20px", width: "100%" }}>
        <Outlet />
      </div>

    </div>

  );

}

export default Layout;