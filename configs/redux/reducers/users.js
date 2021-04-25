const initialstate = {
  data: {
    status: false,
    message: "",
    data: {
      userId: 0,
      firstName: "",
      lastName: "",
      username: "",
      email: "",
      gender: "",
      role: "",
      address: "",
      phone: "",
      birthday: "",
      avatar: "",
      active: false,
      createdAt: "",
      updatedAt: "",
      token: "",
      refreshToken: "",
    },
  },
};

const User = (state = initialstate, action) => {
  switch (action.type) {
    case "REQUEST_LOGIN":
      return {
        data: action.payload,
      };
    case "LOGOUT":
      return {
        data: null,
      };
    default:
      return state;
  }
};

export default User;
