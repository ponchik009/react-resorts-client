import { Favorite, FavoriteBorder } from "@mui/icons-material";
import {
  Container,
  Typography,
  FormControlLabel,
  Checkbox,
  Rating,
  Chip,
  Grid,
} from "@mui/material";
import React from "react";
import { useDispatch } from "react-redux";
import { likeHotel, unlikeHotel } from "../../store/action-creators/hotel";
import { changeDialog } from "../../store/action-creators/user";
import { IHotel } from "../../types/hotel";

interface IProps {
  hotel: IHotel;
  checked: boolean;
  isAuth: boolean;
}

const HotelInfo: React.FC<IProps> = ({ hotel, checked = false, isAuth }) => {
  const dispatch = useDispatch();

  const handleLikeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!isAuth) {
      dispatch(changeDialog());
      return;
    }

    if (event.target.checked) {
      dispatch(likeHotel(hotel.id));
    } else {
      dispatch(unlikeHotel(hotel.id));
    }
  };

  return (
    <Container sx={{ flexDirection: "column", border: "1px solid black" }}>
      <Typography variant="h4">{hotel.name}</Typography>
      <img
        src={`http://localhost:5001/${hotel.image}`}
        alt={hotel.name}
        style={{ width: "400px" }}
      />
      <Typography variant="h6">Города: {hotel.cities.join(", ")}</Typography>
      <Typography variant="body2">{hotel.description}</Typography>
      <Typography variant="h6">Ценник: {hotel.price}$</Typography>
      <Rating name="read-only" value={hotel.stars} readOnly />
      <Grid container>
        {hotel.tags &&
          hotel.tags.map((tag) => (
            <Grid item md={1} xs={4} sx={{ ml: 3 }}>
              <Chip label={tag.name} variant="outlined" />
            </Grid>
          ))}
      </Grid>
      <FormControlLabel
        sx={{ ml: 100 }}
        label=""
        control={
          <Checkbox
            aria-label=""
            icon={<FavoriteBorder sx={{ fontSize: 60 }} />}
            checkedIcon={<Favorite sx={{ fontSize: 60, color: "#ff0000" }} />}
            checked={checked}
            onChange={handleLikeChange}
          />
        }
      />
    </Container>
  );
};

export default HotelInfo;
