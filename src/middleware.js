
import { NextResponse } from 'next/server';
import cookie from 'cookie';

export function middleware(req) {
  // Lấy cookie từ request
  const { nextUrl } = req;
  const cookies = cookie.parse(req.headers.get('cookie') || '');
  const { pathname } = nextUrl;

  const excludedPaths = ['/auth', '/auth/sign-in', '/auth/sign-up', '/auth/otp-verification',  '/public'];

  // Loại trừ các tệp tĩnh như CSS, JS, hình ảnh
  const staticFileExtensions = ['.css', '.js', '.png', '.jpg', '.jpeg', '.gif', '.svg', '.ico'];

  if (cookies.access_token && excludedPaths.includes(pathname)) {
    return NextResponse.redirect(new URL('/', req.url)); // Chuyển hướng đến trang chủ hoặc bất kỳ trang nào khác
  }

  // Kiểm tra nếu URL nằm trong danh sách loại trừ
  if (excludedPaths.includes(pathname) || staticFileExtensions.some(ext => pathname.endsWith(ext))) {
    return NextResponse.next();
  }  
  
  // Nếu có token, cho phép yêu cầu tiếp tục
  return NextResponse.next();
}

// Chỉ định các đường dẫn mà middleware sẽ chạy
export const config = {
  matcher: ['/:path*'],
}