import { useSelector } from "react-redux";
import Login from "./Pages/Login";
import Loader from "./Components/Loader";
import "bootstrap/dist/css/bootstrap.min.css";
import Layout from "./Components/Layout.jsx";

function App() {
  const menulist = useSelector((state) => state.menu);
  return (
    <>
      <Layout />
      {menulist.loading && <Loader />}
    </>
  );
}

export default App;
