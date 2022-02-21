import React from "react";
import SearchIcon from "@mui/icons-material/Search";
import { Container, InputBase } from "@mui/material";
import { useDispatch } from "react-redux";
import { fetchHotels } from "../../store/action-creators/hotel";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { HotelActionTypes } from "../../types/hotel";

interface IProps {
  disabled: boolean;
}

const Search: React.FC<IProps> = ({ disabled }) => {
  const [value, setValue] = React.useState<string>("");
  const dispatch = useDispatch();
  const { currentFilters } = useTypedSelector((state) => state.hotel);
  const timer = React.useRef(setTimeout(() => {}, 1));

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (timer) {
      clearTimeout(timer.current);
    }

    const inputText = e.target.value;

    setValue(inputText);

    timer.current = setTimeout(() => {
      // запрос с фильтрацией
      dispatch(fetchHotels(currentFilters, inputText));
      dispatch({
        type: HotelActionTypes.SET_QUERY,
        payload: inputText,
      });
    }, 1000);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      console.log(e);

      dispatch(fetchHotels([], value));
    }
  };

  React.useEffect(() => {
    dispatch({
      type: HotelActionTypes.SET_QUERY,
      payload: "",
    });
    setValue("");
  }, [disabled]);

  return (
    <Container
      sx={{
        mx: 20,
        py: 0.5,
        backgroundColor: "#aaa",
        borderRadius: 2,
        display: "flex",
        alignItems: "center",
      }}
    >
      <SearchIcon />
      <InputBase
        placeholder="Поиск отелей"
        fullWidth
        sx={{ ml: 1 }}
        value={value}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        disabled={disabled}
      />
    </Container>
  );
};

export default Search;
