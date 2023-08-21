export const colorToken = (mode: "light" | "dark") => {
  return mode == "light"
    ? {
        background: {
          main: "#f7fdfe",
        },
        sidebar: {
          background: "#fff",
          border: "#ccc",
          bgselect: "#aeeffb",
          bghover: "#d0f8fe",
        },
        button: {
          primary: "#00B3D5",
          error: "#CA0000",
          info: "#ECA800",
        },
      }
    : {
        background: {
          main: "#003e49",
        },
        sidebar: {
          background: "#002c34",
          border: "#00414c",
          bgselect: "#00677a",
          bghover: "#005463",
        },
        button: {
          primary: "#00B3D5",
          error: "#CA0000",
          info: "#ECA800",
        },
      };
};
