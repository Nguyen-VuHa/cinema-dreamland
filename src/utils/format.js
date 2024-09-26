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

export function formatPhoneNumber(phoneNumber) {
  if (!phoneNumber) {
    return "+84 ~"; // Hoặc thông báo lỗi tùy chọn
  }
  // Thêm mã quốc gia +84 vào đầu số
  const countryCode = "+84";

  // Loại bỏ số 0 đầu tiên nếu có
  if (phoneNumber.startsWith("0")) {
    phoneNumber = phoneNumber.substring(1);
  }

  // Tùy thuộc vào độ dài của số điện thoại, chia nhỏ thành các phần
  let parts = [];
  
  // Nếu số điện thoại có 9 đến 10 ký tự, chia thành 3 phần
  if (phoneNumber.length === 9 || phoneNumber.length === 10) {
    parts.push(phoneNumber.slice(0, 2));  // 2 số đầu
    parts.push(phoneNumber.slice(2, 5));  // 3 số giữa
    parts.push(phoneNumber.slice(5));     // phần còn lại
  }
  // Nếu số điện thoại có 11 đến 12 ký tự, chia thành 4 phần
  else if (phoneNumber.length === 11 || phoneNumber.length === 12) {
    parts.push(phoneNumber.slice(0, 3));  // 3 số đầu
    parts.push(phoneNumber.slice(3, 6));  // 3 số giữa
    parts.push(phoneNumber.slice(6, 9));  // 3 số tiếp theo
    parts.push(phoneNumber.slice(9));     // phần còn lại
  } else {
    // Nếu số điện thoại không khớp độ dài yêu cầu, trả về không thay đổi
    return phoneNumber;
  }

  // Gộp lại thành chuỗi định dạng +84 XX XXX XXXX
  return `${countryCode} ${parts.join(" ")}`;
}

export function formatCurrency(amount) {
  return new Intl.NumberFormat('en-US', { 
    style: 'currency', 
    currency: 'USD', 
    minimumFractionDigits: 2 
  }).format(amount);
}