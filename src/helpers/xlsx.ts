import XLSX from 'xlsx';

export function generateWorkbook(
  jsonData: any[],
  fileName: string,
  sheetName = 'Report'
) {
  const wb = XLSX.utils.book_new();
  const ws = XLSX.utils.json_to_sheet(jsonData, {
    header: Object.keys(jsonData[0]),
    skipHeader: false,
  });
  wb.SheetNames = [sheetName];
  wb.Sheets[sheetName] = ws;
  // eslint-disable-next-line security/detect-non-literal-fs-filename
  XLSX.writeFile(wb, fileName);
}
