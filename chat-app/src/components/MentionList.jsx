function MentionList({ users, selectedIndex, onSelect }) {
  if (users.length === 0) return null;

  return (
    <ul className="mention-dropdown" role="listbox">
      {users.map((username, index) => (
        <li
          key={username}
          role="option"
          aria-selected={index === selectedIndex}
          className={`mention-item ${index === selectedIndex ? "active" : ""}`}
          onMouseDown={(e) => {
            // Prevent blur of textarea
            e.preventDefault();
            onSelect(username);
          }}
        >
          <span className="mention-name">@{username}</span>
        </li>
      ))}
    </ul>
  );
}

export default MentionList;

