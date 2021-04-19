export default function Footer(props) {
  return (
    <div className={props.type === "logged" ? "footer-logged" : "footer"}>
      <div className="container d-flex flex-column">
        {props.type === "logged" ? (
          <></>
        ) : (
          <>
            <div className="title-name text-white my-5 pt-3">Zwallet</div>
            <div className="text-footer">
              Simplify financial needs and saving much time in banking needs with one single app.
            </div>
            <hr />
          </>
        )}
        <div className="d-flex copyright justify-content-between my-3">
          <span>2020 Zwallet. All right reserved.</span>
          <div>
            <span className="mx-3">+62 5637 8882 9901</span>
            <span>contact@zwallet.com</span>
          </div>
        </div>
      </div>
    </div>
  );
}
