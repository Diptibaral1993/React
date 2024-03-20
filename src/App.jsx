import Menu2 from "./Components/Menu2";
import { useSelector } from "react-redux";
import Login from "./Pages/Login";
import Menu from "./Components/Menu";
import Loader from "./Components/Loader";
import "bootstrap/dist/css/bootstrap.min.css";
import Layout from "./Components/Layout.jsx";

function App() {
  const menulist = useSelector((state) => state.menu);
  return (
    <>
      {/* <div style={{ display: "flex", flexDirection: "row" }}> */}
      {/* {menulist.menus.length > 0 ? <Menu2 /> : <Login />} */}

      {/* <Menu2 /> */}
      <Layout />
      {menulist.loading && <Loader />}
      {/* <Menu /> */}
      {/* </div> */}
    </>
  );
}

export default App;
