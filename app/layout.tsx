import type { Metadata } from "next";
import "./globals.css";
import { SessionWrapper } from "./components/SessionWrapper";
import { ThemeProvider } from "next-themes";
import { Navbar } from "./components/Navbar";
import Footer from "./components/Footer";
import { Toaster } from "@/components/ui/toaster"

export const metadata: Metadata = {
  title: "OpenSox - A platform for open source projects",
  description: "OpenSox is a platform for open source projects",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SessionWrapper>
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <Navbar/>
        {children}
        <Toaster />
        <Footer/>
        </ThemeProvider>
      </body>
    </html>
    </SessionWrapper>
  );
}
