function Header({ score, highScore, gameOver, onPlayAgain }) {
  return (
    <header className={`center-pop`}>
      <h1>Teehat Memory Game 🧠 </h1>
      <p>
        <i>Don't click on the same emoji twice...🤯</i>
      </p>
      <p>
        <strong>Score:</strong> {score}
      </p>
      <p>
        <strong> High Score: </strong>
        {highScore}
      </p>
      {gameOver && (
        <div>
          <p>Game Over!⏱️ </p>
          <button className="play-again" onClick={onPlayAgain}>
            Play Again
          </button>
        </div>
      )}
    </header>
  );
}

export default Header;
