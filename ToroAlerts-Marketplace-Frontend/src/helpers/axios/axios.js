import axios from "axios";

let token;

const axiosInstance = axios.create({
  headers: {
    Authorization: token ? `${token}` : "",
  },
});

axiosInstance.interceptors.request.use((req) => {
  //const user = window.localStorage.getItem("user");
  token = JSON.parse(localStorage.getItem("userData"))?.token;
  //console.log("token from axios", token);
  if (token) {
    req.headers.Authorization = `${token}`;
  }
  return req;
});

axiosInstance.interceptors.response.use(
  (res) => {
    return res;
  },
  (error) => {
    console.log(error);
    // const status = error.response ? error.response.status : 500;
    // if (status && status === 500) {
    //   localStorage.clear();
    // }
    return Promise.reject(error);
  }
);

export default axiosInstance;
