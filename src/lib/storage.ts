import { Preferences } from '@capacitor/preferences';
import type { Card } from '../types';

/**
 * Ключ для хранения состояния игры в Preferences
 */
const GAME_STATE_KEY = 'durak_game_state';

/**
 * Сохраняет состояние игры (массив карт) в локальное хранилище
 *
 * @param cards - Массив всех карт с их статусами
 * @returns Promise, который разрешается после сохранения
 */
export async function saveGameState(cards: Card[]): Promise<void> {
  try {
    const serialized = JSON.stringify(cards);
    await Preferences.set({
      key: GAME_STATE_KEY,
      value: serialized,
    });
  } catch (error) {
    console.error('Ошибка при сохранении состояния игры:', error);
    throw error;
  }
}

/**
 * Загружает состояние игры из локального хранилища
 *
 * @returns Promise с массивом карт или null, если состояние не найдено
 */
export async function loadGameState(): Promise<Card[] | null> {
  try {
    const result = await Preferences.get({ key: GAME_STATE_KEY });

    if (!result.value) {
      return null;
    }

    const cards = JSON.parse(result.value) as Card[];

    // Валидация загруженных данных
    if (!Array.isArray(cards)) {
      console.warn('Загруженные данные не являются массивом');
      return null;
    }

    return cards;
  } catch (error) {
    console.error('Ошибка при загрузке состояния игры:', error);
    return null;
  }
}

/**
 * Очищает сохраненное состояние игры
 *
 * @returns Promise, который разрешается после очистки
 */
export async function clearGameState(): Promise<void> {
  try {
    await Preferences.remove({ key: GAME_STATE_KEY });
  } catch (error) {
    console.error('Ошибка при очистке состояния игры:', error);
    throw error;
  }
}


