export function converMS(mills) {
  let hour, minute, seconds;
  seconds = Math.floor(mills/1000);
  minute = Math.floor(seconds/60);
  seconds = seconds % 60;
  hour = Math.floor(minute/60);
  minute = minute % 60;
  hour = hour % 24;

  return {h:hour, m: minute, s:seconds}
}
