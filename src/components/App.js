import React, { useState, useEffect } from "react";
import Header from "./Header";
import Main from "./Main";

function App() {
  const [emojis, setEmojis] = useState([]);
  const [displayedEmojis, setDisplayedEmojis] = useState([]);
  const [clickedEmojis, setClickedEmojis] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    fetch(
      `https://emoji-api.com/emojis?access_key=4a819597914a2ca8ef33d8334b9b43e788375af6`
    )
      .then((resp) => {
        if (resp.status >= 400) {
          throw new Error("Server Error");
        }
        return resp.json();
      })
      .then((data) => {
        const allData = data.slice(50, 93);
        setEmojis(allData);
        setDisplayedEmojis(data.slice(0, 9));
      })
      .catch((error) => {
        console.error("Error fetching emojis:", error);
        // Handle error state
        setError(error);
      })
      .finally(() => setIsLoading(false));
  }, []);

  const shuffleEmojis = () => {
    const shuffledEmojis = emojis.sort(() => Math.random() - 0.5);
    setDisplayedEmojis(shuffledEmojis.slice(0, 9));
  };

  const handleEmojiClick = (emoji) => {
    if (clickedEmojis.includes(emoji.codePoint)) {
      // If the emoji has already been clicked, the game is lost
      // Update high score if necessary
      setHighScore(Math.max(highScore, score));
      // Reset score
      setScore(score);
      // Reset clicked emojis
      setClickedEmojis([]);
      // Set game over to true
      setGameOver(true);
    } else {
      // If the emoji hasn't been clicked, update score and clicked emojis
      setScore(score + 1);
      setClickedEmojis([...clickedEmojis, emoji.codePoint]);
    }
    // Shuffle emojis after each click
    shuffleEmojis();
  };

  const handlePlayAgain = () => {
    // Reset score and clicked emojis
    setScore(0);
    setClickedEmojis([]);
    // Shuffle emojis for new game
    shuffleEmojis();
    // Set game over to false
    setGameOver(false);
  };

  if (error) {
    return (
      <p className="loader-container"> 💣A network error was encountered</p>
    );
  }

  if (isLoading)
    return (
      <div className="loader-container">
        <p>Loading emoji</p>
        <div className="loader"></div>
      </div>
    );

  return (
    <div>
      <Header
        score={score}
        highScore={highScore}
        gameOver={gameOver}
        onPlayAgain={handlePlayAgain}
      />

      <Main
        gameOver={gameOver}
        displayedEmojis={displayedEmojis}
        onEmojiClick={handleEmojiClick}
      />
    </div>
  );
}

export default App;
