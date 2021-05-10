import Layout from "../../../component/base/Layout";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useSelector } from "react-redux";
import ComponentToPrint from "./ComponentToPrint";
import { useReactToPrint } from "react-to-print";
import React, { useRef } from "react";

export default function History() {
  const router = useRouter();
  const state = useSelector((states) => states.user.data);
  const [data, setData] = useState(null);
  const [status, setStatus] = useState("sender");
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  useEffect(() => {
    if (localStorage.getItem("token")) {
      if (!data) {
        const id = window.location.pathname.split("/")[3];
        axios
          .get(`${process.env.NEXT_PUBLIC_URL_API}/trx/${id}`)
          .then((result) => {
            setData(result.data.data);
            if (
              result.data.data.senderId === state.userId ||
              result.data.data.receiverId === state.userId
            ) {
              if (result.data.data.senderId === state.userId) {
                setStatus("sender");
              } else {
                setStatus("receiver");
              }
            } else {
              router.push("/history");
            }
          })
          .catch((err) => {
            router.push("/auth/login");
            localStorage.removeItem("token");
          });
      } else {
        router.push("/history");
      }
    } else {
      router.push("/auth/login");
    }
  }, []);

  return (
    <Layout
      title="Transfer Status"
      navbar="logged"
      footer="logged"
      type="no-auth"
      classContent="col status-transactions"
    >
      {data && <ComponentToPrint data={data} status={status} ref={componentRef} />}
      <div className="btn-action-transfer position-relative mx-4 my-5 py-3">
        <div className="d-flex position-absolute end-0">
          <div
            className="btn-share btn-filled2 cursor-pointer"
            onClick={() => Swal.fire("Coming Soon", "", "info")}
          >
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
          <div className="btn-download mx-3 btn-filled2 cursor-pointer" onClick={handlePrint}>
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
          </div>
          <div
            className="btn-back btn-filled cursor-pointer"
            onClick={() => router.push("/home")}
          ></div>
        </div>
      </div>
    </Layout>
  );
}

// export const getStaticProps = async (ctx) => {
//   const id = ctx.params.idTrx;
//   let details = "";
//   try {
//     if (id) {
//       const result = await axios.get(`${process.env.NEXT_PUBLIC_URL_API}/trx/${id}`);
//       details = result.data.data;
//     }
//   } catch (error) {
//     details = "ERROR";
//   }
//   return {
//     props: {
//       details,
//     },
//   };
// };

// export const getStaticPaths = async () => {
//   const result = await axios.get(`${process.env.NEXT_PUBLIC_URL_API}/trx/list/all`);
//   const trx = result.data.data;
//   const paths = trx.map((item) => {
//     return {
//       params: { idTrx: item.toString() },
//     };
//   });
//   return {
//     fallback: true,
//     paths,
//   };
// };
