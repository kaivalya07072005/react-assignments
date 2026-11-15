const COMMON_EMOJIS = [
  "😀", "😂", "😍", "🎉", "🔥", "👍", "🙌", "✨",
  "💯", "😎", "🚀", "💡", "👋", "👏", "❤️", "🤩"
];

function EmojiPicker({ onSelect, onClose }) {
  return (
    <div className="emoji-picker-popover">
      <div className="emoji-picker-header">
        <span>Quick Emoji</span>
        <button
          type="button"
          className="emoji-picker-close"
          onClick={onClose}
          aria-label="Close emoji picker"
        >
          ×
        </button>
      </div>
      <div className="emoji-grid">
        {COMMON_EMOJIS.map((emoji) => (
          <button
            key={emoji}
            type="button"
            className="emoji-cell"
            onClick={() => onSelect(emoji)}
          >
            {emoji}
          </button>
        ))}
      </div>
    </div>
  );
}

export default EmojiPicker;

