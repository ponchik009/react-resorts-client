import { Checkbox, Grid, FormControlLabel } from "@mui/material";
import React from "react";
import { ITag } from "../../types/tag";

interface IProps {
  city: string;
  onSelect: (isSelect: boolean, city: string) => void;
}

const CityItem: React.FC<IProps> = ({ city, onSelect }) => {
  return (
    <Grid item xs={3} md={1.5}>
      <FormControlLabel
        label={city}
        control={
          <Checkbox
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              onSelect(event.target.checked, city);
            }}
          />
        }
      />
    </Grid>
  );
};

export default CityItem;
