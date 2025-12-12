/**
 * Масти карт в колоде
 */
export type Suit = 'spades' | 'hearts' | 'diamonds' | 'clubs';

/**
 * Достоинства карт в укороченной колоде (24 карты)
 */
export type Rank = '9' | '10' | 'J' | 'Q' | 'K' | 'A';

/**
 * Статус карты в игре
 * - unknown: карта еще не определена (по умолчанию)
 * - played: карта была сыграна/ушла в бито
 * - mine: карта пользователя (в его руке)
 */
export type CardStatus = 'unknown' | 'played' | 'mine';

/**
 * Карта в колоде
 */
export interface Card {
  /** Уникальный идентификатор карты */
  id: string;
  /** Масть карты */
  suit: Suit;
  /** Достоинство карты */
  rank: Rank;
  /** Текущий статус карты */
  status: CardStatus;
}


