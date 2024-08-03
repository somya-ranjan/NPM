import { useState, useEffect, useRef } from "react";

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
    loading: false,
    successMessage: null,
    errorMessage: null,
  });

  const abortControllerRef = useRef(null);
  const memoizedOptions = useRef(options);

  useEffect(() => {
    if (!url) return;

    abortControllerRef.current = new AbortController();

    const fetchData = async () => {
      setState((prevState) => ({
        ...prevState,
        loading: true,
      }));

      try {
        const response = await fetch(url, {
          ...memoizedOptions.current,
          method,
          signal: abortControllerRef.current.signal,
        });

        if (!response.ok) throw new Error("Network response was not ok");

        const json = await response.json();
        setState({
          data: json,
          error: null,
          loading: false,
          successMessage: "Data fetched successfully!",
          errorMessage: null,
        });
      } catch (error) {
        if (!abortControllerRef.current.signal.aborted) {
          setState({
            data: null,
            error,
            loading: false,
            successMessage: null,
            errorMessage: error.message,
          });
        }
      }
    };

    fetchData();

    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, [url, method]);

  return state;
}
