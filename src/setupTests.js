/* eslint-disable class-methods-use-this */
/* eslint-disable max-classes-per-file */
import { vi } from 'vitest';
import crypto from 'crypto';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

// Assign CanvasPattern to global
import { CanvasPattern } from 'canvas';

// -------------------
// Mock 'canvas' module
// -------------------
vi.mock('canvas', async () => {
  const original = await vi.importActual('canvas').catch(() => ({}));
  return {
    ...original,
    createCanvas: () => ({}),
    loadImage: async () => ({}),
    CanvasRenderingContext2D: class {},
    CanvasPattern: class {},
  };
});
global.CanvasPattern = CanvasPattern;

// -------------------
// Mock URL.createObjectURL
// -------------------
global.URL.createObjectURL = vi.fn(() => 'fooblob');

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
  value: (arr) => crypto.randomBytes(arr.length),
  writable: false,
});

// -------------------
// ResizeObserver mock
// -------------------
global.ResizeObserver = class {
  observe() {}

  unobserve() {}

  disconnect() {}
};
