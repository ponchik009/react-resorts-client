import React from "react";
import {
  Card,
  Typography,
  Grid,
  CardMedia,
  CardContent,
  CardActions,
  Rating,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { Link } from "react-router-dom";

import { IHotelLike } from "../../types/user";

interface IProps {
  hotel: IHotelLike;
  onRemove: (id: number) => void;
}

const HotelFavouriteItem: React.FC<IProps> = ({ hotel, onRemove }) => {
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
            <Typography variant="h6">Страна: {hotel.country}</Typography>
            <Typography variant="body2">{hotel.description}</Typography>
            <Typography variant="h6">Ценник: {hotel.price}$</Typography>
            <Rating name="read-only" value={hotel.stars} readOnly />
          </CardContent>
        </Link>
        <CardActions
          sx={{
            display: "flex",
            alignItems: "start",
            justifyContent: "flex-end",
          }}
        >
          <IconButton onClick={() => onRemove(hotel.id)}>
            <CloseIcon sx={{ fontSize: 30 }} />
          </IconButton>
        </CardActions>
      </Card>
    </Grid>
  );
};

export default HotelFavouriteItem;
