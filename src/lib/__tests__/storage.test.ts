import { describe, it, expect, beforeEach, vi } from 'vitest';
import { Preferences } from '@capacitor/preferences';
import { saveGameState, loadGameState, clearGameState } from '../storage';
import type { Card } from '../../types';

// Мокаем Capacitor Preferences
vi.mock('@capacitor/preferences', () => ({
  Preferences: {
    set: vi.fn(),
    get: vi.fn(),
    remove: vi.fn(),
  },
}));

describe('storage.ts', () => {
  const mockCards: Card[] = [
    {
      id: 'spades-9',
      suit: 'spades',
      rank: '9',
      status: 'unknown',
    },
    {
      id: 'hearts-10',
      suit: 'hearts',
      rank: '10',
      status: 'played',
    },
    {
      id: 'diamonds-J',
      suit: 'diamonds',
      rank: 'J',
      status: 'mine',
    },
  ];

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('saveGameState', () => {
    it('должна сохранять состояние игры в Preferences', async () => {
      const setSpy = vi.spyOn(Preferences, 'set').mockResolvedValue(undefined);

      await saveGameState(mockCards);

      expect(setSpy).toHaveBeenCalledTimes(1);
      expect(setSpy).toHaveBeenCalledWith({
        key: 'durak_game_state',
        value: JSON.stringify(mockCards),
      });
    });

    it('должна корректно сериализовать массив карт', async () => {
      const setSpy = vi.spyOn(Preferences, 'set').mockResolvedValue(undefined);

      await saveGameState(mockCards);

      const callArgs = setSpy.mock.calls[0][0];
      const parsedValue = JSON.parse(callArgs.value);
      expect(parsedValue).toEqual(mockCards);
    });

    it('должна выбрасывать ошибку при неудачном сохранении', async () => {
      const error = new Error('Ошибка сохранения');
      vi.spyOn(Preferences, 'set').mockRejectedValue(error);

      await expect(saveGameState(mockCards)).rejects.toThrow('Ошибка сохранения');
    });
  });

  describe('loadGameState', () => {
    it('должна загружать состояние игры из Preferences', async () => {
      const serialized = JSON.stringify(mockCards);
      vi.spyOn(Preferences, 'get').mockResolvedValue({
        value: serialized,
      });

      const result = await loadGameState();

      expect(result).toEqual(mockCards);
    });

    it('должна возвращать null, если состояние не найдено', async () => {
      vi.spyOn(Preferences, 'get').mockResolvedValue({
        value: null,
      });

      const result = await loadGameState();

      expect(result).toBeNull();
    });

    it('должна возвращать null, если значение пустое', async () => {
      vi.spyOn(Preferences, 'get').mockResolvedValue({
        value: '',
      });

      const result = await loadGameState();

      expect(result).toBeNull();
    });

    it('должна возвращать null при невалидных данных (не массив)', async () => {
      vi.spyOn(Preferences, 'get').mockResolvedValue({
        value: JSON.stringify({ notAnArray: true }),
      });

      const result = await loadGameState();

      expect(result).toBeNull();
    });

    it('должна возвращать null при ошибке парсинга JSON', async () => {
      vi.spyOn(Preferences, 'get').mockResolvedValue({
        value: 'invalid json',
      });

      const result = await loadGameState();

      expect(result).toBeNull();
    });

    it('должна возвращать null при ошибке загрузки', async () => {
      const error = new Error('Ошибка загрузки');
      vi.spyOn(Preferences, 'get').mockRejectedValue(error);

      const result = await loadGameState();

      expect(result).toBeNull();
    });

    it('должна корректно десериализовать сохраненные карты', async () => {
      const fullDeck: Card[] = Array.from({ length: 24 }, (_, i) => ({
        id: `card-${i}`,
        suit: 'spades',
        rank: '9',
        status: 'unknown',
      }));

      vi.spyOn(Preferences, 'get').mockResolvedValue({
        value: JSON.stringify(fullDeck),
      });

      const result = await loadGameState();

      expect(result).toHaveLength(24);
      expect(result).toEqual(fullDeck);
    });
  });

  describe('clearGameState', () => {
    it('должна удалять сохраненное состояние из Preferences', async () => {
      const removeSpy = vi.spyOn(Preferences, 'remove').mockResolvedValue(undefined);

      await clearGameState();

      expect(removeSpy).toHaveBeenCalledTimes(1);
      expect(removeSpy).toHaveBeenCalledWith({
        key: 'durak_game_state',
      });
    });

    it('должна выбрасывать ошибку при неудачном удалении', async () => {
      const error = new Error('Ошибка удаления');
      vi.spyOn(Preferences, 'remove').mockRejectedValue(error);

      await expect(clearGameState()).rejects.toThrow('Ошибка удаления');
    });
  });

  describe('Интеграция save/load', () => {
    it('должна корректно сохранять и загружать состояние', async () => {
      let savedValue: string | null = null;

      vi.spyOn(Preferences, 'set').mockImplementation(async (options) => {
        savedValue = options.value;
      });

      vi.spyOn(Preferences, 'get').mockImplementation(async () => {
        return { value: savedValue };
      });

      await saveGameState(mockCards);
      const loaded = await loadGameState();

      expect(loaded).toEqual(mockCards);
    });

    it('должна корректно очищать и загружать пустое состояние', async () => {
      let savedValue: string | null = null;

      vi.spyOn(Preferences, 'set').mockImplementation(async (options) => {
        savedValue = options.value;
      });

      vi.spyOn(Preferences, 'get').mockImplementation(async () => {
        return { value: savedValue };
      });

      vi.spyOn(Preferences, 'remove').mockImplementation(async () => {
        savedValue = null;
      });

      await saveGameState(mockCards);
      await clearGameState();
      const loaded = await loadGameState();

      expect(loaded).toBeNull();
    });
  });
});


