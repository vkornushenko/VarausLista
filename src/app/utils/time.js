export function getDurationInSeconds(duration) {
  // to do summ start + duration
  const fourDigitDuration = duration.replace(/[^0-9]/g, '');
  const durationHrs = fourDigitDuration.slice(0, 2);
  const durationMin = fourDigitDuration.slice(2, 4);
  const hoursToSeconds = durationHrs * 60 * 60;
  const minutesToSeconds = durationMin * 60;
  const durationToSeconds = hoursToSeconds + minutesToSeconds;
  return durationToSeconds;
}

export function getEndTime(start, durationInSeconds) {
  // console.log(start.getTime());
  // console.log(start.getTime() + durationInSeconds * 1000);
  const endTime = new Date(start.getTime() + durationInSeconds * 1000);
  // console.log('startTime');
  // console.log(start);
  // console.log('endTime');
  // console.log(endTime);
  return endTime;
}

export function returnStartOfTheDayByOffset(selectedDayOffset) {
  let date = new Date();
  date.setDate(date.getDate() + selectedDayOffset);
  // console.log(date);

  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

export function getTimeInterval(selectedDateObject) {
  // calculate today
  let now = (selectedDateObject || new Date());

  let startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  let startOfTomorrow = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate() + 1
  );

  const todayIsoString = startOfDay.toISOString();
  const tomorrowIsoString = startOfTomorrow.toISOString();

  const timeInterval = { from: todayIsoString, to: tomorrowIsoString };
  return timeInterval;
}

export const monthNamesArray = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];

export function returnDatePlusMonth(dateObject, monthNamesArray) {
  // in case of undefined initial state
  if (!dateObject) {
    dateObject = new Date();
  }

  return dateObject.getDate() + ' ' + monthNamesArray[dateObject.getMonth()];
}

export function getCurrentTimeForInput(selectedDateObject) {
  const now = new Date(selectedDateObject);
  now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
  const currentTime = now.toISOString().slice(0, 16);
  return currentTime;
}
