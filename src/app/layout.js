import ReduxProvider from "~/redux/provider";
import "./globals.scss";

export const metadata = {
    title: 'Cinema Dreamland - Xem Phim Online Chất Lượng Cao | hanguyen.online',
    description: 'Thưởng thức các bộ phim mới nhất với chất lượng HD tại Cinema Dreamland trên domain hanguyen.online. Phim hành động, phim tâm lý, phim bộ, và nhiều thể loại hấp dẫn khác, cập nhật mỗi ngày.',
    keywords: 'Cinema Dreamland, xem phim, phim online, phim HD, hanguyen.online, phim hành động, phim tâm lý, phim bộ',
    openGraph: {
      title: 'Cinema Dreamland - Xem Phim Online Chất Lượng Cao | hanguyen.online',
      description: 'Xem phim miễn phí chất lượng cao tại Cinema Dreamland. Phim hành động, phim tâm lý, phim bộ và nhiều thể loại khác với phụ đề chuẩn.',
      url: 'https://www.hanguyen.online',
      type: 'website',
      images: [
        {
          url: 'https://www.hanguyen.online/images/og-image.jpg',
          width: 800,
          height: 600,
          alt: 'Cinema Dreamland',
        },
      ],
    },
    robots: 'index, follow',
  };

export default function RootLayout({ children }) {
    

    return (
        <html lang="vi" suppressHydrationWarning={true}>
            <head>
                <link rel="icon" href="/icon.png" />
            </head>
            <body>
                <ReduxProvider>
                    {children}
                </ReduxProvider>
            </body>
        </html>
    );
}
