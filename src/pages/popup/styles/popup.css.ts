import { style } from "@vanilla-extract/css";
import { vars } from "./theme.css";

export const appStyles = {
  app: style({
    position: "absolute",
    backgroundColor: vars.color.backgroundColor,
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    textAlign: "center",
    height: "100%",
    padding: "10px",
    overflowY: "scroll",
    overflowX: "hidden",
    selectors: {
      "&::-webkit-scrollbar": {
        width: "10px",
      },
      "&::-webkit-scrollbar-thumb": {
        backgroundColor: vars.color.scrollbarColor,
        borderRadius: "10px",
        backgroundClip: "padding-box",
        border: "2px solid transparent",
      },
      "&::-webkit-scrollbar-track": {
        backgroundColor: vars.color.scrollbarTrackColor,
        borderRadius: "10px",
        boxShadow: vars.color.scrollbarTrackBoxShadow,
      },
    },
  }),

  prList: style({
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    listStyle: "none",
    padding: 0,
    marginTop: "10px",
    width: "100%",
  }),

  userProfile: style({
    width: "15px",
    height: "15px",
    borderRadius: "50%",
  }),

  prItem: style({
    overflow: "hidden",
    margin: 0,
    border: "none",
    color: "inherit",
    outline: "none",
    appearance: "none",
    cursor: "pointer",
    width: "100%",
    backgroundColor: vars.color.listItemBackgroundColor,
    borderRadius: "10px",
    padding: "10px",
    marginBottom: "10px",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    transition: "all 0.2s ease-in-out",
    selectors: {
      "&:hover": {
        backgroundColor: vars.color.listItemHoverBackgroundColor,
        color: vars.color.listItemHoverColor,
      },
      "&:active": {
        backgroundColor: vars.color.listItemHoverBackgroundColor,
        color: vars.color.listItemHoverColor,
      },
    },
  }),

  prFlexRow: style({
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
  }),

  prItemImage: style({
    width: "25px",
    height: "25px",
    borderRadius: "50%",
  }),

  prItemInfo: style({
    display: "flex",
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "flex-start",
    width: "50%",
  }),

  prItemInfoTitle: style({
    fontSize: "12px",
    fontWeight: "bold",
    color: "#fff",
    textOverflow: "ellipsis",
    overflow: "hidden",
    whiteSpace: "nowrap",
  }),

  prItemInfoAuthor: style({
    fontSize: "12px",
    marginLeft: "10px",
    color: "#fff",
  }),
};
