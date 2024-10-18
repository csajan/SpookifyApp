import localFont from "next/font/local";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: "Spookify",
  description: "Insert spooky text",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider
      publishableKey={"pk_test_bWFzc2l2ZS1tdWxlLTkzLmNsZXJrLmFjY291bnRzLmRldiQ"}
      signInForceRedirectUrl={"/planner"}
    >
      <html lang="en">
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
