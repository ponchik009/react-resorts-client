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
  tags: ITag[];
  selectedTags: ITag[];
  handleChange: (event: SelectChangeEvent<ITag[]>) => void;
}

function getStyles(tagName: string, tags: readonly ITag[]) {
  return {
    backgroundColor: tags.some((tag) => tag.name === tagName) ? "#2c2" : "#fff",
  };
}

const TagsEditor: React.FC<IProps> = ({ tags, selectedTags, handleChange }) => {
  return (
    <FormControl sx={{ m: 1, width: 300 }}>
      <InputLabel id="demo-multiple-chip-label">Теги</InputLabel>
      <Select
        labelId="demo-multiple-chip-label"
        id="demo-multiple-chip"
        multiple
        value={selectedTags}
        onChange={handleChange}
        input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
        renderValue={(selected) => (
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
            {selected.map((value) => (
              <Chip key={value.name} label={value.name} />
            ))}
          </Box>
        )}
      >
        {tags.map((tag) => (
          <MenuItem
            key={tag.name}
            value={tag.name}
            style={getStyles(tag.name, selectedTags)}
          >
            {tag.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default TagsEditor;
