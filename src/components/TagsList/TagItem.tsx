import { Checkbox, Grid, FormControlLabel } from "@mui/material";
import React from "react";
import { ITag } from "../../types/tag";

interface IProps {
  tag: ITag;
  onSelect: (isSelect: boolean, tag: ITag) => void;
}

const TagItem: React.FC<IProps> = ({ tag, onSelect }) => {
  return (
    <Grid item xs={3} md={1.5}>
      <FormControlLabel
        label={tag.name}
        control={
          <Checkbox
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              onSelect(event.target.checked, tag);
            }}
          />
        }
      />
    </Grid>
  );
};

export default TagItem;
