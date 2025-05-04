import * as XLSX from "xlsx";

export const isEqual = (a, b) => JSON.stringify(a) === JSON.stringify(b);

export function debounce(func, timeout = 500) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => func(args), timeout);
  };
}

export const exportToExcel = (data, fileName) => {
  // Create a new workbook - יצירת גליון
  const workbook = XLSX.utils.book_new();
  // Convert JSON to worksheet - יצירת מידע בפורמט מותאם לxl.
  const worksheet = XLSX.utils.json_to_sheet(data);
  // Add worksheet to workbook
  XLSX.utils.book_append_sheet(workbook, worksheet, fileName);
  // write and export file
  XLSX.writeFile(workbook, "limudeyHuch.xlsx");
};
