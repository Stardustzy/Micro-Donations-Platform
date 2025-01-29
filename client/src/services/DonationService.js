import api from "./api";

const makeDonation = (donationData) => api.post("/donations", donationData);

const getDonationsByCause = (causeId) => api.get(`/donations/cause/${causeId}`);

export default { makeDonation, getDonationsByCause };
