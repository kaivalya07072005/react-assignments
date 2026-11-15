import { renderMessageWithMentions, getUserColor } from "../utils";

function MessageItem({ message, userList, onLike }) {
  // Use first two letters or first letter of name for initials (e.g., Al, Bo, Ca, De, El)
  const initials = message.user ? message.user.slice(0, 2).toUpperCase() : "??";
  const avatarBg = getUserColor(message.user);

  return (
    <div className="message-row">
      {/* Avatar Circle matching the GIF style */}
      <div
        className="message-avatar"
        style={{ backgroundColor: avatarBg }}
        aria-hidden="true"
      >
        {initials}
      </div>

      <div className="message-content">
        {/* Username + Time */}
        <div className="message-header">
          <span className="message-username">{message.user}</span>
          <span className="message-time">{message.time}</span>
        </div>

        {/* Message Bubble + Right-aligned Like Button */}
        <div className="message-bubble-wrapper">
          <div className="message-bubble">
            <span className="message-text">
              {renderMessageWithMentions(message.text, userList)}
            </span>
          </div>

          {/* Like button at the right end of each message */}
          <button
            type="button"
            className="message-like-btn"
            onClick={() => onLike(message.id)}
            title="Like this message"
            aria-label={`Like message by ${message.user}`}
          >
            <span className="like-icon">👍</span>
            <span className="like-counter">{message.likes || 0}</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default MessageItem;
