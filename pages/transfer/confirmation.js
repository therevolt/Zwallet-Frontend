import Layout from "../../component/base/Layout";
import Rupiah from "../../helper/rupiah";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import axiosApiInstance from "../../helper/axiosInstance";
import PhoneFormat from "../../helper/phoneFormat";
import { useSelector, useDispatch } from "react-redux";
import InputPin from "react-pin-input";
import Modal from "react-modal";
import Swal from "sweetalert2";
import Button from "../../component/base/Button";

Modal.setAppElement("#__next");

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    borderRadius: "25px",
    transform: "translate(-50%, -50%)",
  },
};

export default function History() {
  const router = useRouter();
  const dispatch = useDispatch();
  const [data, setData] = useState(null);
  const [user, setUser] = useState(null);
  const [wallets, setWallet] = useState(null);
  const [modal, setModal] = useState(false);
  const state = useSelector((states) => states.transaction.data);
  let subtitle;

  const clickModal = () => {
    setModal(true);
  };

  useEffect(() => {
    if (localStorage.getItem("token")) {
      if (!user) {
        setData(state);
        axiosApiInstance
          .get(`${process.env.NEXT_PUBLIC_URL_API}/users/details?userId=${state.receiver}`)
          .then((result) => {
            setUser(result.data.data);
            console.log(result.data.data);
          })
          .catch((err) => {
            Swal.fire("Error", err.response.message, "error");
            router.push("/home");
          });

        axiosApiInstance
          .get(`${process.env.NEXT_PUBLIC_URL_API}/wallet`)
          .then((result) => {
            setWallet(result.data.data);
          })
          .catch((err) => {
            Swal.fire("Error", err.response.message, "error");
            router.push("/home");
          });
      }
    } else {
      Swal.fire("Restricted Area", "Only Users Can Be Access", "warning");
      router.push("/auth/login");
    }
  }, []);

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    subtitle.style.color = "#3A3D42";
  }

  const handleSubmit = () => {
    axiosApiInstance
      .post(`${process.env.NEXT_PUBLIC_URL_API}/trx`, data)
      .then((result) => {
        if (result.data.status) {
          setModal(false);
          axiosApiInstance.get(`${process.env.NEXT_PUBLIC_URL_API}/users`).then((resultUser) => {
            dispatch({
              type: "REQUEST_LOGIN",
              payload: resultUser.data.data,
            });
            router.push(`/transfer/status/${result.data.data.id}`);
          });
        } else {
          Swal.fire("Error", result.data.message, "error");
        }
      })
      .catch((err) => {
        Swal.fire("Error", err.response.data.message, "error");
      });
  };

  return (
    <Layout
      title="Transfer Status"
      navbar="logged"
      footer="logged"
      type="no-auth"
      classContent="col status-transactions confirmation"
    >
      <div className="title mx-4 mt-4 fs-5 fw-bold">Tranfer To</div>
      {user && (
        <div className="card-info-transfer d-flex justify-content-between mx-4 my-4 cursor-pointer">
          <div className="d-flex">
            <div className="avatar-user me-2 my-1">
              <img src={user.avatar} alt="" width="52px" height="52px" className="profile" />
            </div>
            <div className="detail-transaction d-flex flex-column">
              <span className="fw-bold">{`${user.fullName}`}</span>
              <span>{PhoneFormat(user.phone)}</span>
            </div>
          </div>
        </div>
      )}
      <div className="title mx-4 mt-4 fs-5 fw-bold">Details</div>
      <div className="card-info-transfer mx-4">
        <div className="title">Amount</div>
        <div className="body">{Rupiah(state.amount)}</div>
      </div>
      <div className="card-info-transfer mx-4">
        <div className="title">Balance Left</div>
        {wallets && <div className="body">{Rupiah(wallets.balance - parseInt(state.amount))}</div>}
      </div>
      <div className="card-info-transfer mx-4">
        <div className="title">Date & Time</div>
        <div className="body">
          {new Date().toDateString()} - {new Date().toLocaleTimeString()}
        </div>
      </div>
      <div className="card-info-transfer mx-4">
        <div className="title">Notes</div>
        <div className="body">{state.notes || "-"}</div>
      </div>
      <div className="position-relative">
        <Button
          className="btn-filled continue position-absolute end-0 my-4"
          onClick={clickModal}
          text="Continue"
        />
      </div>
      <Modal
        isOpen={modal}
        onAfterOpen={afterOpenModal}
        onRequestClose={() => setModal(false)}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <div className="d-flex justify-content-between">
          <h2
            ref={(_subtitle) => (subtitle = _subtitle)}
            style={{ fontWeight: "700", fontSize: "18px", marginTop: "10px" }}
          >
            Enter PIN to Transfer
          </h2>
          <div className="close-btn-modal" onClick={() => setModal(false)}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="28"
              height="28"
              viewBox="0 0 28 28"
              fill="none"
            >
              <path
                d="M21 7L7 21"
                stroke="#3A3D42"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M7 7L21 21"
                stroke="#3A3D42"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>
        <span style={{ color: "#898B8E" }}>
          Enter your 6 digits PIN for confirmation to
          <br />
          continue transferring money.{" "}
        </span>
        <div className="input-pin">
          <InputPin
            length={6}
            secret
            onChange={(value) => setData({ ...data, pin: value })}
            initialValue=""
            type="numeric"
            inputMode="number"
            autoSelect={true}
            regexCriteria={/^[ A-Za-z0-9_@./#&+-]*$/}
            focus={true}
          />
        </div>
        <Button
          className="btn-filled continue"
          onClick={handleSubmit}
          style={{ marginLeft: "220px", marginRight: "0px" }}
          text="Continue"
        />
      </Modal>
    </Layout>
  );
}
