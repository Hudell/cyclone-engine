export function throttle(fn, delay) {
  let timeout;
  let latestArgs;
  let needsCalling = false;

  const call = () => {
    timeout = setTimeout(() => {
      if (needsCalling) {
        call();
      } else {
        timeout = false;
      }
      needsCalling = false;
    }, delay);

    fn.call(this, ...latestArgs);
  };

  const debounced = function(...args) {
    latestArgs = args;
    if (timeout) {
      needsCalling = true;
      return;
    }

    call();
  };

  return debounced;
}
