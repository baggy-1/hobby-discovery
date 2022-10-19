import axios from "axios";

interface Data {
  [key: string]: string;
}

const postFetcher = async (url: string, data: Data) =>
  await (
    await axios.post(url, data)
  ).data;

export default postFetcher;
