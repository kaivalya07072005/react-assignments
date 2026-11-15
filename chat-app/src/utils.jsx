const USER_COLORS = {
  Alan: "#d9534f",
  Bob: "#8bc34a",
  Carol: "#e91e63",
  Dean: "#3f51b5",
  Elin: "#ff9800",
};

export function getUserColor(username) {
  return USER_COLORS[username] || "#607d8b";
}

export function formatCurrentTime() {
  const now = new Date();
  return now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

export function renderMessageWithMentions(text, userList) {
  if (!text) return null;

  const namesPattern = userList.join("|");
  const regex = new RegExp(`(@(?:${namesPattern}))`, "g");
  const parts = text.split(regex);

  return parts.map((part, index) => {
    if (part.startsWith("@") && userList.includes(part.slice(1))) {
      return (
        <span key={index} className="mention-tag">
          {part}
        </span>
      );
    }
    return <span key={index}>{part}</span>;
  });
}
