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
    }
  } catch (err) {
    console.log(err);
  }
};
