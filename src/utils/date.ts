import { DateTime } from 'luxon';

export const formatDate = (date: string, option: string = null) => {
  const dt = DateTime.fromISO(date, { locale: 'id' });
  const dateFormatted = dt
    .setLocale('id')
    .toLocaleString(
      option === 'short' ? DateTime.DATE_SHORT : DateTime.DATE_FULL,
    );

  return dateFormatted;
};
