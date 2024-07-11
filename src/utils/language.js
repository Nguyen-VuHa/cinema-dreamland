// Hàm loại bỏ dấu tiếng Việt
export const removeVietnameseTones = (str) => {
    str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/gi, 'a');
    str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/gi, 'e');
    str = str.replace(/ì|í|ị|ỉ|ĩ/gi, 'i');
    str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/gi, 'o');
    str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/gi, 'u');
    str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/gi, 'y');
    str = str.replace(/đ/gi, 'd');
    str = str.replace(/\u0300|\u0301|\u0303|\u0309|\u0323/gi, ''); // Dấu sắc, huyền, hỏi, ngã, nặng
    str = str.replace(/\u02C6|\u0306|\u031B/gi, ''); // Dấu mũ, ă, và ơ
    return str;
};