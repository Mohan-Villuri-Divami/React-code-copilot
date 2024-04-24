// components/AutoComplete.tsx
import React, { useState, useEffect, useRef } from "react";
import { debounce } from "lodash";

interface AutoCompleteProps {
  fetchSuggestions?: (input: string) => Promise<string[]>; // Function to fetch suggestions
  localSuggestions?: string[]; // Local suggestions
  onSelect: (selectedValue: string) => void; // Callback when a suggestion is selected
  debounceDelay?: number; // Optional debounce delay in milliseconds
}

const AutoComplete: React.FC<AutoCompleteProps> = ({
  fetchSuggestions,
  localSuggestions,
  onSelect,
  debounceDelay = 300, // Default debounce delay (300 ms)
}) => {
  const [inputValue, setInputValue] = useState("");
  const [filteredSuggestions, setFilteredSuggestions] = useState<string[]>([]);
  const [isFocused, setIsFocused] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);

  const debounceFetch = useRef(
    debounce(async (input: string) => {
      let suggestions = localSuggestions || [];

      if (fetchSuggestions) {
        const fetchedSuggestions = await fetchSuggestions(input);
        suggestions = suggestions.concat(fetchedSuggestions);
      }

      const filtered = suggestions.filter((suggestion) =>
        suggestion.toLowerCase().includes(input.toLowerCase())
      );

      setFilteredSuggestions(filtered);
    }, debounceDelay)
  ).current;

  useEffect(() => {
    if (inputValue) {
      debounceFetch(inputValue); // Call the debounced function
    } else {
      setFilteredSuggestions([]);
    }
  }, [inputValue]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    setHighlightedIndex(-1); // Reset highlight on input change
  };

  const handleSuggestionClick = (suggestion: string) => {
    setInputValue(suggestion);
    onSelect(suggestion);
    setIsFocused(false); // Close the suggestion list
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isFocused) return;

    switch (e.key) {
      case "ArrowDown":
        setHighlightedIndex((prev) =>
          Math.min(prev + 1, filteredSuggestions.length - 1)
        );
        break;
      case "ArrowUp":
        setHighlightedIndex((prev) => Math.max(prev - 1, 0));
        break;
      case "Enter":
        if (highlightedIndex >= 0) {
          handleSuggestionClick(filteredSuggestions[highlightedIndex]);
        }
        break;
      default:
        break;
    }
  };

  return (
    <div style={{ position: "relative" }}>
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setTimeout(() => setIsFocused(false), 100)} // Close with delay to allow interaction
        onKeyDown={handleKeyDown}
      />
      {isFocused && filteredSuggestions.length > 0 && (
        <ul
          style={{
            listStyleType: "none",
            padding: "0",
            margin: "0",
            position: "absolute",
            top: "100%",
            left: "0",
            right: "0",
            border: "1px solid #ccc",
            backgroundColor: "white",
            zIndex: "1000",
          }}
        >
          {filteredSuggestions.map((suggestion, index) => (
            <li
              key={index}
              onMouseDown={() => handleSuggestionClick(suggestion)}
              style={{
                padding: "5px",
                cursor: "pointer",
                backgroundColor: highlightedIndex === index ? "#ddd" : "white", // Highlight
                borderBottom: "1px solid #ddd",
              }}
            >
              {suggestion}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AutoComplete;
