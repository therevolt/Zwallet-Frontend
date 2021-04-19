import Layout from "../../component/base/Layout";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import Swal from "sweetalert2";
import axiosApiInstance from "../../helper/axiosInstance";
import InputPin from "react-pin-input";
import PhoneFormat from "../../helper/phoneFormat";

export default function History() {
  const router = useRouter();
  const [data, setData] = useState({
    phone: "",
  });
  const [page, setPage] = useState("manage");

  useEffect(() => {
    axiosApiInstance
      .get(`${process.env.NEXT_PUBLIC_URL_API}/users`)
      .then((result) => {
        if (result.data.data.phone && result.data.data.phone !== "0") {
          setPage("manage");
          setData(result.data.data);
        } else {
          setPage("add");
        }
      })
      .catch((err) => {
        if (err.response.data.message === "Token Expired") {
          localStorage.removeItem("user");
          router.push("/auth/login");
        } else {
          Swal.fire("Error", err.response.data.message, "error");
          router.push("/profile");
        }
      });
  }, []);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setData({ ...data, [id]: value.replace(/\D*/g, "") });
  };

  const handleSubmit = () => {
    if (data.phone) {
      axiosApiInstance
        .put(`${process.env.NEXT_PUBLIC_URL_API}/users`, data)
        .then((result) => {
          console.log(result);
          if (result.data.status) {
            Swal.fire("Success", "Phone Number Added", "success");
            router.push("/profile/personal");
          } else {
            Swal.fire("Something Wrong", result.data.message, "warning");
          }
        })
        .catch((err) => {
          Swal.fire("Error", err.response.data.message, "error");
        });
    } else {
      Swal.fire("Error", "Data Cannot Be Null", "error");
    }
  };

  const handleDelete = () => {
    axiosApiInstance
      .delete(`${process.env.NEXT_PUBLIC_URL_API}/users/phone`)
      .then(() => {
        Swal.fire("Success", "Phone Has Been Deleted", "success");
        router.push("/profile");
      })
      .catch((err) => {
        Swal.fire("Error", err.response.data.message, "error");
      });
  };

  return (
    <Layout
      title="Manage Phone Number"
      navbar="logged"
      footer="logged"
      type="no-auth"
      classContent="col status-transactions pb-4"
    >
      {page && (
        <>
          <div className="head-transaction mx-4 my-4 fw-bold fs-4">
            {page === "add" ? "Add Phone Number" : "Manage Phone Number"}
          </div>
          <div className="desc mx-4 my-4 text-gray" style={{ color: "#7A7886", width: "350px" }}>
            {page === "add"
              ? "Add at least one phone number for the transfer ID so you can start transfering your money to another user."
              : "You can only delete the phone number and then you must add another phone number."}
          </div>
          {page === "add" ? (
            <div className="d-flex flex-column align-items-center my-5 py-5">
              <div className="input-number d-flex position-relative">
                <div className="icon-phone position-absolute">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="22"
                    height="22"
                    viewBox="0 0 22 22"
                    fill="none"
                  >
                    <path
                      d="M20.9994 15.9201V18.9201C21.0006 19.1986 20.9435 19.4743 20.832 19.7294C20.7204 19.9846 20.5567 20.2137 20.3515 20.402C20.1463 20.5902 19.904 20.7336 19.6402 20.8228C19.3764 20.912 19.0968 20.9452 18.8194 20.9201C15.7423 20.5857 12.7864 19.5342 10.1894 17.8501C7.77327 16.3148 5.72478 14.2663 4.18945 11.8501C2.49942 9.2413 1.44769 6.27109 1.11944 3.1801C1.09446 2.90356 1.12732 2.62486 1.21595 2.36172C1.30457 2.09859 1.44702 1.85679 1.63421 1.65172C1.82141 1.44665 2.04925 1.28281 2.30324 1.17062C2.55722 1.05843 2.83179 1.00036 3.10945 1.0001H6.10945C6.59475 0.995321 7.06524 1.16718 7.43321 1.48363C7.80118 1.80008 8.04152 2.23954 8.10944 2.7201C8.23607 3.68016 8.47089 4.62282 8.80945 5.5301C8.94399 5.88802 8.97311 6.27701 8.89335 6.65098C8.8136 7.02494 8.62831 7.36821 8.35944 7.6401L7.08945 8.9101C8.513 11.4136 10.5859 13.4865 13.0894 14.9101L14.3594 13.6401C14.6313 13.3712 14.9746 13.1859 15.3486 13.1062C15.7225 13.0264 16.1115 13.0556 16.4694 13.1901C17.3767 13.5286 18.3194 13.7635 19.2794 13.8901C19.7652 13.9586 20.2088 14.2033 20.526 14.5776C20.8431 14.9519 21.0116 15.4297 20.9994 15.9201Z"
                      stroke={data.phone.length < 10 ? "#A9A9A9" : "#6379F4"}
                      stroke-opacity="0.6"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                </div>
                <div className="ms-4 ps-2 position-absolute fw-bold">+62</div>
                <input
                  type="text"
                  name="phone"
                  id="phone"
                  placeholder="Enter your phone number"
                  onChange={handleChange}
                  accept="number"
                  value={data.phone}
                />
              </div>
              <button
                className="btn-change-pass btn-filled my-5"
                onClick={handleSubmit}
                disabled={data.phone.length < 10 ? true : false}
              >
                Add Phone Number
              </button>
            </div>
          ) : (
            <div className="card-manage-phone d-flex justify-content-between mx-4 my-4">
              <div className="detail-transaction d-flex flex-column">
                <span>Primary</span>
                {data.phone && <span className="fw-bold">{PhoneFormat(data.phone)}</span>}
              </div>
              <div className="my-2 mx-2 cursor-pointer" onClick={handleDelete}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="28"
                  height="28"
                  viewBox="0 0 28 28"
                  fill="none"
                >
                  <path
                    d="M3.5 7H5.83333H24.5"
                    stroke="#BBBBBE"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M9.33398 6.99967V4.66634C9.33398 4.0475 9.57982 3.45401 10.0174 3.01643C10.455 2.57884 11.0485 2.33301 11.6673 2.33301H16.334C16.9528 2.33301 17.5463 2.57884 17.9839 3.01643C18.4215 3.45401 18.6673 4.0475 18.6673 4.66634V6.99967M22.1673 6.99967V23.333C22.1673 23.9518 21.9215 24.5453 21.4839 24.9829C21.0463 25.4205 20.4528 25.6663 19.834 25.6663H8.16732C7.54848 25.6663 6.95499 25.4205 6.5174 24.9829C6.07982 24.5453 5.83398 23.9518 5.83398 23.333V6.99967H22.1673Z"
                    stroke="#BBBBBE"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </div>
          )}
        </>
      )}
    </Layout>
  );
}
