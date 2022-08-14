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
      window.location.href = "http://localhost:4000/";
    }
  } catch (err) {
    console.log(err);
  }
};
