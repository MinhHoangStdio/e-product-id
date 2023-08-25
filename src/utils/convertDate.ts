import moment from "moment";

export const convertDateMui = (date: any) => {
  return moment(date).format("DD/MM/YYYY");
};
