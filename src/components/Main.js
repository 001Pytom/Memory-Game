function Main({ gameOver, displayedEmojis, onEmojiClick }) {
  return (
    <main>
      {!gameOver && (
        <div>
          {displayedEmojis.map((emoji, index) => (
            <button
              className="card"
              key={emoji.codePoint}
              onClick={() => onEmojiClick(emoji)}
            >
              <span className="icon">{emoji.character}</span>
            </button>
          ))}
        </div>
      )}
    </main>
  );
}

export default Main;
