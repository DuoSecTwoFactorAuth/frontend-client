import axios from "axios";

// localhost baseURL: http://localhost:8080
// deployment baseURL: http://ec2-3-87-229-37.compute-1.amazonaws.com:8080

const axiosInstance = axios.create({
  baseURL: 'http://localhost:8080',
});

export default axiosInstance;