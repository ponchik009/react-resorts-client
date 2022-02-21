import React from "react";
import { Grid, Stack } from "@mui/material";
import { useDispatch } from "react-redux";
import { fetchTags } from "../../store/action-creators/tag";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import TagItem from "./TagItem";
import { ITag } from "../../types/tag";
import { fetchHotels } from "../../store/action-creators/hotel";
import { HotelActionTypes } from "../../types/hotel";

const TagsList = () => {
  const dispatch = useDispatch();
  const { tags } = useTypedSelector((state) => state.tag);
  const { currentQuery } = useTypedSelector((state) => state.hotel);

  const [selectedTags, setSelectedTags] = React.useState<ITag[]>([]);
  const timer = React.useRef(setTimeout(() => {}, 1));

  const onSelect = (isSelect: boolean, tag: ITag) => {
    if (timer) {
      clearTimeout(timer.current);
    }
    if (isSelect) {
      const newTags = [...selectedTags, tag];
      setSelectedTags(newTags);
      timer.current = setTimeout(() => {
        // запрос с фильтрацией
        dispatch(fetchHotels(newTags, currentQuery));
        dispatch({
          type: HotelActionTypes.SET_FILTERS,
          payload: newTags,
        });
      }, 1000);
    } else {
      const newTags = selectedTags.filter(
        (selectedTag) => selectedTag.id !== tag.id
      );
      setSelectedTags(newTags);
      timer.current = setTimeout(() => {
        // запрос с фильтрацией
        dispatch(fetchHotels(newTags, currentQuery));
        dispatch({
          type: HotelActionTypes.SET_FILTERS,
          newTags,
        });
      }, 1000);
    }
  };

  React.useEffect(() => {
    dispatch(fetchTags());
    return () => {
      dispatch({
        type: HotelActionTypes.SET_FILTERS,
        payload: [],
      });
    };
  }, []);

  return (
    <Grid
      container
      spacing={1}
      sx={{
        py: 5,
      }}
    >
      {tags &&
        tags.map((tag) => (
          <TagItem
            tag={tag}
            onSelect={onSelect}
            key={`${tag.name}_${tag.id}`}
          />
        ))}
    </Grid>
  );
};

export default TagsList;
