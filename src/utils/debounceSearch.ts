import _ from "lodash";

export const debounceSearch = _.debounce(
  (
    value: string,
    setParams: React.Dispatch<
      React.SetStateAction<{
        limit: number;
        page: number;
        name?: string;
      }>
    >
  ) => {
    setParams((prevParams) => {
      return { ...prevParams, page: 1, name: value };
    });
  },
  500
);
