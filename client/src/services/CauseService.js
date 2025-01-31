import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL + "/causes";

const CauseService = {
  getAllCauses: async () => {
    const response = await axios.get(API_URL);
    return response.data;
  },

  getFeaturedCauses: async () => {
    const response = await axios.get(API_URL + "/featured");
    return response.data;
  }, 

  getCauseById: async (id) => {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
  },

  createCause: async (causeData, token) => {
    const response = await axios.post(API_URL, causeData, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  },

  updateCause: async (id, causeData, token) => {
    const response = await axios.put(`${API_URL}/${id}`, causeData, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  },

  deleteCause: async (id, token) => {
    await axios.delete(`${API_URL}/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  },
};

export default CauseService;
