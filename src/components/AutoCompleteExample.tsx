// components/AutoCompleteExample.tsx
import React, { useState } from "react";
import AutoComplete from "./AutoComplete";

// Example fetch function to get suggestions from a server
const fetchServerSuggestions = async (input: string): Promise<string[]> => {
  // Simulate a fetch call
  const data = await new Promise<string[]>((resolve) => {
    setTimeout(() => {
      resolve([
        "Server Suggestion 1",
        "Server Suggestion 2",
        "Server Suggestion 3",
      ]);
    }, 500); // Simulate delay
  });
  return data;
};

const AutoCompleteExample: React.FC = () => {
  const [selectedSuggestion, setSelectedSuggestion] = useState("");

  const handleAutoCompleteSelect = (value: string) => {
    setSelectedSuggestion(value);
  };

  const localSuggestions = [
    "Local Suggestion A",
    "Local Suggestion B",
    "Local Suggestion C",
  ];

  return (
    <div>
      <h2>Auto-Complete with Debouncing</h2>
      <AutoComplete
        fetchSuggestions={fetchServerSuggestions}
        localSuggestions={localSuggestions}
        onSelect={handleAutoCompleteSelect}
        debounceDelay={300} // Set debounce delay in milliseconds
      />
      <p>Selected Suggestion: {selectedSuggestion}</p>
    </div>
  );
};

export default AutoCompleteExample;
