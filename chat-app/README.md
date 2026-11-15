# Chat App

A real-time team chat application built with React, Vite, Express, and Socket.io.

## Features Implemented
- Single-page layout with a scrollable message thread and fixed bottom input bar.
- Automatic random assignment of usernames from `["Alan", "Bob", "Carol", "Dean", "Elin"]` for every sent message.
- Initial avatar circle with distinct user colors.
- Like button on the right end of each message displaying an incrementing like count.
- Keyboard support: `Enter` sends the message, `Shift + Enter` inserts a newline.
- Auto-scroll to the bottom when new messages arrive.
- **Stretch Goal 1 (Emoji Picker):** Lightweight custom emoji popover that inserts emojis at cursor position.
- **Stretch Goal 2 (@Mentions):** Typing `@` opens an autocomplete dropdown filtered by matching users. Supports keyboard navigation (`Up`/`Down`/`Enter`) and click selection. Mentions (`@Username`) are highlighted inside messages.
- **Stretch Goal 3 (Socket.io Full-Duplex Server):** Express + Socket.io server in `server/index.js` on port 4000. Messages and like clicks synchronize in real time across all connected clients. Includes a visual live/offline status indicator with local fallback if the server is offline.

## How to Run

### 1. Run Server (Express + Socket.io)
Open a terminal inside `chat-app`:
```bash
npm run server
```
The server will run on `http://localhost:4000`.

### 2. Run Client (React + Vite)
In a second terminal inside `chat-app`:
```bash
npm install
npm run dev
```
Open the provided Vite local URL in multiple browser tabs to test multi-user messaging and synchronized likes.

### 3. Production Build
```bash
npm run build
```
