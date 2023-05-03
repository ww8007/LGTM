import { createGlobalTheme } from "@vanilla-extract/css";

export const vars = createGlobalTheme(":root", {
  color: {
    backgroundColor: "#242830",
    scrollbarColor: "#2f3542",
    scrollbarTrackColor: "grey",
    scrollbarTrackBoxShadow: "inset 0px 0px 5px white",
    listItemBackgroundColor: "#6A3FC3",
    listItemHoverBackgroundColor: "#3c3f4a",
    listItemHoverColor: "#bbbbbb",
  },
});
