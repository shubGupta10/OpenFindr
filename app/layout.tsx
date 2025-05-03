import type { Metadata } from "next";
import "./globals.css";
import { SessionWrapper } from "./components/SessionWrapper";
import { ThemeProvider } from "next-themes";
import { Navbar } from "./components/Navbar";
import Footer from "./components/Footer";
import { Toaster } from "@/components/ui/toaster"

export const metadata = {
  title: "OpenFindr | Discover & Contribute to Open Source Projects",
  description: "Find beginner-friendly open source projects that match your skills and interests. Filter by programming language, difficulty level, and project activity to start contributing today.",
  keywords: "open source, github projects, beginner-friendly, code contribution, developer tools, programming, open source community",
  openGraph: {
    title: "OpenFindr - Connect with Perfect Open Source Projects",
    description: "Discover curated open source projects that match your skills. Filter by language, find beginner-friendly issues, and start contributing today.",
    images: [{ url: "/og-image.png" }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "OpenFindr | Find Your Next Open Source Project",
    description: "The intelligent platform for discovering open source projects that match your skills and interests.",
    images: ["/twitter-image.png"],
  },
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
