export default function currentDate(): string {
  const dNow = new Date();
  const localdate = `${dNow.getFullYear()}-${
    dNow.getMonth() + 1
  }-${dNow.getDate()} ${dNow.getHours()}:${dNow.getMinutes()}:${dNow.getSeconds()}`;
  return localdate;
}
