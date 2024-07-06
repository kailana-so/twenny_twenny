import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter'
import theme from '../theme'
import { ThemeProvider } from '@mui/material/styles';

const montserrat = Montserrat({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Kailana",
  description: "Fullstack En",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body 
        className={montserrat.className}
        suppressHydrationWarning={true}
        >
          <AppRouterCacheProvider  options={{ enableCssLayer: true }}>
            <ThemeProvider theme={theme}>
              {children}
            </ThemeProvider>
          </AppRouterCacheProvider>
        </body>
    </html>
  );
}
