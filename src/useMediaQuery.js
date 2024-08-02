import { useState, useEffect } from "react";

/**
 * Custom hook to determine if a media query matches.
 * @param {string} query - The media query to evaluate.
 * @returns {boolean} - Boolean indicating if the query matches.
 */
export function useMediaQuery(query) {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia(query);
    setMatches(mediaQuery.matches);

    const handler = (event) => setMatches(event.matches);
    mediaQuery.addEventListener("change", handler); // Use addEventListener
    return () => mediaQuery.removeEventListener("change", handler); // Use removeEventListener
  }, [query]);

  return matches;
}
