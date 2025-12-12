import { useMemo } from 'react';
import type { Card, CardStatus } from '../types';
import { getCardDisplayName } from '../lib/deck';
import './CardList.css';

interface CardListProps {
  cards: Card[];
  onCardStatusChange: (cardId: string, newStatus: CardStatus) => void;
}

/**
 * Компонент списка всех карт с возможностью изменения их статуса
 */
export function CardList({ cards, onCardStatusChange }: CardListProps) {
  // Группируем карты по мастям для удобного отображения
  const cardsBySuit = useMemo(() => {
    const grouped: Record<string, Card[]> = {
      spades: [],
      hearts: [],
      diamonds: [],
      clubs: [],
    };

    for (const card of cards) {
      grouped[card.suit].push(card);
    }

    // Сортируем карты в каждой масти по достоинству
    const ranks = ['9', '10', 'J', 'Q', 'K', 'A'];
    for (const suit of Object.keys(grouped)) {
      grouped[suit].sort(
        (a, b) => ranks.indexOf(a.rank) - ranks.indexOf(b.rank)
      );
    }

    return grouped;
  }, [cards]);

  const handleStatusClick = (card: Card, status: CardStatus) => {
    if (card.status !== status) {
      onCardStatusChange(card.id, status);
    }
  };

  const suitLabels: Record<string, string> = {
    spades: 'Пики ♠',
    hearts: 'Червы ♥',
    diamonds: 'Бубны ♦',
    clubs: 'Трефы ♣',
  };

  return (
    <div className="card-list">
      <h2 className="card-list-title">Все карты</h2>
      {Object.entries(cardsBySuit).map(([suit, suitCards]) => (
        <div key={suit} className="card-suit-group">
          <h3 className="card-suit-title">{suitLabels[suit]}</h3>
          <div className="card-suit-cards">
            {suitCards.map((card) => (
              <div key={card.id} className="card-item">
                <span className="card-name">{getCardDisplayName(card)}</span>
                <div className="card-buttons">
                  <button
                    className={`card-button ${
                      card.status === 'unknown' ? 'active' : ''
                    }`}
                    onClick={() => handleStatusClick(card, 'unknown')}
                    title="Неизвестно"
                  >
                    ?
                  </button>
                  <button
                    className={`card-button ${
                      card.status === 'played' ? 'active' : ''
                    }`}
                    onClick={() => handleStatusClick(card, 'played')}
                    title="Сыграна"
                  >
                    ✓
                  </button>
                  <button
                    className={`card-button ${
                      card.status === 'mine' ? 'active' : ''
                    }`}
                    onClick={() => handleStatusClick(card, 'mine')}
                    title="Моя"
                  >
                    👤
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

