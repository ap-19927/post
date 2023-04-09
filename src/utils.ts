const prependZero = (s: number) => {
  if(s >= 0 && s <= 9) return `0${s}`;
  else return `${s}`;
}
export const isoDate = (dateString: string) => {
    const date = new Date(dateString);
    const d = date.getDate();
    const m = prependZero(date.getMonth()+1);
    const y = date.getFullYear();
    const h = prependZero(date.getHours());
    const mi = prependZero(date.getMinutes());
    const s = prependZero(date.getSeconds());
    return `${y}-${m}-${d}T${h}:${mi}:${s}Z`;
}
