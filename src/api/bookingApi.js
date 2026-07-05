import axiosClient from './axiosClient';

const bookingApi = {
  getPendingBookings: async () => {
    try {
      let myId = 0;

      // Method 1: Try to extract user ID by decoding JWT payload from local storage
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const parts = token.split('.');
          if (parts.length === 3) {
            const base64Url = parts[1];
            const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
            const jsonPayload = decodeURIComponent(
              atob(base64)
                .split('')
                .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
                .join('')
            );
            const payload = JSON.parse(jsonPayload);
            myId = payload.id || payload.userId || payload.sub || 0;
          }
        } catch (e) {
          console.warn("Error decoding token:", e);
        }
      }

      // Method 2: Fallback to calling /auth/me if token decoding did not yield an ID
      if (!myId) {
        try {
          const user = await axiosClient.get('/auth/me');
          myId = user?.userId || user?.id || user?.user?.id || 0;
        } catch (err) {
          console.error("Error fetching user profile:", err);
        }
      }

      // Try multiple endpoint structures to ensure it works with their backend:
      // 1. Try GET /users/${myId}/booking
      try {
        const res = await axiosClient.get(`/users/${myId}/booking`);
        if (res) return res;
      } catch (err) {
        // Ignore and try next
      }

      // 2. Try GET /user/${myId}/booking
      try {
        const res = await axiosClient.get(`/user/${myId}/booking`);
        if (res) return res;
      } catch (err) {
        // Ignore and try next
      }

      // 3. Try GET /bookings and filter by user ID
      try {
        const res = await axiosClient.get('/bookings');
        if (Array.isArray(res)) {
          return res.filter(b => b.userId === myId || b.user?.id === myId || b.user_id === myId);
        }
      } catch (err) {
        // Ignore and try next
      }

      // 4. Try GET /booking and filter by user ID
      try {
        const res = await axiosClient.get('/booking');
        if (Array.isArray(res)) {
          return res.filter(b => b.userId === myId || b.user?.id === myId || b.user_id === myId);
        }
      } catch (err) {
        // Ignore and try next
      }

      return null;
    } catch (err) {
      console.error(err);
      return null;
    }
  },
  cancelBooking: (id) => {
    // If your backend has PATCH /booking/:id/cancel
    return axiosClient.patch(`/booking/${id}/cancel`).catch(() => null);
  },
  createBooking: (bookingData) => {
    return axiosClient.post('/booking', bookingData);
  },
  getTicketByBookingId: (bookingId) => {
    return axiosClient.get(`/booking/${bookingId}/ticket`);
  },
  verifyTicketCode: (ticketCode) => {
    return axiosClient.post('/tickets/verify', { ticketCode });
  },
  getAllBooking : ()=>{
    return axiosClient.get('/booking');
  }
};

export default bookingApi;
