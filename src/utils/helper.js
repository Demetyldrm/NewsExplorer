function getcurrentDate() {
  const date = new Date();
  const year = date.toLocaleString("default", { year: "numeric" });
  const month = date.toLocaleString("default", { month: "2-digit" });
  const day = date.toLocaleString("default", { day: "2-digit" });
  const formattedDate = year + "-" + month + "-" + day;
  return formattedDate;
}
export const currentDate = getcurrentDate();

function getLastWeekDate() {
  const time = new Date().getTime() - 604800000;
  const previousWeek = new Date(time);
  const year = previousWeek.toLocaleString("default", { year: "numeric" });
  const month = previousWeek.toLocaleString("default", { month: "2-digit" });
  const day = previousWeek.toLocaleString("default", { day: "2-digit" });
  const formattedDate = year + "-" + month + "-" + day;
  return formattedDate;
}
export const previousWeek = getLastWeekDate();

export function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export const checkServerResponse = (response) => {
  if (!response.ok) {
    return response.json().then((error) => {
      throw new Error(error.message || "Something went wrong!");
    });
  }
  return response.json();
};

export const formatSearchResDate = (date) => {
  return new Date(date).toLocaleString("default", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};
