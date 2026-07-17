# Booking System API Endpoints

This is a comprehensive list of all the API endpoints currently defined in the backend application.

## 🔐 Auth (`/auth`)
*   `POST /auth/register` - Register a new user
*   `POST /auth/login` - Authenticate a user
*   `POST /auth/logout` - Log out a user
*   `GET /auth/me` - Get current authenticated user details
*   `PUT /auth/me` - Update current authenticated user details
*   `POST /auth/forgot-password` - Request a password reset
*   `POST /auth/reset-password` - Reset password
*   `GET /auth/google` - Initiate Google OAuth login
*   `GET /auth/google/callback` - Google OAuth callback

## 👤 Users (`/users`)
*   `GET /users/` - Get all users (Admin only)
*   `GET /users/:id` - Get a specific user by ID
*   `PUT /users/edit/:id` - Edit a user
*   `PATCH /users/ban/:id` - Ban a user (Admin only)
*   `PATCH /users/unban/:id` - Unban a user (Admin only)
*   `GET /users/:id/booking` - Get all bookings for a specific user
*   `GET /users/:id/tickets` - Get all digital tickets for a specific user

## 🏢 Rooms (`/rooms`)
*   `GET /rooms/` - Get all rooms
*   `POST /rooms/` - Create a new room (Admin only)
*   `GET /rooms/available` - Get available rooms
*   `GET /rooms/:room_id` - Get a specific room by ID
*   `PUT /rooms/:room_id` - Update a room (Admin only)
*   `DELETE /rooms/:room_id` - Delete a room (Admin only)
*   `PATCH /rooms/:room_id/status` - Update a room's status (Admin only)
*   `GET /rooms/:room_id/schedules` - Get schedules for a specific room
*   `GET /rooms/:room_id/bookings` - Get bookings for a specific room
*   `POST /rooms/:room_id/images` - Upload an image for a room (Admin only)

## 📅 Bookings (`/booking`)
*   `GET /booking/` - Get all bookings
*   `POST /booking/` - Create a new booking
*   `GET /booking/me` - Get bookings for the current authenticated user
*   `GET /booking/pendings` - Get all pending bookings (Admin only)
*   `GET /booking/approved` - Get all approved bookings (Admin only)
*   `GET /booking/:booking_id` - Get a specific booking by ID
*   `PUT /booking/:booking_id` - Update a booking
*   `PATCH /booking/:booking_id/approve` - Approve a booking (Admin only)
*   `PATCH /booking/:booking_id/reject` - Reject a booking (Admin only)
*   `PATCH /booking/:booking_id/cancel` - Cancel a booking
*   `PATCH /booking/:booking_id/complete` - Mark a booking as completed (Admin only)
*   `PATCH /booking/:booking_id/no-show` - Mark a booking as no-show (Admin only)
*   `PATCH /booking/:booking_id/reschedule` - Reschedule a booking (Admin only)

## 🎟️ Digital Tickets (Root `/`)
*   `GET /tickets` - Get all tickets (Admin only)
*   `POST /tickets/verify` - Verify a ticket code (Admin only)
*   `GET /tickets/:ticketId` - Get a specific ticket by ID
*   `PATCH /tickets/:ticketId/cancel` - Cancel a ticket (Admin only)
*   `PATCH /tickets/:ticketId/expire` - Expire a ticket (Admin only)
*   `GET /bookings/:bookingId/ticket` - Get a ticket by its associated booking ID

## ⏰ Schedules (`/schedules`)
*   `GET /schedules/` - Get all schedules
*   `POST /schedules/` - Create a new schedule (Admin only)
*   `POST /schedules/check-conflict` - Check for scheduling conflicts
*   `GET /schedules/:scheduleId` - Get a specific schedule by ID
*   `PUT /schedules/:scheduleId` - Update a schedule (Admin only)
*   `DELETE /schedules/:scheduleId` - Delete a schedule (Admin only)

## 💰 Credits (`/credits`)
*   `GET /credits/me` - Get the current user's credit balance
*   `POST /credits/manage` - Manage user credits (Add/Deduct) (Admin only)

## 🛠️ Maintenance (`/maintenance`)
*   `GET /maintenance/` - Get all maintenance requests (Admin only)
*   `POST /maintenance/` - Create a maintenance request
*   `GET /maintenance/my-requests` - Get maintenance requests for the current user
*   `GET /maintenance/:id` - Get a specific maintenance request (Admin only)
*   `PATCH /maintenance/:id/status` - Update maintenance request status (Admin only)

## ⛔ Bans (`/bans`)
*   `GET /bans/` - Get all ban records (Admin only)
*   `GET /bans/user/:userId` - Get ban records for a specific user (Admin only)

## 💬 Chat (`/chat`)
*   `POST /chat/assist` - AI Chat assistance
