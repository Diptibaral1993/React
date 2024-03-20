import { Spinner } from "react-bootstrap";

const Loader = () => {
  return (
    <div style={{ position: "fixed", left: "112vh", top: "35vh" }}>
      {/* <Spinner
        animation="border"
        role="status"
        style={{
          position: "fixed",
        }}
      ></Spinner> */}
      <div className="spinner-grow text-info" role="status">
        <span className="visually-hidden">Loading...</span>
        <div className="spinner-grow text-warning" role="status">
          <span className="visually-hidden">Loading...</span>
          <div className="spinner-grow text-danger" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Loader;
