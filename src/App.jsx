import { useSelector } from "react-redux";
import Login from "./Pages/Login";
import Loader from "./Components/Loader";
import "bootstrap/dist/css/bootstrap.min.css";
import Layout from "./Components/Layout.jsx";
import Layout1 from "./Components/Layout1.jsx";

function App() {
  const menulist = useSelector((state) => state.menu);
  return (
    <>
      <Layout1 />
      {menulist.loading && <Loader />}
    </>
  );
}

export default App;
