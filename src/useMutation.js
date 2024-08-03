import { useState, useCallback } from "react";

/**
 * Custom hook for performing mutation operations (POST, PUT, DELETE).
 * @param {string} url - The API endpoint URL.
 * @param {string} [method="POST"] - HTTP method (default: POST).
 * @param {object} [options={}] - Additional fetch options.
 * @returns {object} - Mutation object containing mutate function, data, error, and loading status.
 */
export function useMutation(url, method = "POST", options = {}) {
  const [state, setState] = useState({
    data: null,
    error: null,
    loading: false,
    successMessage: null,
    errorMessage: null,
  });

  const mutate = useCallback(
    async (body = null) => {
      setState({
        data: null,
        error: null,
        loading: true,
        successMessage: null,
        errorMessage: null,
      });

      try {
        const response = await fetch(url, {
          method,
          headers: { "Content-Type": "application/json", ...options.headers },
          body: JSON.stringify(body),
          ...options,
        });

        if (!response.ok) throw new Error("Network response was not ok");

        const json = await response.json();
        setState({
          data: json,
          error: null,
          loading: false,
          successMessage: "Operation successful!",
          errorMessage: null,
        });
      } catch (error) {
        setState({
          data: null,
          error,
          loading: false,
          successMessage: null,
          errorMessage: error.message,
        });
      }
    },
    [url, method, options]
  );

  return { mutate, ...state };
}
