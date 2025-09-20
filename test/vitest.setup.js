import { vi } from 'vitest';

// src/ShogiCross/core/json/xhr.js をモックする
// テスト環境では、xhr.js が常に空のjsonオブジェクトを返すようにする
vi.mock('../src/ShogiCross/core/json/xhr.js', () => {
  return {
    json: {}, // 空のオブジェクトを返す
  };
});