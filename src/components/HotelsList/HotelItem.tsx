import React from "react";
import {
  Card,
  Typography,
  Grid,
  CardMedia,
  CardContent,
  CardActions,
  Checkbox,
  Rating,
  FormControlLabel,
} from "@mui/material";
import Favorite from "@mui/icons-material/Favorite";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import { Link } from "react-router-dom";

import { IHotel } from "../../types/hotel";
import { useDispatch } from "react-redux";
import { likeHotel, unlikeHotel } from "../../store/action-creators/hotel";
import { changeDialog } from "../../store/action-creators/user";

interface IProps {
  hotel: IHotel;
  checked: boolean;
  isAuth: boolean;
}

const HotelItem: React.FC<IProps> = ({ hotel, checked, isAuth }) => {
  const dispatch = useDispatch();

  const handleLikeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.stopPropagation();

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
    <Grid item xs={12} md={12} sx={{ width: "100%" }}>
      <Card
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <Link
          to={`/hotel/${hotel.id}`}
          style={{
            color: "inherit",
            textDecoration: "inherit",
            display: "flex",
            flexDirection: "row",
          }}
        >
          <CardMedia
            component="img"
            image={`http://localhost:5001/${hotel.image}`}
            alt={hotel.name}
            sx={{ width: "300px" }}
            // height="200"
          />
          <CardContent>
            <Typography variant="h4">{hotel.name}</Typography>
            <Typography variant="h6">
              Города: {hotel.cities.join(", ")}
            </Typography>
            <Typography variant="body2">{hotel.description}</Typography>
            <Typography variant="h6">Ценник: {hotel.price}$</Typography>
            <Rating name="read-only" value={hotel.stars} readOnly />
          </CardContent>
        </Link>
        <CardActions
          sx={{
            display: "flex",
            alignItems: "end",
            justifyContent: "flex-end",
          }}
        >
          <FormControlLabel
            label=""
            control={
              <Checkbox
                aria-label={`${hotel.likes.length}`}
                icon={<FavoriteBorder sx={{ fontSize: 30 }} />}
                checkedIcon={
                  <Favorite sx={{ fontSize: 30, color: "#ff0000" }} />
                }
                checked={checked}
                onChange={handleLikeChange}
              />
            }
          />
        </CardActions>
      </Card>
    </Grid>
  );
};

export default HotelItem;
