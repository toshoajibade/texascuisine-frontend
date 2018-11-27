import axios from "axios";
import store from "../store";

const Api = {
  instance() {
    const instance = axios.create({
      baseURL: `https://texascuisine.herokuapp.com/`,
      // baseURL: `http://localhost:3000/`,
      headers: {
        Authorization: `Bearer ${store.state.token}`
      }
    });
    return instance;
  },
  postPicture() {
    const postPicture = axios.create({
      baseURL: `https://texacuisine.herokuapp.com/`,
      // baseURL: `http://localhost:3000/`,
      headers: {
        Authorization: `Bearer ${store.state.token}`,
        "Content-Type": `application/x-www-form-urlencoded`
      }
    });
    return postPicture;
  }
};

export default Api;
