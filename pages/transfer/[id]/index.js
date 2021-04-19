import { useEffect, useState } from "react";
import Layout from "../../../component/base/Layout";
import { useRouter } from "next/router";
import NumberFormat from "react-number-format";
import InputPin from "react-pin-input";
import Modal from "react-modal";
import axiosApiInstance from "../../../helper/axiosInstance";
import Swal from "sweetalert2";
import PhoneFormat from "../../../helper/phoneFormat";
import Rupiah from "../../../helper/rupiah";

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

export default function TransferTo() {
  const router = useRouter();
  const { id } = router.query;
  const [modal, setModal] = useState(false);
  const [user, setUser] = useState(null);
  const [wallets, setWallet] = useState(null);
  const [data, setData] = useState(null);
  let subtitle;

  const clickModal = () => {
    setModal(true);
  };

  useEffect(() => {
    if (localStorage.getItem("user")) {
      if (!user) {
        axiosApiInstance
          .get(`${process.env.NEXT_PUBLIC_URL_API}/users/details?userId=${id}`)
          .then((result) => {
            setUser(result.data.data);
          })
          .catch((err) => {
            Swal.fire("Error", err, "error");
            router.push("/home");
          });

        axiosApiInstance
          .get(`${process.env.NEXT_PUBLIC_URL_API}/wallet`)
          .then((result) => {
            setWallet(result.data.data);
          })
          .catch((err) => {
            Swal.fire("Error", err, "error");
            router.push("/home");
          });
      }
    } else {
      Swal.fire("Restricted Area", "Only Users Can Be Access", "warning");
      router.push("/auth/login");
    }
  }, []);

  const withValueLimit = (inputObj) => {
    const { value } = inputObj;
    console.log(value);
    if (value < wallets.balance + 1) return inputObj;
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    if (id === "amount") {
      if (value.match(",")) {
        setData({ ...data, amount: value.split("Rp")[1].replace(",", "") });
      } else {
        setData({ ...data, amount: value.split("Rp")[1] });
      }
    } else {
      setData({ ...data, [id]: value });
    }
  };

  const handleSubmit = () => {
    axiosApiInstance
      .post(`${process.env.NEXT_PUBLIC_URL_API}/trx`, data)
      .then((result) => {
        if (result.data.status) {
          setModal(false);
          router.push(`/transfer/status/${result.data.data.id}`);
        } else {
          Swal.fire("Error", result.data.message, "error");
        }
      })
      .catch((err) => {
        Swal.fire("Error", err.response.data.message, "error");
      });
  };

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    subtitle.style.color = "#3A3D42";
  }

  return (
    <Layout
      title="Transfers"
      navbar="logged"
      footer="logged"
      type="no-auth"
      classContent="col-9 d-flex flex-column full-history"
    >
      <div className="head-transaction mx-4 my-4 fw-bold fs-4">Transfer Money</div>
      <div className="card-contact d-flex justify-content-between my-3 mx-4">
        {user && (
          <div className="d-flex">
            <div className="avatar-user">
              <img src={user.avatar} alt="" width="56px" />
            </div>
            <div className="detail-transaction d-flex flex-column mx-3">
              <span className="fw-bold">{user.fullName}</span>
              <span>{PhoneFormat(user.phone)}</span>
            </div>
          </div>
        )}
      </div>
      <div className="info-transfer mx-4 my-3">
        Type the amount you want to transfer and then press continue to the next steps.
      </div>
      <div className="d-flex flex-column align-items-center">
        <div className="center-input">
          {wallets && (
            <NumberFormat
              thousandSeparator={true}
              prefix={"Rp"}
              placeholder="00.0"
              className="input-amount"
              onChange={handleChange}
              id="amount"
              isAllowed={withValueLimit}
              disabled={wallets.balance === 0 ? true : false}
            />
          )}
        </div>
        {wallets && (
          <div className="avail-amount text-center fw-bold">
            {Rupiah(wallets.balance)} Available
          </div>
        )}
        <div className="input-notes position-relative">
          <div className="position-absolute">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                d="M17 3.0003C17.2626 2.73766 17.5744 2.52932 17.9176 2.38718C18.2608 2.24503 18.6286 2.17188 19 2.17188C19.3714 2.17187 19.7392 2.24503 20.0824 2.38718C20.4256 2.52932 20.7374 2.73766 21 3.0003C21.2626 3.26295 21.471 3.57475 21.6131 3.91791C21.7553 4.26107 21.8284 4.62887 21.8284 5.0003C21.8284 5.37174 21.7553 5.73953 21.6131 6.08269C21.471 6.42585 21.2626 6.73766 21 7.0003L7.5 20.5003L2 22.0003L3.5 16.5003L17 3.0003Z"
                stroke="#A9A9A9"
                strokeOpacity="0.6"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <input
            type="text"
            name="notes"
            id="notes"
            placeholder="Add some notes"
            onChange={handleChange}
          />
        </div>
        <button
          className="btn-filled continue"
          onClick={() => {
            if (parseInt(data.amount) > 1) {
              clickModal();
              setData({ ...data, receiver: user.userId });
            } else {
              Swal.fire("Something Wrong!", "Input Amount First", "warning");
            }
          }}
        >
          Continue
        </button>
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
        <button
          className="btn-filled continue"
          onClick={handleSubmit}
          style={{ marginLeft: "220px", marginRight: "0px" }}
        >
          Continue
        </button>
      </Modal>
    </Layout>
  );
}
