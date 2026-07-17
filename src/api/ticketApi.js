import axiosClient from "./axiosClient";

const ticketApi = {
    getTicket: (id) => axiosClient.get(`/tickets/${id}`),
    getTicketByBooking: (bookingId) => axiosClient.get(`/booking/${bookingId}/ticket`),
    verifyTicket: (code) => axiosClient.post('/tickets/verify', { code })
};

export default ticketApi;
