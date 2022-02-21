import { Container, Typography } from "@mui/material";
import React from "react";
import { useDispatch } from "react-redux";

import HotelsFavouriteList from "../../components/HotelsFavouriteList";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { unlikeHotel } from "../../store/action-creators/hotel";
import {
  changeDialog,
  getUser,
  setUser,
} from "../../store/action-creators/user";
import { IUser } from "../../types/user";

const ProfilePage = () => {
  const dispatch = useDispatch();
  const { user } = useTypedSelector((state) => state.user);

  const handleRemoveHotel = (id: number) => {
    dispatch(unlikeHotel(id));
    const newUser = {
      ...user,
      likes: user?.likes ? user.likes.filter((hotel) => hotel.id !== id) : [],
    } as IUser;
    dispatch(setUser(newUser));
  };

  React.useEffect(() => {
    document.title = "Профиль";
    dispatch(getUser());
  }, []);

  if (!user) {
    // dispatch(changeDialog());
    return (
      <Typography variant="h4">
        Обнаружен неавторизованный пользователь
      </Typography>
    );
  }

  return (
    <Container>
      <Typography variant="h4">Избранные отели</Typography>
      <HotelsFavouriteList hotels={user?.likes} onRemove={handleRemoveHotel} />
    </Container>
  );
};

export default ProfilePage;
