import axios from "axios";

export const login = async (email, password) => {
  try {
    const result = await axios({
      method: "POST",
      url: "/api/v1/users/login",
      data: {
        email,
        password,
      },
    });

    if (result.data.status === "success") {
      console.log("SUCCESS");

      // After successful login, the app redirects me to the /overview route-page
      window.location.href = "/";
    }
  } catch (err) {
    console.log(err);
  }
};

export const logout = async () => {
  try {
    const result = await axios({
      method: "GET",
      url: "/api/v1/users/logout",
    });
    // console.log("SUCCESS");

    if (result.data.status === "success") {
      // console.log("SUCCESS");

      // After successful login, the app redirects me to the /overview route-page
      window.location.href = "/login";
    }
  } catch (err) {
    console.log(err.message);
  }
};

export const signup = async (
  firstName,
  lastName,
  email,
  password,
  passwordConfirm
) => {
  try {
    const result = await axios({
      method: "POST",
      url: "/api/v1/users/signUp",
      data: {
        firstName,
        lastName,
        email,
        password,
        passwordConfirm,
      },
    });

    if (result.data.status === "success") {
      console.log("SUCCESS");

      window.location.href = "/";
    }
  } catch (err) {
    console.log(err.message);
  }
};
