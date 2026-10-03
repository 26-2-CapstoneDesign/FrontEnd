import { Outlet } from "react-router-dom";
import Header from "./Header";

export default function Layout() {
  return (
    <>
      <Header />
      <main className="layout-main">
        <Outlet />
      </main>
    </>
  );
}
