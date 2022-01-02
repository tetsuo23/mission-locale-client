import axios from "axios";

export default axios.create({
  baseURL: "https://mission-locale-server.herokuapp.com//api",
  headers: {
    "Content-type": "application/json"
  }
});