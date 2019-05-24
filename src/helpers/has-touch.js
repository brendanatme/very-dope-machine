/**
 * has-touch
 *
 * determine if browser has touch or not
 */
let HAS_TOUCH = false;

const getTouch = () => {
  HAS_TOUCH = true;
  window.removeEventListener('touchstart', getTouch);
};

window.addEventListener('touchstart', getTouch);

export const hasTouch = () => HAS_TOUCH;
