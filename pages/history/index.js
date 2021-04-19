import Layout from "../../component/base/Layout";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import axiosApiInstance from "../../helper/axiosInstance";
import Rupiah from "../../helper/rupiah";

export default function History() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [wallet, setWallet] = useState(null);
  const [sort, setSort] = useState("desc");

  useEffect(() => {
    if (!localStorage.getItem("user")) {
      Swal.fire("Restricted Area", "Only Users Can Be Access", "warning");
      router.push("/auth/login");
    } else {
      if (!user) {
        setUser(JSON.parse(localStorage.getItem("user")));
      }
      axiosApiInstance
        .get(`${process.env.NEXT_PUBLIC_URL_API}/wallet/dashboard?sort=${sort}`)
        .then((results) => {
          setWallet(results.data.data);
        })
        .catch((err) => {
          Swal.fire("Error Server", err.response.data.message, "error");
        });
    }
  }, [sort]);

  const handleSort = () => {
    if (sort === "desc") {
      setSort("asc");
    } else {
      setSort("desc");
    }
  };

  return (
    <Layout
      title="History Pages"
      navbar="logged"
      footer="logged"
      type="no-auth"
      classContent="col full-history"
    >
      <div className="head-transaction d-flex justify-content-between mx-4 my-4 fw-bold fs-4">
        <span>Transaction History</span>
        <button
          className="btn-filled px-2 py-2 fs-5 text-white fw-bold outline-none"
          onClick={handleSort}
        >
          {sort === "desc" ? "New ↑" : "New ↓"}
        </button>
      </div>
      {wallet &&
        wallet.history.map((item, i) => {
          if (item.receiver === wallet.userId) {
            return (
              <div className="card-history d-flex justify-content-between mx-4 my-4">
                <div className="d-flex">
                  <div className="avatar-user me-2 my-1">
                    <img
                      src={item.avatarSender}
                      alt=""
                      width="56px"
                      height="45px"
                      style={{ borderRadius: "10px" }}
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
              <div className="card-history d-flex justify-content-between mx-4 my-4">
                <div className="d-flex">
                  <div className="avatar-user me-2 my-1">
                    <img
                      src={item.avatarReceiver}
                      alt=""
                      width="56px"
                      height="45px"
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
        })}
    </Layout>
  );
}
