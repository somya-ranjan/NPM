# React Utility Hooks Hub

![npm](https://img.shields.io/npm/v/react-utility-hooks-hub?color=blue) ![license](https://img.shields.io/badge/license-MIT-green) ![downloads](https://img.shields.io/npm/dt/react-utility-hooks)

**React Utility Hooks Hub** is a collection of reusable custom hooks for React applications. These hooks are designed to simplify common tasks and enhance the functionality of your React components.

## Table of Contents

- [Installation](#installation)
- [Available Hooks](#available-hooks)
  - [useDebounce](#usedebounce)
  - [useFetch](#usefetch)
  - [useMediaQuery](#usemediaquery)
  - [useMutation](#usemutation)
- [Example Usage](#example-usage)
  - [Search Component with useDebounce and useFetch](#search-component-with-usedebounce-and-usefetch)
  - [Responsive Component with useMediaQuery](#responsive-component-with-usemediaquery)
  - [Form Component with useMutation](#form-component-with-usemutation)
- [License](#license)
- [Additional Notes](#additional-notes)

## Installation

To install the package, use npm:

```bash
npm install react-utility-hooks-hub
```

## Available Hooks

### useDebounce

The `useDebounce` hook debounces a value, ensuring that it only updates after a specified delay. This is useful for preventing excessive API calls when a user types in an input field.

#### Usage

```javascript
import { useDebounce } from "react-utility-hooks-hub";

const debouncedValue = useDebounce(value, delay);
```

- **Parameters:**

  - `value`: The value to debounce.
  - `delay`: The delay in milliseconds for debouncing (default is 300ms).

- **Returns:**
  - `debouncedValue`: The debounced value.

### useFetch

The `useFetch` hook provides a simple way to fetch data from an API endpoint and manage loading and error states.

#### Usage

```javascript
import { useFetch } from "react-utility-hooks-hub";

const { data, error, loading, successMessage, errorMessage } = useFetch(
  url,
  method,
  options
);
```

- **Parameters:**

  - `url`: The API endpoint URL.
  - `method`: HTTP method (default is "GET").
  - `options`: Additional fetch options (optional).

- **Returns:**
  - `data`: The fetched data.
  - `error`: Any error that occurred during the fetch.
  - `loading`: A boolean indicating the loading state.
  - `successMessage`: A success message if the fetch was successful.
  - `errorMessage`: An error message if the fetch failed.

### useMediaQuery

The `useMediaQuery` hook checks if a media query matches the current viewport size, allowing you to build responsive components.

#### Usage

```javascript
import { useMediaQuery } from "react-utility-hooks-hub";

const matches = useMediaQuery(query);
```

- **Parameters:**

  - `query`: The media query to evaluate.

- **Returns:**
  - `matches`: A boolean indicating if the query matches.

### useMutation

The `useMutation` hook provides a way to perform mutation operations (such as POST, PUT, DELETE) and manage loading and error states.

#### Usage

```javascript
import { useMutation } from "react-utility-hooks-hub";

const { mutate, data, error, loading, successMessage, errorMessage } =
  useMutation(url, method, options);

// Call mutate function with request body
mutate(body);
```

- **Parameters:**

  - `url`: The API endpoint URL.
  - `method`: HTTP method (default is "POST").
  - `options`: Additional fetch options (optional).

- **Returns:**
  - `mutate`: Function to perform the mutation.
  - `data`: The response data from the mutation.
  - `error`: Any error that occurred during the mutation.
  - `loading`: A boolean indicating the loading state.
  - `successMessage`: A success message if the mutation was successful.
  - `errorMessage`: An error message if the mutation failed.

## Example Usage

### Search Component with useDebounce and useFetch

Below is an example of a search component that uses the `useDebounce` and `useFetch` hooks to perform a search query with debounced input.

#### Code Example

```jsx
import React, { useState } from "react";
import { useDebounce, useFetch } from "react-utility-hooks-hub";

const SearchComponent = () => {
  const [query, setQuery] = useState("");
  const debouncedQuery = useDebounce(query, 500); // Debounce the search query by 500ms

  // Fetch data from the search API using the debounced query
  const { data, error, loading } = useFetch(
    `https://api.example.com/search?query=${debouncedQuery}`,
    "GET"
  );

  const handleInputChange = (event) => {
    setQuery(event.target.value);
  };

  return (
    <div>
      <h2>Search</h2>
      <input
        type="text"
        value={query}
        onChange={handleInputChange}
        placeholder="Search..."
      />

      {loading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}
      {data && (
        <ul>
          {data.results.map((item, index) => (
            <li key={index}>{item.name}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchComponent;
```

#### Explanation

- **Debouncing Input**: The `useDebounce` hook is used to debounce the search query, reducing the number of API requests made as the user types.

- **Fetching Data**: The `useFetch` hook handles the API call, returning data, error, and loading states.

- **Displaying Results**: The component conditionally renders a loading message, error message, or search results based on the state.

- **API Endpoint**: Replace `https://api.example.com/search` with the actual API endpoint you intend to use.

### Responsive Component with useMediaQuery

Below is an example of a responsive component that uses the `useMediaQuery` hook to conditionally render content based on the screen size.

#### Code Example

```jsx
import React from "react";
import { useMediaQuery } from "react-utility-hooks-hub";

const ResponsiveComponent = () => {
  // Check if the screen width is at least 768px (tablet or desktop)
  const isTabletOrDesktop = useMediaQuery("(min-width: 768px)");

  return (
    <div>
      <h2>Responsive Component</h2>
      {isTabletOrDesktop ? (
        <p>This content is visible on tablet and desktop screens.</p>
      ) : (
        <p>This content is visible on mobile screens.</p>
      )}
    </div>
  );
};

export default ResponsiveComponent;
```

#### Explanation

- **Media Query Evaluation**: The `useMediaQuery` hook is used to check if the screen width is at least 768px.
- **Conditional Rendering**: The component conditionally renders different content based on the result of the media query.

### Form Component with useMutation

Below is an example of a form component that uses the `useMutation` hook to submit data to an API.

#### Code Example

```jsx
import React, { useState } from "react";
import { useMutation } from "react-utility-hooks-hub";

const FormComponent = () => {
  const [inputValue, setInputValue] = useState("");
  const { mutate, data, error, loading, successMessage, errorMessage } =
    useMutation("https://api.example.com/submit", "POST");

  const handleSubmit = async (event) => {
    event.preventDefault();
    await mutate({ value: inputValue });
  };

  return (
    <div>
      <h2>Submit Form</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Enter value..."
        />
        <button type="submit" disabled={loading}>
          {loading ? "Submitting..." : "Submit"}
        </button>
      </form>

      {successMessage && <p>Success: {successMessage}</p>}
      {error && <p>Error: {errorMessage}</p>}
      {data && <p>Response: {JSON.stringify(data)}</p>}
    </div>
  );
};

export default FormComponent;
```

#### Explanation

- **Form Submission**: The `useMutation` hook is used to submit data to an API endpoint.
- **Handling Responses**: The component displays success, error, or response messages based on the result of the mutation.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Additional Notes

- **Media Queries**: You can adjust the media query strings in `useMediaQuery` to match your specific responsive design needs.
- **CSS Frameworks**: If you're using CSS frameworks like Bootstrap or Tailwind CSS, you can combine these hooks with classes from those frameworks for more complex responsive designs.
