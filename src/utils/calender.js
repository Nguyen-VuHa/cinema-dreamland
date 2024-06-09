export function getMonthCalendar(year, month) {
    const lastDayOfMonth = new Date(year, month, 0);
    const totalDays = lastDayOfMonth.getDate();
    
    const monthCalendar = [];
    let week = new Array(7).fill(null);  // Tạo một tuần rỗng

    for (let day = 1; day <= totalDays; day++) {
        const currentDate = new Date(year, month - 1, day);

        let dayOfWeek = (currentDate.getDay() + 6) % 7; // Điều chỉnh để Thứ Hai là ngày đầu tuần
        week[dayOfWeek] = day;

        if (dayOfWeek === 6 || day === totalDays) {
            monthCalendar.push(week);
            week = new Array(7).fill(null);  // Tạo một tuần mới
        }
    }

    return monthCalendar;
}

export function generateYears(startYear, endYear) {
    const years = [];
    for (let year = startYear; year <= endYear; year++) {
        years.push({ value: year, name: `${year}` });
    }
    return years;
}