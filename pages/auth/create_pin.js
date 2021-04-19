import axios from "axios";
import { useRouter } from "next/router";
import { useState } from "react";
import InputPin from "react-pin-input";
import Swal from "sweetalert2";
import Header from "../../component/base/Head";

export default function CreatePin() {
  const [data, setData] = useState("");
  const router = useRouter();

  const handleSubmit = () => {
    const token = window.location.href.split("token=")[1];
    if (token && data.pin) {
      axios
        .post(`${process.env.NEXT_PUBLIC_URL_API}/users/pin`, data, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((result) => {
          if (result.data.status) {
            Swal.fire("Success", result.data.message, "success");
            router.push("/auth/login");
          }
        })
        .catch((err) => {
          Swal.fire("Failed!", err.response.data.message, "error");
        });
    }
  };

  return (
    <div className="row login-page">
      <Header name="Create New PIN" />
      <div className="col-7 right-panel">
        <div className="container d-flex flex-column align-items-center py-3">
          <div className="title-name text-white" style={{ width: "35vw" }}>
            Zwallet
          </div>
          <div className="img-app my-2">
            <img src="/preview_auth.png" alt="" height="450px" />
          </div>
          <div className="text-login">
            <div className="title-text-login fw-bold text-white my-3">
              App that Covering Banking Needs.
            </div>
            <div className="body-text-login text-white">
              Zwallet is an application that focussing in banking needs for all users in the world.
              Always updated and always following world trends. 5000+ users registered in Zwallet
              everyday with worldwide users coverage.
            </div>
          </div>
        </div>
      </div>
      <div className="col-5 left-panel">
        <div className="text-center my-4 title-mobile title-name primary-text">ZWallet</div>
        <div className="wrapper-auth d-flex flex-column mx-5 pe-4">
          <div className="title-login-input">
            Secure Your Account, Your Wallet, and Your Data With 6 Digits PIN That You Created
            Yourself.
          </div>
          <div className="title-login-input-2 mt-4">
            Create 6 digits pin to secure all your money and your data in Zwallet app. Keep it
            secret and don’t tell anyone about your Zwallet account password and the PIN.
          </div>
          <div className="input-pin create-pin">
            <InputPin
              length={6}
              initialValue=""
              type="numeric"
              inputMode="number"
              autoSelect={true}
              regexCriteria={/^[ A-Za-z0-9_@./#&+-]*$/}
              id="pin"
              onChange={(value, index) => {
                setData({ pin: value });
              }}
            />
          </div>
          <div className="mt-3 pt-3">
            <button className="btn-filled login text-white" onClick={handleSubmit}>
              Confirm
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
