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

export default function getDateString(dateString, options = {}) {
  if (!dateString) return '-';

  const { isDateOnly = false, isHourOnly = false } = options;
  const date = new Date(dateString);
  const formattedDate = `${String(date.getDate()).padStart(2, '0')} ${
    MONTH_LONG[date.getMonth()]
  } ${date.getFullYear()}`;
  const formattedHour = date.toLocaleString(undefined, {
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
  });

  if (isDateOnly) return formattedDate;
  if (isHourOnly) return formattedHour;
  return `${formattedDate}, ${formattedHour}`;
}
