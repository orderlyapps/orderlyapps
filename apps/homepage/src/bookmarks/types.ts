export interface Bookmark {
  id: string;
  name: string;
  url: string;
  createdAt: number;
}

export type BookmarkInput = {
  name: string;
  url: string;
};
