import { Container, Typography } from "@mui/material";
import React from "react";
import { useDispatch } from "react-redux";
import HotelsList from "../../components/HotelsList";
import TagsList from "../../components/TagsList/TagsList";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { fetchHotels } from "../../store/action-creators/hotel";
import { IUser } from "../../types/user";

interface IProps {
  user: IUser | null;
}

const HomePage: React.FC<IProps> = ({ user }) => {
  const { hotels, error } = useTypedSelector((state) => state.hotel);

  const dispatch = useDispatch();

  React.useEffect(() => {
    document.title = "Отелиндер";
    dispatch(fetchHotels());
  }, []);

  if (error) {
    return (
      <Container>
        <Typography variant="h4">{error}</Typography>
      </Container>
    );
  }

  return (
    <Container>
      <TagsList />
      {hotels.length > 0 ? (
        <HotelsList hotels={hotels} user={user} />
      ) : (
        <Typography variant="h4">Отелей не найдено:(</Typography>
      )}
    </Container>
  );
};

export default HomePage;
