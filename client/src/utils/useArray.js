import { useState } from "react";

export default function useArray(defaultValue) {
  const [array, setArray] = useState(defaultValue);

  function push(element) {
    setArray((a) => [...a, element]);
  }
  function lpush(element) {
    setArray((a) => [element, ...a]);
  }
  function filter(callback) {
    setArray((a) => a.filter(callback));
  }

  function update(index, newElement) {
    setArray((a) => [
      ...a.slice(0, index),
      newElement,
      ...a.slice(index + 1, a.length),
    ]);
  }

  function remove(index) {
    setArray((a) => [...a.slice(0, index), ...a.slice(index + 1, a.length)]);
  }

  function clear() {
    setArray([]);
  }

  return { array, set: setArray, push, lpush, filter, update, remove, clear };
}
