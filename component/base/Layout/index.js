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
        <div style={{ minHeight: "71vh", marginTop: "5vh", overflowY: "hidden" }}>
          {props.children}
        </div>
      ) : (
        <div
          className="layout-main row my-5 d-flex"
          style={{ alignItems: "stretch", height: "100%", flexFlow: "wrap" }}
        >
          <div className="col-lg-3 col-4">
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
