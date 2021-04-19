import Layout from "../../../component/base/Layout";
import Rupiah from "../../../helper/rupiah";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import axiosApiInstance from "../../../helper/axiosInstance";
import PhoneFormat from "../../../helper/phoneFormat";

export default function History() {
  const router = useRouter();
  const [data, setData] = useState(null);

  useEffect(() => {
    if (router.query.idTrx) {
      if (!data) {
        axiosApiInstance
          .get(`${process.env.NEXT_PUBLIC_URL_API}/trx/${router.query.idTrx}`)
          .then((result) => {
            setData(result.data.data);
          })
          .catch(() => {
            router.push("/transfer");
          });
      }
    } else {
      router.push("/transfer");
    }
  }, []);

  return (
    <Layout
      title="Home Pages"
      navbar="logged"
      footer="logged"
      type="no-auth"
      classContent="col status-transactions"
    >
      <div className="d-flex flex-column align-items-center my-5">
        <img src="/success.png" alt="" />
        <span className="fw-bold fs-4 my-3">Transfer Success</span>
      </div>
      <div className="card-info-transfer mx-4">
        <div className="title">Amount</div>
        {data && <div className="body">{Rupiah(data.amount)}</div>}
      </div>
      <div className="card-info-transfer mx-4">
        <div className="title">Balance Left</div>
        {data && <div className="body">{Rupiah(data.balanceLeft)}</div>}
      </div>
      <div className="card-info-transfer mx-4">
        <div className="title">Date & Time</div>
        {data && (
          <div className="body">
            {new Date(data.date).toDateString()} - {new Date(data.date).toLocaleTimeString()}
          </div>
        )}
      </div>
      <div className="card-info-transfer mx-4">
        <div className="title">Notes</div>
        {data && <div className="body">{data.notes ? data.notes : "-"}</div>}
      </div>
      <div style={{ color: "#7A7886", fontWeight: "700", fontSize: "18px" }} className="mx-4 my-4">
        Transfer to
      </div>
      {data && (
        <div className="card-contact d-flex justify-content-between my-3 mx-4">
          <div className="d-flex">
            <div className="avatar-user">
              <img src={data.avatarReceiver} alt="" width="56px" />
            </div>
            <div className="detail-transaction d-flex flex-column mx-3">
              <span className="fw-bold">{data.receiverName}</span>
              <span>{PhoneFormat(data.phoneReceiver)}</span>
            </div>
          </div>
        </div>
      )}
      <div className="btn-action-transfer position-relative mx-4 my-5 py-3">
        <div className="d-flex position-absolute end-0">
          <div className="btn-share btn-filled2 cursor-pointer">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                d="M18 8C19.6569 8 21 6.65685 21 5C21 3.34315 19.6569 2 18 2C16.3431 2 15 3.34315 15 5C15 6.65685 16.3431 8 18 8Z"
                stroke="#3A3D42"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M6 15C7.65685 15 9 13.6569 9 12C9 10.3431 7.65685 9 6 9C4.34315 9 3 10.3431 3 12C3 13.6569 4.34315 15 6 15Z"
                stroke="#3A3D42"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M18 22C19.6569 22 21 20.6569 21 19C21 17.3431 19.6569 16 18 16C16.3431 16 15 17.3431 15 19C15 20.6569 16.3431 22 18 22Z"
                stroke="#3A3D42"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M8.58984 13.5098L15.4198 17.4898"
                stroke="#3A3D42"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M15.4098 6.50977L8.58984 10.4898"
                stroke="#3A3D42"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <div className="btn-download mx-3 btn-filled2 cursor-pointer">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="22"
              height="22"
              viewBox="0 0 22 22"
              fill="none"
            >
              <path
                d="M19.25 13.75V17.4167C19.25 17.9029 19.0568 18.3692 18.713 18.713C18.3692 19.0568 17.9029 19.25 17.4167 19.25H4.58333C4.0971 19.25 3.63079 19.0568 3.28697 18.713C2.94315 18.3692 2.75 17.9029 2.75 17.4167V13.75"
                stroke="#6379F4"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M6.41699 9.16699L11.0003 13.7503L15.5837 9.16699"
                stroke="#6379F4"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M11 13.75V2.75"
                stroke="#6379F4"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span className="mx-2">Download PDF</span>
          </div>
          <div className="btn-back btn-filled cursor-pointer" onClick={() => router.push("/home")}>
            Back to Home
          </div>
        </div>
      </div>
    </Layout>
  );
}
