import axiosInstance from "../utils/axios";

async function fetchQRCode(url, setData) {
  try {
    const response = await axiosInstance.get(url);
    const data = await response.data;
    setData(data);
  } catch (err) {
    console.error(err);
    setData(null);
  }
}

export default fetchQRCode;
