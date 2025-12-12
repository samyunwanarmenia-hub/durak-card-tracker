import { useMemo } from 'react';
import type { Card } from '../types';
import { getCardDisplayName, groupCardsBySuit, SUIT_NAMES } from '../lib/deck';
import './RemainingCards.css';

interface RemainingCardsProps {
  cards: Card[];
}

/**
 * Компонент отображения теоретически оставшихся карт
 */
export function RemainingCards({ cards }: RemainingCardsProps) {
  const remainingCards = useMemo(() => {
    return cards.filter(
      (card) => card.status !== 'played' && card.status !== 'mine'
    );
  }, [cards]);

  const groupedBySuit = useMemo(() => {
    return groupCardsBySuit(remainingCards);
  }, [remainingCards]);

  const totalRemaining = remainingCards.length;

  if (totalRemaining === 0) {
    return (
      <div className="remaining-cards">
        <h2 className="remaining-cards-title">
          Оставшиеся карты: {totalRemaining}
        </h2>
        <p className="remaining-cards-empty">
          Все карты либо сыграны, либо у вас в руке
        </p>
      </div>
    );
  }

  return (
    <div className="remaining-cards">
      <h2 className="remaining-cards-title">
        Оставшиеся карты: {totalRemaining}
      </h2>
      <div className="remaining-cards-content">
        {Object.entries(groupedBySuit).map(([suit, suitCards]) => {
          if (suitCards.length === 0) {
            return null;
          }

          return (
            <div key={suit} className="remaining-suit-group">
              <h3 className="remaining-suit-title">
                {SUIT_NAMES[suit as keyof typeof SUIT_NAMES]} ({suitCards.length})
              </h3>
              <div className="remaining-suit-cards">
                {suitCards.map((card) => (
                  <span key={card.id} className="remaining-card">
                    {getCardDisplayName(card)}
                  </span>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}


