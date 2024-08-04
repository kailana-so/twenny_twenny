import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter'
import theme from '../theme'
import { ThemeProvider } from '@mui/material/styles';
import { Grid } from "@mui/material";

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
      <link rel="icon" href="/ks.png" />
      <body 
        className={montserrat.className}
        suppressHydrationWarning={true}
        >
          <AppRouterCacheProvider  options={{ enableCssLayer: true }}>
            <ThemeProvider theme={theme}>
              <Grid sx={{ m: 2 }}>
                {children}
              </Grid>
            </ThemeProvider>
          </AppRouterCacheProvider>
        </body>
    </html>
  );
}
