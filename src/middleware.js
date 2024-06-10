
import { NextResponse } from 'next/server';

export function middleware(req) {
  // Lấy cookie từ request
  const { cookies, nextUrl } = req;
  const token = cookies['access_token'];
  const { pathname } = nextUrl;

  const excludedPaths = ['/auth/sign-in', '/auth/sign-up', '/public'];

    // Loại trừ các tệp tĩnh như CSS, JS, hình ảnh
  const staticFileExtensions = ['.css', '.js', '.png', '.jpg', '.jpeg', '.gif', '.svg', '.ico'];

  // Kiểm tra nếu URL nằm trong danh sách loại trừ
  if (excludedPaths.includes(pathname) || staticFileExtensions.some(ext => pathname.endsWith(ext))) {
    return NextResponse.next();
  }

  // Kiểm tra giá trị của cookie
  if (!token) {
    // Nếu không có token, chuyển hướng đến trang đăng nhập
    return NextResponse.redirect(new URL('/auth/sign-in', req.url));
  }

  // Nếu có token, cho phép yêu cầu tiếp tục
  return NextResponse.next();
}

// Chỉ định các đường dẫn mà middleware sẽ chạy
export const config = {
  matcher: ['/:path*'],
}