export interface ITag {
  id: number;
  name: string;
}

export interface TagState {
  tags: ITag[];
  error: string;
}

export enum TagActionTypes {
  FETCH_TAGS = "FETCH_TAGS",
}

interface FetchTagsAction {
  type: TagActionTypes.FETCH_TAGS;
  payload: ITag[];
}

export type TagAction = FetchTagsAction;
