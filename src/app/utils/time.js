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

export function returnStartOfTheDayByOffset(selectedDayOffset){
  let date = new Date();
  date.setDate(date.getDate() + selectedDayOffset)
  // console.log(date);

  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

export function getTimeInterval(){
  // calculate today
  var now = new Date();

  var startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  var startOfTomorrow = new Date(now.getFullYear(), now.getMonth(), (now.getDate() + 1));
  
  // console.log('startOfDay: ' + startOfDay)
  // console.log('startOfTomorrow: ' + startOfTomorrow)

  const todayIsoString = startOfDay.toISOString();
  // console.log('todayIsoString: ' + todayIsoString);

  const tomorrowIsoString = startOfTomorrow.toISOString();

  const timeInterval = {from: todayIsoString, to: tomorrowIsoString}
  return timeInterval
}