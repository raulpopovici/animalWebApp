export const convertDate = (text: string) => {
  const date = new Date(text);
  const year = text.substring(0, 4);
  const month = text.substring(5, 7);
  const day = text.substring(8, 10);
  const hours = text.substring(11, 13);
  const minutes = text.substring(14, 16);
  const seconds = text.substring(17, 19);
  const smallerDateString = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  return smallerDateString;
};

export const createDeliveryDate = (text: string, days: number) => {
  const date = new Date(text);
  date.setDate(date.getDate() + days);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const seconds = String(date.getSeconds()).padStart(2, "0");
  const newDateString = `${year}-${month}-${day}`;
  return newDateString;
};
