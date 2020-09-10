export function debounce(fn, delay) {
  let clearTimer;
  return function(...args) {
    const context = this;
    clearTimeout(clearTimer);
    clearTimer = setTimeout(() => fn.call(context, ...args), delay);
  };
}

