import axios, { AxiosInstance } from "axios";

//TMDBからのbaseURLリクエストを作成
const instance: AxiosInstance = axios.create({
  baseURL: "https://api.themoviedb.org/3",
});

export default instance;
