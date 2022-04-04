import {
  FormControl,
  InputLabel,
  OutlinedInput,
  Select,
  Box,
  Chip,
  MenuItem,
  SelectChangeEvent,
} from "@mui/material";
import React from "react";
import { ITag } from "../../types/tag";

interface IProps {
  cities: string[];
  selectedCities: string[];
  handleChange: (event: SelectChangeEvent<string[]>) => void;
}

function getStyles(name: string, cities: readonly string[]) {
  return {
    backgroundColor: cities.some((city) => city === name) ? "#2c2" : "#fff",
  };
}

const CitiesEditor: React.FC<IProps> = ({
  cities,
  selectedCities,
  handleChange,
}) => {
  return (
    <FormControl sx={{ m: 1, width: 300 }}>
      <InputLabel id="demo-multiple-chip-label">Города</InputLabel>
      <Select
        labelId="demo-multiple-chip-label"
        id="demo-multiple-chip"
        multiple
        value={selectedCities}
        onChange={handleChange}
        input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
        renderValue={(selected) => (
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
            {selected.map((value) => (
              <Chip key={value} label={value} />
            ))}
          </Box>
        )}
      >
        {cities.map((city) => (
          <MenuItem
            key={city}
            value={city}
            style={getStyles(city, selectedCities)}
          >
            {city}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default CitiesEditor;
