import React from "react";
import { Button, Container, Typography } from "@mui/material";
import { useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";

import { useTypedSelector } from "../../hooks/useTypedSelector";
import { deleteHotel, getHotel } from "../../store/action-creators/hotel";
import { IUser } from "../../types/user";
import HotelEditor from "./HotelEditor";
import HotelInfo from "./HotelInfo";
import CreateHotel from "./CreateHotel";

interface IProps {
  user: IUser | null;
}

const HotelPage: React.FC<IProps> = ({ user }) => {
  const { hotelId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { currentHotel, error } = useTypedSelector((state) => state.hotel);
  const { tags } = useTypedSelector((state) => state.tag);
  const [isEdit, setIsEdit] = React.useState(false);

  const handleEditHotel = () => {
    setIsEdit((prev) => !prev);
  };

  const handleRemoveHotel = () => {
    // удаляем
    if (hotelId) {
      dispatch(deleteHotel(+hotelId));
    }
    navigate("/");
  };

  React.useEffect(() => {
    document.title = "Отелиндер";
    if (hotelId) {
      dispatch(getHotel(+hotelId));
    }
  }, []);

  if (hotelId && hotelId === "create") {
    if (!user || !user.isAdmin) {
      return <Typography variant="h4">Недостаточно прав</Typography>;
    } else {
      return <CreateHotel tags={tags} />;
    }
  }

  if (hotelId && Object.is(+hotelId, NaN)) {
    return <Typography variant="h4">Неверный параметр</Typography>;
  }

  if (error) {
    return <Typography variant="h3">{error}</Typography>;
  }

  return (
    <Container>
      {user !== null && user.isAdmin && (
        <Container>
          <Button onClick={handleEditHotel}>
            {!isEdit ? "Изменить информацию" : "Сохранить"}
          </Button>
          <Button onClick={handleRemoveHotel}>Удалить отель</Button>
        </Container>
      )}
      {currentHotel &&
        (!isEdit ? (
          <HotelInfo
            hotel={currentHotel}
            checked={Boolean(
              currentHotel?.likes.some((userLike) => userLike.id === user?.id)
            )}
            isAuth={user !== null}
          />
        ) : (
          <HotelEditor hotel={currentHotel} tags={tags} />
        ))}
    </Container>
  );
};

export default HotelPage;
