import axios from "axios";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
export const API_URL = `${BACKEND_URL}/api/notifications/`;

const getNews = async () => {
    const response = await axios.get(API_URL);
    return response.data;
};

const addNew = async (newData) => {
    const response = await axios.post(API_URL + "create", newData);
    return response.data;
};

const newService = {
    getNews,
    addNew,
};

export default newService;