import React, { useState, useRef } from "react";
import { MultiSelect } from "primereact/multiselect";
import { MultiSelectChangeEvent } from "primereact/multiselect";
import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";

import "./CustomMultiSelect.css";

interface MovieOption {
  title: string;
  year: number;
}

const top100Films: MovieOption[] = [
  { title: "The Shawshank Redemption", year: 1994 },
  { title: "The Godfather", year: 1972 },
  { title: "The Godfather: Part II", year: 1974 },
  { title: "The Dark Knight", year: 2008 },
  { title: "12 Angry Men", year: 1957 },
  { title: "Schindler's List", year: 1993 },
  { title: "Pulp Fiction", year: 1994 },
  { title: "The Lord of the Rings: The Return of the King", year: 2003 },
  { title: "The Good, the Bad and the Ugly", year: 1966 },
  { title: "Fight Club", year: 1999 },
  // Add more movies as needed
];

const CustomMultiSelect: React.FC = () => {
  const [selectedMovies, setSelectedMovies] = useState<MovieOption[]>([]);
  const multiSelectRef = useRef<MultiSelect>(null);

  const onChange = (e: MultiSelectChangeEvent) => {
    setSelectedMovies(e.value as MovieOption[]);
  };

  // Custom template for displaying selected items
  const selectedItemTemplate = (option: MovieOption | undefined) => {
    if (!option) return null;

    const displayCount = 2;
    const index = selectedMovies.indexOf(option);

    // Display the first two selected items
    if (index < displayCount) {
      return <span className="custom-chip">{option.title}</span>;
    }

    // Display "+X" for remaining items if the current item is the third one
    if (index === displayCount) {
      return (
        <span className="custom-chip count-chip">
          +{selectedMovies.length - displayCount}
        </span>
      );
    }

    return null; // Skip rendering for items beyond the display limit
  };

  const handleFocus = () => {
    if (multiSelectRef.current) {
      multiSelectRef.current.show();
    }
  };

  return (
    <div style={{ width: "500px" }}>
      <MultiSelect
        ref={multiSelectRef}
        value={selectedMovies}
        options={top100Films}
        onChange={onChange}
        optionLabel="title"
        placeholder="Favorites"
        display="chip"
        maxSelectedLabels={Infinity}
        selectedItemTemplate={selectedItemTemplate} // Custom display template
        style={{ width: "100%" }}
        panelClassName="p-multiselect-panel p-input-overlay"
        onFocus={handleFocus}
        dropdownIcon="pi pi-chevron-down"
      />
    </div>
  );
};

export default CustomMultiSelect;
