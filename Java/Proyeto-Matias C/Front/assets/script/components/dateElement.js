export default (date) => {
  const dateElement = document.createElement("li");
  dateElement.classList.add("date");
  dateElement.textContent = date;
  return dateElement;
};
