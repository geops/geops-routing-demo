import crypto from 'crypto';

// Assign CanvasPattern to global
import { CanvasPattern } from 'canvas';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { vi } from 'vitest';

// -------------------
// Mock 'canvas' module
// -------------------
vi.mock('canvas', async () => {
  const original = await vi.importActual('canvas').catch(() => {
    return {};
  });
  return {
    ...original,
    CanvasPattern: class {},
    CanvasRenderingContext2D: class {},
    createCanvas: () => {
      return {};
    },
    loadImage: async () => {
      return {};
    },
  };
});
global.CanvasPattern = CanvasPattern;

// -------------------
// Mock URL.createObjectURL
// -------------------
global.URL.createObjectURL = vi.fn(() => {
  return 'fooblob';
});

// -------------------
// Redux mock store
// -------------------
global.mockStore = configureStore([thunk]);

// -------------------
// Crypto mock (safe for JSDOM)
// -------------------
if (typeof global.crypto === 'undefined') {
  global.crypto = {};
}

Object.defineProperty(global.crypto, 'getRandomValues', {
  value: (arr) => {
    return crypto.randomBytes(arr.length);
  },
  writable: false,
});

// -------------------
// ResizeObserver mock
// -------------------
global.ResizeObserver = class {
  disconnect() {}

  observe() {}

  unobserve() {}
};
