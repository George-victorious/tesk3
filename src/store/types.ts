import React from "react";

export type alternate = {
  href: string;
  text: string;
};

export type postType = {
  alternate: alternate[];
  author: string;
  canonicalUrl: string;
  crawled: number;
  fingerprint: string;
  id: string;
  keywords: string[];
  language: string;
  origin: {
    htmlUrl: string;
    streamId: string;
    title: string;
  };
  originId: string;
  published: number;
  recrawled: number;
  summary: {
    content: string;
    direction: string;
  };
  title: string;
  unread: boolean;
  updateCount: number;
  visual: {
    contentType: string;
    height: number;
    processor: string;
    url: string;
    width: number;
  };
};

export type GetPostsResType = {
  items: postType[];
};

export type TTapography = {
  level: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "span";
  style?: React.CSSProperties;
  children: React.ReactChild;
};

export type TPostsReducer = {
  postList: postType[];
  pageNumber: number;
};

export type TSetPostsAction = {
  type: string;
  payload: postType[];
};

export type TSetPageAction = {
  type: string;
  payload: number;
};

export type TUser = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
};

export type TUserRudecer = {
  userList: TUser[];
};

export type TAddUserAction = {
  type: string;
  payload: TUser;
};

export type TRemoveUserAction = {
  type: string;
  payload: number;
};

export type PaginationButtonsComponentProps = {
  current: number;
  length: number;
  setPage: (page: number) => void;
};

export type TPopup = {
  isOldUser: boolean;
  propsUser: TUser;
  onClose: () => void;
};

export type TInputValidation = {
  firstName: undefined | boolean;
  lastName: undefined | boolean;
  email: undefined | boolean;
};
