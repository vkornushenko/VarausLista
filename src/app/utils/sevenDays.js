export default function returnSevenDaysObject(offset) {
  // working code
  const weekdayNamesStartsFromSunday = [
    'sun',
    'mon',
    'tue',
    'wed',
    'thu',
    'fri',
    'sat',
  ];
  // the offset for the first day counting in days from today
  var startingDay = offset;
  const daysArray = [];
  weekdayNamesStartsFromSunday.map((day, index) => {
    // yesterday
    const d = new Date();
    d.setDate(d.getDate() + startingDay);
    const element = {
      weekday: d.getDate(),
      //weekdayIndex: d.getDay(),
      weekdayName: weekdayNamesStartsFromSunday[d.getDay()],
      offset: startingDay,
      date: d
    };
    daysArray.push(element);
    startingDay++;
  });
  // console.log(daysArray);
  return daysArray;
}
