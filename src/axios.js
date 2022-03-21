import axios from "axios";

// create base url for api calls
const instance = axios.create({ baseURL: "http://www.omdbapi.com/?i=tt3896198&apikey=2eca3a1" });

export default instance;
