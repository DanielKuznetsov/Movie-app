import axios from "axios";

export const bookmark = async (id, action) => {
  const result = await axios({
    method: "POST",
    url: `/api/v1/movies/${action}/${id}`,
  });

  if (result.data.status === "success" || result.data.status === "success!") {
    console.log("SUCCESS");

    window.location.reload();
  }
};
