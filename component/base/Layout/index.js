import Header from "../Head";
import Navbar from "../Navbar";
import Footer from "../Footer";
import SideMenu from "../../module/sideMenu";

export default function Layout(props) {
  return (
    <div>
      <Header name={props.title} />
      <Navbar type={props.navbar} />
      {props.type === "auth" || props.type === "landing" ? (
        <div style={{ minHeight: "71vh", marginTop: "5vh" }}>{props.children}</div>
      ) : (
        <div
          className="row my-5 mx-5 px-5 d-flex"
          style={{ alignItems: "stretch", height: "100%", flexFlow: "wrap" }}
        >
          <div className="col-3">
            <SideMenu />
          </div>
          <div className={props.classContent} style={{ minHeight: "71vh" }}>
            <div>{props.children}</div>
          </div>
        </div>
      )}
      <Footer type={props.footer} />
    </div>
  );
}
