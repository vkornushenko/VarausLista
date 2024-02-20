

export default function TimeInterval({ start, end }) {
  const addZero = (value) => {
    return value < 10 ? '0' + value : value;
  };

  const start_time = new Date(start);
  const end_time = new Date(end);

  const start_hrs = addZero(start_time.getHours());
  const start_mins = addZero(start_time.getMinutes());
  const end_hrs = addZero(end_time.getHours());
  const end_mins = addZero(end_time.getMinutes());

  return (
    <>
      {start_hrs}
      <sup>{start_mins}</sup> - {end_hrs}
      <sup>{end_mins}</sup>
    </>
  );
}
