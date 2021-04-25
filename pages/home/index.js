import Layout from "../../component/base/Layout";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import axiosApiInstance from "../../helper/axiosInstance";
import Rupiah from "../../helper/rupiah";
import PhoneFormat from "../../helper/phoneFormat";
import { BarChart, Bar, XAxis, Tooltip } from "recharts";
import { useSelector } from "react-redux";
import Button from "../../component/base/Button";

export default function Home() {
  const router = useRouter();
  const state = useSelector((states) => states.user);
  const [user, setUser] = useState(null);
  const [wallet, setWallet] = useState(null);
  const [data, setData] = useState(null);

  const handleClick = (e) => {
    e.preventDefault();
    router.push("/history");
  };

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      Swal.fire("Restricted Area", "Only Users Can Be Access", "warning");
      router.push("/auth/login");
    } else {
      if (!user) {
        axiosApiInstance
          .get(`${process.env.NEXT_PUBLIC_URL_API}/users`)
          .then((result) => {
            setUser(result.data.data);
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
        axiosApiInstance
          .get(`${process.env.NEXT_PUBLIC_URL_API}/wallet/dashboard`)
          .then((results) => {
            setWallet(results.data.data);
          })
          .catch((err) => {
            Swal.fire("Error Server", err.response.data.message, "error");
          });
        axiosApiInstance
          .get(`${process.env.NEXT_PUBLIC_URL_API}/trx/data`)
          .then((result) => {
            setData(result.data.data);
          })
          .catch((err) => {
            Swal.fire("Error Server", err.response.data.message, "error");
          });
      }
    }
  }, []);

  return (
    <Layout
      title="Home Pages"
      navbar="logged"
      footer="logged"
      type="no-auth"
      classContent="col-lg-9 col-md-8 col-sm-8 d-flex flex-column"
    >
      <div className="balance-info d-flex justify-content-between">
        {user && (
          <div className="info-saldo d-flex flex-column mx-5 my-4">
            <span className="fs-5 text-white fw-lighter">Balance</span>
            {wallet ? (
              <span className="fs-1 text-white fw-bold my-2">{Rupiah(wallet.balance)}</span>
            ) : (
              <span className="fs-1 text-white fw-bold my-2">000.00</span>
            )}
            <span className="text-white fw-lighter" style={{ fontSize: "14px" }}>
              {user.phone === "0" || user.phone === ""
                ? "Phone Number Has Not Been Added"
                : PhoneFormat(user.phone)}
            </span>
          </div>
        )}
        <div className="action-btn d-flex mx-5 my-2 d-md-none d-lg-flex d-sm-none d-xs-flex">
          <div className="action-transfer position-relative my-3 cursor-pointer">
            <div className="position-absolute me-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="28"
                height="28"
                viewBox="0 0 28 28"
                fill="none"
              >
                <path
                  d="M14 22.1663V5.83301"
                  stroke="#B5B0ED"
                  strokeOpacity="0.8"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M5.83337 13.9997L14 5.83301L22.1667 13.9997"
                  stroke="#B5B0ED"
                  strokeOpacity="0.8"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <Button
                className="position-absolute btn-transparent text-white"
                text="Transfer"
                onClick={() => router.push("/transfer")}
              />
            </div>
          </div>
          <div className="action-topup position-relative my-3 cursor-pointer">
            <div className="position-absolute me-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="28"
                height="28"
                viewBox="0 0 28 28"
                fill="none"
              >
                <path
                  d="M14 5.83301V22.1663"
                  stroke="#B5B0ED"
                  strokeOpacity="0.8"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M5.83337 14H22.1667"
                  stroke="#B5B0ED"
                  strokeOpacity="0.8"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <Button
                className="position-absolute btn-transparent text-white"
                text="TopUp"
                onClick={() => router.push("/topup")}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="d-flex justify-content-between">
        <div className="graphic-info">
          <div className="info-monthly d-flex justify-content-between">
            <div className="income d-flex flex-column mx-5 my-4">
              <span className="icon my-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="28"
                  height="28"
                  viewBox="0 0 28 28"
                  fill="none"
                >
                  <path
                    d="M14 5.83366L14 22.167"
                    stroke="#1EC15F"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M22.1667 14.0003L14 22.167L5.83333 14.0003"
                    stroke="#1EC15F"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
              <span>Income</span>
              {wallet ? (
                <span className="fw-bold">{Rupiah(wallet.totalIncome)}</span>
              ) : (
                <span className="fw-bold">Rp0</span>
              )}
            </div>
            <div className="expense d-flex flex-column mx-5 my-4">
              <span className="icon my-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="28"
                  height="28"
                  viewBox="0 0 28 28"
                  fill="none"
                >
                  <path
                    d="M14 22.1663L14 5.83301"
                    stroke="#FF5B37"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M5.83334 13.9997L14 5.83301L22.1667 13.9997"
                    stroke="#FF5B37"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
              <span>Expense</span>
              {wallet ? (
                <span className="fw-bold">{Rupiah(wallet.totalExpense)}</span>
              ) : (
                <span className="fw-bold">Rp0</span>
              )}
            </div>
          </div>
          <BarChart width={410} height={250} data={data} layout="horizontal" className="mx-3">
            <Tooltip />
            <XAxis type="category" dataKey="name" />
            <Bar dataKey="income" fill="#6379F4" isAnimationActive={true} />
            <Bar dataKey="expense" fill="#9DA6B5" isAnimationActive={true} />
          </BarChart>
        </div>
        <div className="history-info d-none d-lg-block">
          <div className="head-history d-flex justify-content-between mx-4 my-4">
            <span className="fw-bold">Transaction History</span>
            <span className="primary-text cursor-pointer" onClick={handleClick}>
              See all
            </span>
          </div>
          {wallet &&
            wallet.history.map((item, i) => {
              if (i < 4) {
                if (item.receiver === wallet.userId) {
                  return (
                    <div className="card-history d-flex justify-content-between mx-4 my-4" key={i}>
                      <div className="d-flex">
                        <div className="avatar-user me-2 my-1">
                          <img
                            src={item.avatarSender}
                            className="profile"
                            alt=""
                            width="52px"
                            height="52px"
                          />
                        </div>
                        <div className="detail-transaction d-flex flex-column">
                          <span className="fw-bold">{item.nameSender}</span>
                          <span>Transfer</span>
                        </div>
                      </div>
                      <div className="balance income fw-bold">+{Rupiah(item.amount)}</div>
                    </div>
                  );
                } else {
                  return (
                    <div className="card-history d-flex justify-content-between mx-4 my-4" key={i}>
                      <div className="d-flex">
                        <div className="avatar-user me-2 my-1">
                          <img
                            src={item.avatarReceiver}
                            alt=""
                            width="52px"
                            height="52px"
                            style={{ borderRadius: "10px" }}
                          />
                        </div>
                        <div className="detail-transaction d-flex flex-column">
                          <span className="fw-bold">{item.nameReceiver}</span>
                          <span>Transfer</span>
                        </div>
                      </div>
                      <div className="balance expense fw-bold">-{Rupiah(item.amount)}</div>
                    </div>
                  );
                }
              }
            })}
        </div>
      </div>
    </Layout>
  );
}
