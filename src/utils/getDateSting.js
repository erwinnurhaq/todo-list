const MONTH_LONG = [
  'Januari',
  'Februari',
  'Maret',
  'April',
  'Mei',
  'Juni',
  'Juli',
  'Agustus',
  'September',
  'Oktober',
  'November',
  'Desember',
];

export default function getDateString(dateString) {
  const date = new Date(dateString);
  const formattedDate = `${String(date.getDate()).padStart(2, '0')} ${
    MONTH_LONG[date.getMonth()]
  } ${date.getFullYear()}`;
  return formattedDate;
}
