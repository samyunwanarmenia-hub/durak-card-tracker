import { describe, it, expect } from 'vitest';
import {
  createDeck,
  getRemainingCards,
  getCardDisplayName,
  getCardFullName,
  groupCardsBySuit,
  updateCardStatus,
  SUIT_SYMBOLS,
  SUIT_NAMES,
  RANK_NAMES,
} from '../deck';
import type { Card, CardStatus } from '../../types';

describe('deck.ts', () => {
  describe('createDeck', () => {
    it('должна создавать колоду из 24 карт', () => {
      const deck = createDeck();
      expect(deck).toHaveLength(24);
    });

    it('должна содержать все 4 масти', () => {
      const deck = createDeck();
      const suits = new Set(deck.map((card) => card.suit));
      expect(suits.size).toBe(4);
      expect(suits.has('spades')).toBe(true);
      expect(suits.has('hearts')).toBe(true);
      expect(suits.has('diamonds')).toBe(true);
      expect(suits.has('clubs')).toBe(true);
    });

    it('должна содержать все 6 достоинств для каждой масти', () => {
      const deck = createDeck();
      const ranks = ['9', '10', 'J', 'Q', 'K', 'A'];
      
      for (const suit of ['spades', 'hearts', 'diamonds', 'clubs']) {
        const suitCards = deck.filter((card) => card.suit === suit);
        expect(suitCards).toHaveLength(6);
        
        const suitRanks = new Set(suitCards.map((card) => card.rank));
        for (const rank of ranks) {
          expect(suitRanks.has(rank as any)).toBe(true);
        }
      }
    });

    it('все карты должны иметь статус unknown по умолчанию', () => {
      const deck = createDeck();
      for (const card of deck) {
        expect(card.status).toBe('unknown');
      }
    });

    it('каждая карта должна иметь уникальный id', () => {
      const deck = createDeck();
      const ids = deck.map((card) => card.id);
      const uniqueIds = new Set(ids);
      expect(uniqueIds.size).toBe(24);
    });

    it('id карты должен быть в формате suit-rank', () => {
      const deck = createDeck();
      for (const card of deck) {
        expect(card.id).toBe(`${card.suit}-${card.rank}`);
      }
    });
  });

  describe('getRemainingCards', () => {
    it('должна возвращать все карты, если все имеют статус unknown', () => {
      const deck = createDeck();
      const remaining = getRemainingCards(deck);
      expect(remaining).toHaveLength(24);
    });

    it('должна исключать карты со статусом played', () => {
      const deck = createDeck();
      deck[0].status = 'played';
      deck[1].status = 'played';
      
      const remaining = getRemainingCards(deck);
      expect(remaining).toHaveLength(22);
      expect(remaining.every((card) => card.status !== 'played')).toBe(true);
    });

    it('должна исключать карты со статусом mine', () => {
      const deck = createDeck();
      deck[0].status = 'mine';
      deck[1].status = 'mine';
      
      const remaining = getRemainingCards(deck);
      expect(remaining).toHaveLength(22);
      expect(remaining.every((card) => card.status !== 'mine')).toBe(true);
    });

    it('должна исключать карты со статусами played и mine', () => {
      const deck = createDeck();
      deck[0].status = 'played';
      deck[1].status = 'mine';
      deck[2].status = 'played';
      
      const remaining = getRemainingCards(deck);
      expect(remaining).toHaveLength(21);
      expect(remaining.every((card) => 
        card.status !== 'played' && card.status !== 'mine'
      )).toBe(true);
    });

    it('должна возвращать пустой массив, если все карты сыграны или у игрока', () => {
      const deck = createDeck();
      for (let i = 0; i < 12; i++) {
        deck[i].status = 'played';
      }
      for (let i = 12; i < 24; i++) {
        deck[i].status = 'mine';
      }
      
      const remaining = getRemainingCards(deck);
      expect(remaining).toHaveLength(0);
    });
  });

  describe('getCardDisplayName', () => {
    it('должна возвращать название карты с символом масти', () => {
      const card: Card = {
        id: 'spades-9',
        suit: 'spades',
        rank: '9',
        status: 'unknown',
      };
      
      expect(getCardDisplayName(card)).toBe('9♠');
    });

    it('должна корректно отображать все масти', () => {
      const suits: Array<'spades' | 'hearts' | 'diamonds' | 'clubs'> = 
        ['spades', 'hearts', 'diamonds', 'clubs'];
      const symbols = ['♠', '♥', '♦', '♣'];
      
      for (let i = 0; i < suits.length; i++) {
        const card: Card = {
          id: `${suits[i]}-9`,
          suit: suits[i],
          rank: '9',
          status: 'unknown',
        };
        
        expect(getCardDisplayName(card)).toBe(`9${symbols[i]}`);
      }
    });
  });

  describe('getCardFullName', () => {
    it('должна возвращать полное название карты на русском', () => {
      const card: Card = {
        id: 'spades-9',
        suit: 'spades',
        rank: '9',
        status: 'unknown',
      };
      
      expect(getCardFullName(card)).toBe('9 Пики');
    });

    it('должна корректно отображать достоинства на русском', () => {
      const card: Card = {
        id: 'hearts-J',
        suit: 'hearts',
        rank: 'J',
        status: 'unknown',
      };
      
      expect(getCardFullName(card)).toBe('Валет Червы');
    });
  });

  describe('groupCardsBySuit', () => {
    it('должна группировать карты по мастям', () => {
      const deck = createDeck();
      const grouped = groupCardsBySuit(deck);
      
      expect(grouped.spades).toHaveLength(6);
      expect(grouped.hearts).toHaveLength(6);
      expect(grouped.diamonds).toHaveLength(6);
      expect(grouped.clubs).toHaveLength(6);
    });

    it('должна возвращать пустые массивы для мастей без карт', () => {
      const cards: Card[] = [
        {
          id: 'spades-9',
          suit: 'spades',
          rank: '9',
          status: 'unknown',
        },
      ];
      
      const grouped = groupCardsBySuit(cards);
      expect(grouped.spades).toHaveLength(1);
      expect(grouped.hearts).toHaveLength(0);
      expect(grouped.diamonds).toHaveLength(0);
      expect(grouped.clubs).toHaveLength(0);
    });
  });

  describe('updateCardStatus', () => {
    it('должна обновлять статус указанной карты', () => {
      const deck = createDeck();
      const cardId = deck[0].id;
      const newStatus: CardStatus = 'played';
      
      const updated = updateCardStatus(deck, cardId, newStatus);
      
      expect(updated[0].status).toBe(newStatus);
      expect(updated[0].id).toBe(cardId);
    });

    it('не должна изменять другие карты', () => {
      const deck = createDeck();
      const originalDeck = [...deck];
      const cardId = deck[5].id;
      
      const updated = updateCardStatus(deck, cardId, 'played');
      
      for (let i = 0; i < updated.length; i++) {
        if (i !== 5) {
          expect(updated[i]).toEqual(originalDeck[i]);
        }
      }
    });

    it('должна возвращать новый массив, не изменяя исходный', () => {
      const deck = createDeck();
      const originalDeck = [...deck];
      
      const updated = updateCardStatus(deck, deck[0].id, 'played');
      
      expect(updated).not.toBe(deck);
      expect(deck[0].status).toBe('unknown');
      expect(updated[0].status).toBe('played');
    });

    it('должна корректно обрабатывать несуществующий cardId', () => {
      const deck = createDeck();
      const updated = updateCardStatus(deck, 'non-existent-id', 'played');
      
      expect(updated).toHaveLength(24);
      expect(updated.every((card) => card.status === 'unknown')).toBe(true);
    });
  });

  describe('Константы', () => {
    it('SUIT_SYMBOLS должен содержать символы для всех мастей', () => {
      expect(SUIT_SYMBOLS.spades).toBe('♠');
      expect(SUIT_SYMBOLS.hearts).toBe('♥');
      expect(SUIT_SYMBOLS.diamonds).toBe('♦');
      expect(SUIT_SYMBOLS.clubs).toBe('♣');
    });

    it('SUIT_NAMES должен содержать названия всех мастей на русском', () => {
      expect(SUIT_NAMES.spades).toBe('Пики');
      expect(SUIT_NAMES.hearts).toBe('Червы');
      expect(SUIT_NAMES.diamonds).toBe('Бубны');
      expect(SUIT_NAMES.clubs).toBe('Трефы');
    });

    it('RANK_NAMES должен содержать названия всех достоинств на русском', () => {
      expect(RANK_NAMES['9']).toBe('9');
      expect(RANK_NAMES['10']).toBe('10');
      expect(RANK_NAMES['J']).toBe('Валет');
      expect(RANK_NAMES['Q']).toBe('Дама');
      expect(RANK_NAMES['K']).toBe('Король');
      expect(RANK_NAMES['A']).toBe('Туз');
    });
  });
});

