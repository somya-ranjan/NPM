import { useState, useEffect } from "react";

/**
 * Custom hook to fetch data from an API endpoint.
 * @param {string} url - The API endpoint URL.
 * @param {string} [method="GET"] - HTTP method (default: GET).
 * @param {object} [options={}] - Additional fetch options.
 * @returns {object} - FetchState object containing data, error, loading status, success message, and error message.
 */
export function useFetch(url, method = "GET", options = {}) {
  const [state, setState] = useState({
    data: null,
    error: null,
    loading: true,
    successMessage: null,
    errorMessage: null,
  });

  useEffect(() => {
    const abortController = new AbortController(); // Create an AbortController

    const fetchData = async () => {
      setState({
        data: null,
        error: null,
        loading: true,
        successMessage: null,
        errorMessage: null,
      }); // Reset state before fetching
      try {
        const response = await fetch(url, {
          ...options,
          method, // Add the HTTP method
          signal: abortController.signal, // Pass abort signal
        });

        if (!response.ok) throw new Error("Network response was not ok");

        const json = await response.json();
        setState({
          data: json,
          error: null,
          loading: false,
          successMessage: "Data fetched successfully!",
        });
      } catch (error) {
        if (!abortController.signal.aborted) {
          // Ignore errors caused by aborting
          setState({
            data: null,
            error,
            loading: false,
            errorMessage: error.message,
          });
        }
      }
    };

    fetchData();

    return () => {
      abortController.abort(); // Cleanup: abort ongoing request
    };
  }, [url, method, options]);

  return state;
}
