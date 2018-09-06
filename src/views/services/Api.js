import axios from "axios";
import store from "../../store";

let Api = {
  instance() {
    let instance = axios.create({
      baseURL: `https://shielded-brushlands-80745.herokuapp.com/`,
      headers: {
        Authorization: `Bearer ${store.state.token}`
      }
    });
    return instance;
  },
  postPicture() {
    let postPicture = axios.create({
      baseURL: `https://shielded-brushlands-80745.herokuapp.com/`,
      headers: {
        Authorization: `Bearer ${store.state.token}`,
        "Content-Type": `application/x-www-form-urlencoded`
      }
    });
    return postPicture;
  }
};

export default Api;
