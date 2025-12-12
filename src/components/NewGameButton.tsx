import { useState } from 'react';
import './NewGameButton.css';

interface NewGameButtonProps {
  onNewGame: () => void;
}

/**
 * Компонент кнопки сброса игры с подтверждением
 */
export function NewGameButton({ onNewGame }: NewGameButtonProps) {
  const [showConfirm, setShowConfirm] = useState(false);

  const handleClick = () => {
    if (!showConfirm) {
      setShowConfirm(true);
      // Автоматически скрываем подтверждение через 3 секунды
      setTimeout(() => setShowConfirm(false), 3000);
    } else {
      onNewGame();
      setShowConfirm(false);
    }
  };

  return (
    <div className="new-game-container">
      <button
        className={`new-game-button ${showConfirm ? 'confirm' : ''}`}
        onClick={handleClick}
      >
        {showConfirm ? 'Подтвердить сброс' : 'Новая игра'}
      </button>
      {showConfirm && (
        <p className="new-game-warning">
          Нажмите еще раз для подтверждения
        </p>
      )}
    </div>
  );
}

