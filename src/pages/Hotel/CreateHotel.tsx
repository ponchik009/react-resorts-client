import React from "react";
import {
  Container,
  Rating,
  TextField,
  SelectChangeEvent,
  Typography,
  Button,
} from "@mui/material";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { IHotel } from "../../types/hotel";
import { useInput } from "../../hooks/useInput";
import { ITag } from "../../types/tag";
import TagsEditor from "./TagsEditor";
import { createHotel, updateHotel } from "../../store/action-creators/hotel";
import FileUpload from "../../components/File/FileUpload";
import CitiesEditor from "./CitiesEditor";
import { DEFAULT_CITIES } from "../../const/cities";

interface IProps {
  tags: ITag[];
}

const CreateHotel: React.FC<IProps> = ({ tags }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const name = useInput("");
  const [picture, setPicture] = React.useState(null);
  const [selectedCities, setSelectedCities] = React.useState<string[]>([]);
  const description = useInput("");
  const price = useInput("0");
  const [stars, setStars] = React.useState<number | null>(0);
  const [selectedTags, setSelectedTags] = React.useState<ITag[]>([]);

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

  const handleCitiesChange = (
    event: SelectChangeEvent<typeof selectedCities>
  ) => {
    const value = event.target.value;

    if (typeof value === "object") {
      setSelectedCities(value);
    }
  };

  const create = () => {
    const formData = new FormData();
    formData.append("name", name.value);
    formData.append("description", description.value);
    formData.append("cities", JSON.stringify(selectedCities));
    if (picture) {
      formData.append("image", picture!);
    }
    formData.append("stars", String(stars));
    formData.append("price", price.value);
    formData.append("tags", JSON.stringify(selectedTags));

    dispatch(createHotel(formData));
    navigate("/");
  };

  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "column",
        border: "1px solid black",
        p: 5,
      }}
    >
      <Typography variant="h4">Создание отеля</Typography>
      <TextField
        label="Название"
        value={name.value}
        onChange={name.onChange}
        style={{ marginBottom: "10px" }}
      />
      <FileUpload setFile={setPicture} accept="image/*">
        <Button>Загрузить изображение</Button>
      </FileUpload>
      <CitiesEditor
        cities={DEFAULT_CITIES}
        selectedCities={selectedCities}
        handleChange={handleCitiesChange}
      />
      <TextField
        label="Описание"
        multiline
        style={{ marginTop: "10px" }}
        value={description.value}
        onChange={description.onChange}
      />
      <TextField
        label="Ценник ($)"
        style={{ marginTop: "10px" }}
        value={price.value}
        onChange={price.onChange}
        type="number"
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
      <Button variant="text" onClick={create}>
        Ок
      </Button>
    </Container>
  );
};

export default CreateHotel;
