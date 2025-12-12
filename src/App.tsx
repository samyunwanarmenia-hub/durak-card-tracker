import { useState, useEffect, useCallback } from 'react';
import type { Card, CardStatus } from './types';
import { createDeck, updateCardStatus } from './lib/deck';
import { saveGameState, loadGameState, clearGameState } from './lib/storage';
import { CardList } from './components/CardList';
import { RemainingCards } from './components/RemainingCards';
import { NewGameButton } from './components/NewGameButton';
import './App.css';

/**
 * Главный компонент приложения
 */
function App() {
  const [cards, setCards] = useState<Card[]>(() => createDeck());
  const [isLoading, setIsLoading] = useState(true);

  // Загружаем сохраненное состояние при монтировании
  useEffect(() => {
    const loadState = async () => {
      try {
        const savedCards = await loadGameState();
        if (savedCards && savedCards.length > 0) {
          setCards(savedCards);
        }
      } catch (error) {
        console.error('Ошибка при загрузке состояния:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadState();
  }, []);

  // Автосохранение при изменении карт
  useEffect(() => {
    if (!isLoading) {
      const saveState = async () => {
        try {
          await saveGameState(cards);
        } catch (error) {
          console.error('Ошибка при сохранении состояния:', error);
        }
      };

      saveState();
    }
  }, [cards, isLoading]);

  // Обработчик изменения статуса карты
  const handleCardStatusChange = useCallback(
    (cardId: string, newStatus: CardStatus) => {
      setCards((prevCards) => updateCardStatus(prevCards, cardId, newStatus));
    },
    []
  );

  // Обработчик сброса игры
  const handleNewGame = useCallback(async () => {
    try {
      await clearGameState();
      setCards(createDeck());
    } catch (error) {
      console.error('Ошибка при сбросе игры:', error);
    }
  }, []);

  if (isLoading) {
    return (
      <div className="app-loading">
        <p>Загрузка...</p>
      </div>
    );
  }

  return (
    <div className="app">
      <header className="app-header">
        <h1>Трекер карт - Дурак</h1>
        <p className="app-subtitle">
          Отмечайте сыгранные карты и отслеживайте оставшиеся
        </p>
      </header>

      <main className="app-main">
        <NewGameButton onNewGame={handleNewGame} />
        <RemainingCards cards={cards} />
        <CardList cards={cards} onCardStatusChange={handleCardStatusChange} />
      </main>
    </div>
  );
}

export default App;

