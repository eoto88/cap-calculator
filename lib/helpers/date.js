import moment from 'moment';

export const timeFormat = 'HH:mm';
export const datetFormat = 'YYYY-MM-DD';
export const datetimeFormat = 'YYYY-MM-DD HH:mm';
export const fileDatetimeFormat = 'YYYY-MM-DD[T]HHmmss';

/**
 * Returns a properly formatted time string
 * @param date {Date}
 * @param format {string?}
 * @returns {string}
 */
export const formatTime = (date, format = timeFormat) => {
  return moment(date).format(format);
};

/**
 * Returns a properly formatted date string
 * @param date {Date}
 * @param format {string?}
 * @returns {string}
 */
export const formatDate = (date, format = datetFormat) => {
  return moment(date).format(format);
};

/**
 * Returns a properly formatted datetime string
 * @param date {Date}
 * @param format {string?}
 * @returns {string}
 */
export const formatDatetime = (date, format = datetimeFormat) => {
  return moment(date).format(format);
};

/**
 * Returns a properly formatted datetime string to use in a filename
 * @param date {Date}
 * @param format {string?}
 * @returns {string}
 */
export const fileFormatDatetime = (date, format = fileDatetimeFormat) => {
  return moment(date).format(format);
};
