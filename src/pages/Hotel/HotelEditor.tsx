import React from "react";
import { Container, Rating, TextField, SelectChangeEvent } from "@mui/material";

import { IHotel } from "../../types/hotel";
import { useInput } from "../../hooks/useInput";
import { ITag } from "../../types/tag";
import TagsEditor from "./TagsEditor";
import { useDispatch } from "react-redux";
import { updateHotel } from "../../store/action-creators/hotel";

interface IProps {
  hotel: IHotel;
  tags: ITag[];
}

const HotelEditor: React.FC<IProps> = ({ hotel, tags }) => {
  const dispatch = useDispatch();

  const name = useInput(hotel.name);
  const country = useInput(hotel.country);
  const description = useInput(hotel.description);
  const price = useInput(String(hotel.price));
  const [stars, setStars] = React.useState<number | null>(hotel.stars);
  const [selectedTags, setSelectedTags] = React.useState<ITag[]>(hotel.tags);

  const timer = React.useRef(setTimeout(() => {}, 1));

  const handleChange = (event: SelectChangeEvent<typeof selectedTags>) => {
    const value = event.target.value;

    if (typeof value === "object") {
      if (typeof value[value.length - 1] === "string") {
        if (
          selectedTags.some(
            (tag) => tag.name === String(value[value.length - 1])
          )
        ) {
          setSelectedTags(
            selectedTags.filter(
              (tag) => tag.name !== String(value[value.length - 1])
            )
          );
        } else {
          setSelectedTags([
            ...selectedTags,
            tags.filter(
              (tag) => tag.name === String(value[value.length - 1])
            )[0],
          ]);
        }
      }
    }
  };

  const update = () => {
    const newHotel = {
      id: hotel.id,
      name: name.value,
      country: country.value,
      description: description.value,
      price: +price.value,
      stars: stars !== null ? +stars : hotel.stars,
      image: hotel.image,
      tags: selectedTags,
      likes: hotel.likes,
    };

    dispatch(updateHotel(newHotel as IHotel));
  };

  React.useEffect(() => {
    if (timer) {
      clearTimeout(timer.current);
    }
    return () => {
      timer.current = setTimeout(update, 1000);
    };
  }, [
    name.value,
    description.value,
    stars,
    price.value,
    country.value,
    selectedTags,
  ]);

  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "column",
        border: "1px solid black",
        p: 5,
      }}
    >
      <TextField label="Название" value={name.value} onChange={name.onChange} />
      <img
        src={`http://localhost:5001/${hotel.image}`}
        alt={hotel.name}
        width="400"
        style={{ marginTop: "10px" }}
      />
      <TextField
        label="Страна"
        style={{ marginTop: "10px" }}
        value={country.value}
        onChange={country.onChange}
      />
      <TextField
        label="Описание"
        multiline
        style={{ marginTop: "10px" }}
        value={description.value}
        onChange={description.onChange}
      />
      <TextField
        label=" Ценник ($)"
        style={{ marginTop: "10px" }}
        value={price.value}
        onChange={price.onChange}
      />
      <Rating
        value={stars}
        onChange={(event, newValue) => {
          setStars(newValue);
        }}
        style={{ marginTop: "10px" }}
      />
      <TagsEditor
        tags={tags}
        selectedTags={selectedTags}
        handleChange={handleChange}
      />
    </Container>
  );
};

export default HotelEditor;
