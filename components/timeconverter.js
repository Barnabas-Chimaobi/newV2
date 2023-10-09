export default function formatTime(time) {
  const dateTime = new Date(time);
  const timeonly = dateTime.toLocaleTimeString();
  const dateonly = dateTime.toLocaleDateString();
  const dayandmonth = dateTime.toLocaleDateString(undefined, {
    day: "numeric",
    month: "long",
  });
  return {
    time: timeonly,
    dateonly: dateonly,
    monthonly: dayandmonth,
  };
}
