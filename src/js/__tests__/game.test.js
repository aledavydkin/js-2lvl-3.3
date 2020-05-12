import {
  describe, beforeEach, expect, jest,
} from '@jest/globals';
import fetchData from '../http';
import getLevel from '../app';

jest.mock('../http');

beforeEach(() => {
  jest.resetAllMocks();
});

describe('Проверка функции получения лвл', () => {
  test('Проверка на лвл', () => {
    fetchData.mockReturnValue(JSON.stringify({}));
    getLevel(1);
    expect(fetchData).toBeCalledWith('https://server/user/1');
  });

  test('Проверка на ответ', () => {
    fetchData.mockReturnValue({ status: 'ok', level: 15 });
    const answer = getLevel(15);
    expect(answer).toBe('Ваш текущий уровень: 15');
  });

  test('показывает статус', () => {
    fetchData.mockReturnValue({ status: 'not ok', level: 10 });
    const answer = getLevel(15);
    expect(answer).toBe('Информация об уровне временно недоступна');
  });
});
