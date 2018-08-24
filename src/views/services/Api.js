import axios from "axios";
import store from "../../store";

let Api = {
  instance() {
    let instance = axios.create({
      baseURL: `http://localhost:3000/`,
      headers: {
        Authorization: `Bearer ${store.state.token}`
      }
    });
    return instance;
  },
  postPicture() {
    let postPicture = axios.create({
      baseURL: `http://localhost:3000/`,
      headers: {
        Authorization: `Bearer ${store.state.token}`,
        "Content-Type": `application/x-www-form-urlencoded`
      }
    });
    return postPicture;
  }
};

export default Api;
