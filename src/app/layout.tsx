import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { LanguageProvider } from "@/lib/i18n/LanguageContext";

const roboto = Roboto({
  weight: ["300", "400", "500", "700", "900"],
  subsets: ["latin", "vietnamese"],
  variable: "--font-roboto",
  display: "swap",
});

export const metadata: Metadata = {
  title: "QuizLive - Đấu Trí Trực Tiếp Thời Gian Thực",
  description: "Nền tảng game trắc nghiệm trực tuyến thời gian thực chuẩn serverless",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="vi"
      suppressHydrationWarning
      className={`${roboto.variable} ${roboto.className} h-full antialiased`}
    >
      <body
        suppressHydrationWarning
        className={`${roboto.className} min-h-full flex flex-col overflow-x-hidden bg-[#112017] text-[#f4f7f5] selection:bg-[#B84E2E] selection:text-white`}
      >
        <Script
          id="remove-bis-skin"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              try {
                new MutationObserver(function(mutations) {
                  for (var i = 0; i < mutations.length; i++) {
                    var m = mutations[i];
                    if (m.type === 'attributes' && m.attributeName === 'bis_skin_checked') {
                      m.target.removeAttribute('bis_skin_checked');
                    }
                  }
                }).observe(document.documentElement, { attributes: true, subtree: true, attributeFilter: ['bis_skin_checked'] });
              } catch (e) {}
            `
          }}
        />
        <LanguageProvider>
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}
