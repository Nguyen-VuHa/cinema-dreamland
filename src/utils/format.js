export function formatViewCount(number) {
    if (number >= 1000000000) {
      return (number / 1000000000).toFixed(1).replace(/\.0$/, '') + 'B'; // Tỷ (Billion)
    } else if (number >= 1000000) {
      return (number / 1000000).toFixed(1).replace(/\.0$/, '') + 'M'; // Triệu (Million)
    } else if (number >= 1000) {
      return (number / 1000).toFixed(1).replace(/\.0$/, '') + 'K'; // Nghìn (Thousand)
    } else {
      return number.toString(); // Dưới 1000 thì giữ nguyên
    }
}