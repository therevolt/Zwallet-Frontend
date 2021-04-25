const initialstate = {
  data: {
    status: false,
    message: "",
    data: {
      receiver: "",
      amount: "",
      notes: "",
    },
  },
};

const Trx = (state = initialstate, action) => {
  switch (action.type) {
    case "TRANSFER_AMOUNT":
      return {
        data: action.payload,
      };
    default:
      return state;
  }
};

export default Trx;
