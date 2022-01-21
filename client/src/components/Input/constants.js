export const UP = 'w';
export const DOWN = 's';
export const LEFT = 'a';
export const RIGHT = 'd';

export const VERTICAL = 'z';
export const HORIZONTAL = 'x';

export const inputToAxisMapping = {
  [UP]: {
    axis: VERTICAL,
    direction: -1
  },
  [DOWN]: {
    axis: VERTICAL,
    direction: 1
  },
  [LEFT]: {
    axis: HORIZONTAL,
    direction: 1
  },
  [RIGHT]: {
    axis: HORIZONTAL,
    direction: -1
  }
};
