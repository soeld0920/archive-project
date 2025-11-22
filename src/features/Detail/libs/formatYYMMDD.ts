/*
  날짜를 'YY-MM-DD' 형식으로 포맷팅하는 함수
*/

export const formatYYMMDD = (d: Date) => {
    const date = new Date(d);
    const yy = String(date.getFullYear() % 100).padStart(2, "0");
    const mm = String(date.getMonth() + 1).padStart(2, "0");
    const dd = String(date.getDate()).padStart(2, "0");
    return `${yy}-${mm}-${dd}`;
  }