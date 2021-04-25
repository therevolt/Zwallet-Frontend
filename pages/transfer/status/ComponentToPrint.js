import React from "react";
import Rupiah from "../../../helper/rupiah";
import PhoneFormat from "../../../helper/phoneFormat";

export default class ComponentToPrint extends React.PureComponent {
  render() {
    return (
      <div ref={this.props.ref}>
        <div className="d-flex flex-column align-items-center my-5">
          <img src="/success.png" alt="" />
          <span className="fw-bold fs-4 my-3">Transfer Success</span>
        </div>
        <div className="card-info-transfer mx-4">
          <div className="title">Amount</div>
          {this.props.data && <div className="body">{Rupiah(this.props.data.amount)}</div>}
        </div>
        <div className="card-info-transfer mx-4">
          <div className="title">Balance Left</div>
          {this.props.data && (
            <div className="body">
              {this.props.status === "receiver"
                ? Rupiah(this.props.data.balanceReceiverLeft)
                : Rupiah(this.props.data.balanceSenderLeft)}
            </div>
          )}
        </div>
        <div className="card-info-transfer mx-4">
          <div className="title">Date & Time</div>
          {this.props.data && (
            <div className="body">
              {new Date(this.props.data.date).toDateString()} -{" "}
              {new Date(this.props.data.date).toLocaleTimeString()}
            </div>
          )}
        </div>
        <div className="card-info-transfer mx-4">
          <div className="title">Notes</div>
          {this.props.data && (
            <div className="body">{this.props.data.notes ? this.props.data.notes : "-"}</div>
          )}
        </div>
        <div
          style={{ color: "#7A7886", fontWeight: "700", fontSize: "18px" }}
          className="mx-4 my-4"
        >
          {this.props.status === "receiver" ? "Transfer from" : "Transfer to"}
        </div>
        {this.props.data && (
          <div className="card-contact d-flex justify-content-between my-3 mx-4">
            <div className="d-flex">
              <div className="avatar-user">
                <img
                  src={this.props.data.avatarReceiver}
                  alt=""
                  width="52px"
                  height="52px"
                  style={{ borderRadius: "10px" }}
                />
              </div>
              <div className="detail-transaction d-flex flex-column mx-3">
                <span className="fw-bold">{this.props.data.receiverName}</span>
                <span>{PhoneFormat(this.props.data.phoneReceiver)}</span>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}
