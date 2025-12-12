import type { Card, Suit, Rank, CardStatus } from '../types';

/**
 * Все возможные масти в колоде
 */
const SUITS: Suit[] = ['spades', 'hearts', 'diamonds', 'clubs'];

/**
 * Все возможные достоинства в укороченной колоде
 */
const RANKS: Rank[] = ['9', '10', 'J', 'Q', 'K', 'A'];

/**
 * Символы мастей для отображения
 */
export const SUIT_SYMBOLS: Record<Suit, string> = {
  spades: '♠',
  hearts: '♥',
  diamonds: '♦',
  clubs: '♣',
};

/**
 * Названия мастей на русском
 */
export const SUIT_NAMES: Record<Suit, string> = {
  spades: 'Пики',
  hearts: 'Червы',
  diamonds: 'Бубны',
  clubs: 'Трефы',
};

/**
 * Названия достоинств на русском
 */
export const RANK_NAMES: Record<Rank, string> = {
  '9': '9',
  '10': '10',
  'J': 'Валет',
  'Q': 'Дама',
  'K': 'Король',
  'A': 'Туз',
};

/**
 * Создает полную колоду из 24 карт (4 масти × 6 достоинств)
 * Все карты имеют статус 'unknown' по умолчанию
 *
 * @returns Массив всех карт колоды
 */
export function createDeck(): Card[] {
  const deck: Card[] = [];

  for (const suit of SUITS) {
    for (const rank of RANKS) {
      deck.push({
        id: `${suit}-${rank}`,
        suit,
        rank,
        status: 'unknown',
      });
    }
  }

  return deck;
}

/**
 * Вычисляет карты, которые теоретически остались в игре
 * (не были сыграны и не находятся у пользователя)
 *
 * @param cards - Массив всех карт колоды с их статусами
 * @returns Массив оставшихся карт
 */
export function getRemainingCards(cards: Card[]): Card[] {
  return cards.filter(
    (card) => card.status !== 'played' && card.status !== 'mine'
  );
}

/**
 * Получает отображаемое название карты
 *
 * @param card - Карта
 * @returns Строка вида "9♠" или "Валет♥"
 */
export function getCardDisplayName(card: Card): string {
  const symbol = SUIT_SYMBOLS[card.suit];
  return `${card.rank}${symbol}`;
}

/**
 * Получает полное название карты на русском
 *
 * @param card - Карта
 * @returns Строка вида "9 Пики" или "Валет Червы"
 */
export function getCardFullName(card: Card): string {
  const rankName = RANK_NAMES[card.rank];
  const suitName = SUIT_NAMES[card.suit];
  return `${rankName} ${suitName}`;
}

/**
 * Группирует карты по мастям
 *
 * @param cards - Массив карт
 * @returns Объект с картами, сгруппированными по мастям
 */
export function groupCardsBySuit(cards: Card[]): Record<Suit, Card[]> {
  const grouped: Record<Suit, Card[]> = {
    spades: [],
    hearts: [],
    diamonds: [],
    clubs: [],
  };

  for (const card of cards) {
    grouped[card.suit].push(card);
  }

  return grouped;
}

/**
 * Обновляет статус карты в массиве
 *
 * @param cards - Массив всех карт
 * @param cardId - ID карты для обновления
 * @param newStatus - Новый статус карты
 * @returns Новый массив карт с обновленным статусом
 */
export function updateCardStatus(
  cards: Card[],
  cardId: string,
  newStatus: CardStatus
): Card[] {
  return cards.map((card) =>
    card.id === cardId ? { ...card, status: newStatus } : card
  );
}


