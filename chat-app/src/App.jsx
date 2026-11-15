import { useState, useEffect, useRef } from "react";
import { io } from "socket.io-client";
import Hero40 from "./components/originkit/hero-40";
import MessageItem from "./components/MessageItem";
import EmojiPicker from "./components/EmojiPicker";
import MentionList from "./components/MentionList";
import { formatCurrentTime } from "./utils";
import "./App.css";

// Exact assignment specified user list
const USER_LIST = ["Alan", "Bob", "Carol", "Dean", "Elin"];
const SOCKET_SERVER_URL = "http://localhost:4000";

function App() {
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState("connecting");
  const [activeView, setActiveView] = useState("hero"); // "hero" | "chat"
  const [theme, setTheme] = useState("light"); // "light" | "dark"

  // Mention dropdown state
  const [mentionQuery, setMentionQuery] = useState(null);
  const [mentionIndex, setMentionIndex] = useState(0);

  const socketRef = useRef(null);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  // Sync theme class to root body & document
  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
      document.body.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
      document.body.classList.remove("dark");
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  // Auto-scroll inside chat thread
  useEffect(() => {
    if (activeView === "chat") {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, activeView]);

  // WebSocket socket.io connection setup
  useEffect(() => {
    const socket = io(SOCKET_SERVER_URL, {
      transports: ["websocket", "polling"],
      reconnectionAttempts: 5,
      timeout: 3000,
    });
    socketRef.current = socket;

    socket.on("connect", () => {
      setConnectionStatus("connected");
    });

    socket.on("disconnect", () => {
      setConnectionStatus("disconnected");
    });

    socket.on("connect_error", () => {
      setConnectionStatus("disconnected");
    });

    // Populate initial chat feed from server
    socket.on("chat:init", (initialMessages) => {
      setMessages(initialMessages);
    });

    // Receive broadcasted new message
    socket.on("chat:message", (newMessage) => {
      setMessages((prev) => {
        if (prev.some((m) => m.id === newMessage.id)) return prev;
        return [...prev, newMessage];
      });
    });

    // Receive broadcasted like count update
    socket.on("chat:like", ({ messageId, likes }) => {
      setMessages((prev) =>
        prev.map((m) => (m.id === messageId ? { ...m, likes } : m))
      );
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  // Filter matching users for mention dropdown
  const matchingUsers =
    mentionQuery !== null
      ? USER_LIST.filter((user) =>
          user.toLowerCase().startsWith(mentionQuery.toLowerCase())
        )
      : [];

  const handleInputChange = (e) => {
    const value = e.target.value;
    setInputText(value);

    // Detect `@` mention trigger before caret
    const cursorPosition = e.target.selectionStart;
    const textBeforeCursor = value.slice(0, cursorPosition);
    const atIndex = textBeforeCursor.lastIndexOf("@");

    if (atIndex !== -1) {
      const charBeforeAt = atIndex > 0 ? textBeforeCursor[atIndex - 1] : " ";
      if (charBeforeAt === " " || charBeforeAt === "\n" || atIndex === 0) {
        const query = textBeforeCursor.slice(atIndex + 1);
        if (!query.includes(" ")) {
          setMentionQuery(query);
          setMentionIndex(0);
          return;
        }
      }
    }
    setMentionQuery(null);
  };

  const handleInsertMention = (username) => {
    const cursorPosition = inputRef.current ? inputRef.current.selectionStart : inputText.length;
    const textBeforeCursor = inputText.slice(0, cursorPosition);
    const textAfterCursor = inputText.slice(cursorPosition);
    const atIndex = textBeforeCursor.lastIndexOf("@");

    if (atIndex !== -1) {
      const newText =
        textBeforeCursor.slice(0, atIndex) +
        `@${username} ` +
        textAfterCursor;
      setInputText(newText);
      setMentionQuery(null);

      setTimeout(() => {
        if (inputRef.current) {
          inputRef.current.focus();
          const newPos = atIndex + username.length + 2;
          inputRef.current.setSelectionRange(newPos, newPos);
        }
      }, 0);
    }
  };

  const handleInsertEmoji = (emoji) => {
    setInputText((prev) => prev + emoji);
    setShowEmojiPicker(false);
    inputRef.current?.focus();
  };

  const handleSendMessage = () => {
    if (!inputText.trim()) return;

    // Pick a random user from the assignment user list
    const randomAuthor = USER_LIST[Math.floor(Math.random() * USER_LIST.length)];

    const newMessage = {
      id: Date.now().toString(),
      text: inputText.trim(),
      user: randomAuthor,
      time: formatCurrentTime(),
      likes: 0,
    };

    if (socketRef.current && socketRef.current.connected) {
      socketRef.current.emit("chat:message", newMessage);
    } else {
      // Local fallback mode if server offline
      setMessages((prev) => [...prev, newMessage]);
    }

    setInputText("");
    setShowEmojiPicker(false);
    setMentionQuery(null);
  };

  const handleKeyDown = (e) => {
    if (mentionQuery !== null && matchingUsers.length > 0) {
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setMentionIndex((prev) => (prev + 1) % matchingUsers.length);
        return;
      }
      if (e.key === "ArrowUp") {
        e.preventDefault();
        setMentionIndex(
          (prev) => (prev - 1 + matchingUsers.length) % matchingUsers.length
        );
        return;
      }
      if (e.key === "Enter" || e.key === "Tab") {
        e.preventDefault();
        handleInsertMention(matchingUsers[mentionIndex]);
        return;
      }
      if (e.key === "Escape") {
        e.preventDefault();
        setMentionQuery(null);
        return;
      }
    }

    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleLikeMessage = (messageId) => {
    if (socketRef.current && socketRef.current.connected) {
      socketRef.current.emit("chat:like", messageId);
    } else {
      setMessages((prev) =>
        prev.map((m) =>
          m.id === messageId ? { ...m, likes: (m.likes || 0) + 1 } : m
        )
      );
    }
  };

  return (
    <div className={`chat-app-root ${theme === "dark" ? "dark" : ""}`}>
      {/* 1. HERO VIEW */}
      {activeView === "hero" && (
        <Hero40
          onStartChat={() => setActiveView("chat")}
          theme={theme}
          onToggleTheme={toggleTheme}
        />
      )}

      {/* 2. GLASSMORPHIC PURPLE CHAT VIEW matching reference UI */}
      {activeView === "chat" && (
        <div className="glass-chat-view-container">
          {/* Ambient Glowing Blobs behind glass */}
          <div className="ambient-glow-blob blob-purple" aria-hidden="true" />
          <div className="ambient-glow-blob blob-magenta" aria-hidden="true" />

          <div className="glass-chat-card">
            {/* Header */}
            <header className="glass-chat-header">
              <div className="header-left-group">
                <button
                  type="button"
                  className="back-to-hero-btn"
                  onClick={() => setActiveView("hero")}
                  title="Back to Hero"
                >
                  ← Home
                </button>
                <div className="chat-card-title-group">
                  <span className="chat-card-title">Miracle Team Chat</span>
                  <span className="chat-card-subtitle">Channel: #introductions</span>
                </div>
              </div>

              <div className="header-right-group">
                <button
                  type="button"
                  className="theme-pill-btn"
                  onClick={toggleTheme}
                  title="Toggle Light/Dark Theme"
                >
                  {theme === "dark" ? "☀️ Light" : "🌙 Dark"}
                </button>

                <div className={`connection-pill ${connectionStatus === "connected" ? "online" : "offline"}`}>
                  <span className="live-dot" />
                  <span>{connectionStatus === "connected" ? "Live" : "Offline"}</span>
                </div>
              </div>
            </header>

            {/* Message Thread */}
            <main className="glass-chat-body">
              {messages.length === 0 ? (
                <div className="empty-chat-welcome">
                  <div className="welcome-avatar-circle">✨</div>
                  <h3>Hi, can I help you?</h3>
                  <p>Start a conversation with the team. Type your message below and press Send.</p>
                </div>
              ) : (
                messages.map((message) => (
                  <MessageItem
                    key={message.id}
                    message={message}
                    userList={USER_LIST}
                    onLike={handleLikeMessage}
                  />
                ))
              )}
              <div ref={messagesEndRef} />
            </main>

            {/* Input Bar */}
            <footer className="glass-chat-footer">
              {/* Mentions dropdown */}
              {mentionQuery !== null && (
                <MentionList
                  users={matchingUsers}
                  selectedIndex={mentionIndex}
                  onSelect={handleInsertMention}
                />
              )}

              {/* Emoji Picker */}
              {showEmojiPicker && (
                <EmojiPicker
                  onSelect={handleInsertEmoji}
                  onClose={() => setShowEmojiPicker(false)}
                />
              )}

              <div className="glass-input-pill">
                <span className="input-media-icon" aria-hidden="true">🖼️</span>

                <input
                  ref={inputRef}
                  type="text"
                  value={inputText}
                  onChange={handleInputChange}
                  onKeyDown={handleKeyDown}
                  placeholder="Write message... Use @ for mentions"
                  className="chat-pill-input"
                  autoFocus
                />

                <button
                  type="button"
                  className="emoji-pill-btn"
                  onClick={() => setShowEmojiPicker((prev) => !prev)}
                  title="Insert Emoji"
                  aria-label="Insert Emoji"
                >
                  😊
                </button>

                <button
                  type="button"
                  onClick={handleSendMessage}
                  disabled={!inputText.trim()}
                  className="send-pill-btn"
                  aria-label="Send message"
                >
                  <span>Send</span>
                  <span className="send-icon">↗</span>
                </button>
              </div>
            </footer>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
