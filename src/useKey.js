import { useEffect } from "react";

export function useKey(key, action) {
  useEffect(
    function () {
      function handleKeyDown(event) {
        if (event.code?.toLowerCase() !== key.toLowerCase()) return;
        action(event);
      }

      document.addEventListener("keydown", handleKeyDown);

      return function () {
        document.removeEventListener("keydown", handleKeyDown);
      };
    },
    [action, key]
  );
}
