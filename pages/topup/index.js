import Layout from "../../component/base/Layout";
import SideMenu from "../../component/module/sideMenu";

export default function Topup() {
  return (
    <Layout
      title="Topup Pages"
      navbar="logged"
      footer="logged"
      type="no-auth"
      classContent="col status-transactions pb-4"
    >
      <div className="head-transaction mx-4 my-4 fw-bold fs-4">How To Top Up</div>
      <div className="weekly mx-4">
        <div className="card-topup d-flex justify-content-between my-3">
          <div className="d-flex">
            <div className="number primary-text fw-bold">1</div>
            <div className="detail-transaction d-flex flex-column mx-3">
              <span>Go to the nearest ATM or you can use E-Banking.</span>
            </div>
          </div>
        </div>
        <div className="card-topup d-flex justify-content-between my-3">
          <div className="d-flex">
            <div className="number primary-text fw-bold">2</div>
            <div className="detail-transaction d-flex flex-column mx-3">
              <span>Type your security number on the ATM or E-Banking.</span>
            </div>
          </div>
        </div>
        <div className="card-topup d-flex justify-content-between my-3">
          <div className="d-flex">
            <div className="number primary-text fw-bold">3</div>
            <div className="detail-transaction d-flex flex-column mx-3">
              <span>Select “Transfer” in the menu</span>
            </div>
          </div>
        </div>
      </div>
      <div className="monthly mx-4">
        <div className="card-topup d-flex justify-content-between my-3">
          <div className="d-flex">
            <div className="number primary-text fw-bold">4</div>
            <div className="detail-transaction d-flex flex-column mx-3">
              <span>Type the virtual account number that we provide you at the top.</span>
            </div>
          </div>
        </div>
        <div className="card-topup d-flex justify-content-between my-3">
          <div className="d-flex">
            <div className="number primary-text fw-bold">5</div>
            <div className="detail-transaction d-flex flex-column mx-3">
              <span>Type the amount of the money you want to top up.</span>
            </div>
          </div>
        </div>
        <div className="card-topup d-flex justify-content-between my-3">
          <div className="d-flex">
            <div className="number primary-text fw-bold">6</div>
            <div className="detail-transaction d-flex flex-column mx-3">
              <span>Read the summary details</span>
            </div>
          </div>
        </div>
        <div className="card-topup d-flex justify-content-between my-3">
          <div className="d-flex">
            <div className="number primary-text fw-bold">7</div>
            <div className="detail-transaction d-flex flex-column mx-3">
              <span>Press transfer / top up</span>
            </div>
          </div>
        </div>
        <div className="card-topup d-flex justify-content-between my-3">
          <div className="d-flex">
            <div className="number primary-text fw-bold">8</div>
            <div className="detail-transaction d-flex flex-column mx-3">
              <span>You can see your money in Zwallet within 3 hours.</span>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
