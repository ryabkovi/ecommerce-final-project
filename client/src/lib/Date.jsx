export function formatDate(d, format = "dd-MM-yyyy") {
  const date = new Date(d);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();

  if (format === "yyyy-MM-dd") {
    return `${year}-${month}-${day}`;
  } else {
    return `${day}-${month}-${year}`;
  }
}
