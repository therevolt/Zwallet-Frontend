import Layout from "../../component/base/Layout";
import { useRouter } from "next/router";
import { useRef, useState } from "react";
import Swal from "sweetalert2";
import axiosApiInstance from "../../helper/axiosInstance";
import InputPin from "react-pin-input";
import Button from "../../component/base/Button";

export default function History() {
  const router = useRouter();
  const [data, setData] = useState({
    pin: "",
    new_pin: "",
  });
  const [page, setPage] = useState("index");
  const input = useRef();

  const handleSubmit = () => {
    if (page === "index") {
      axiosApiInstance
        .post(`${process.env.NEXT_PUBLIC_URL_API}/users/compare`, data)
        .then((result) => {
          Swal.fire("Success", result.data.message, "success");
          setPage("continue");
        })
        .catch((err) => {
          Swal.fire("Error", err.response.data.message, "error");
        });
    } else {
      axiosApiInstance
        .post(`${process.env.NEXT_PUBLIC_URL_API}/users/change/pin`, data)
        .then((result) => {
          Swal.fire("Success", result.data.message, "success");
          router.push("/profile");
        })
        .catch((err) => {
          Swal.fire("Error", err.response.data.message, "error");
        });
    }
    input.current.clear();
  };

  return (
    <Layout
      title="Change PIN"
      navbar="logged"
      footer="logged"
      type="no-auth"
      classContent="col status-transactions pb-4"
    >
      <div className="head-transaction mx-4 my-4 fw-bold fs-4">Change PIN</div>
      <div className="desc mx-4 my-4 text-gray" style={{ color: "#7A7886", width: "350px" }}>
        Enter your current 6 digits Zwallet PIN below to continue to the next steps.
      </div>
      <div className="d-flex flex-column align-items-center my-5 py-5">
        <InputPin
          length={6}
          initialValue=""
          type="numeric"
          inputMode="number"
          autoSelect={true}
          regexCriteria={/^[ A-Za-z0-9_@./#&+-]*$/}
          id="pin"
          onChange={(value) => {
            if (page === "index") {
              setData({ ...data, pin: value });
            } else {
              setData({ ...data, new_pin: value });
            }
          }}
          ref={input}
        />
        <Button
          className="btn-change-pass btn-filled my-5"
          onClick={handleSubmit}
          disabled={
            page === "index"
              ? data.pin.length < 6 && true
              : page !== "index"
              ? data.new_pin.length < 6 && true
              : false
          }
          text={page === "index" ? "Continue" : "Change PIN"}
        />
      </div>
    </Layout>
  );
}
