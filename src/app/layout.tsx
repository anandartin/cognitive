import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Cognitive Engine - Multi-Format Product Builder",
  description: "Build any product using prompts with adaptive UI across all form factors",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
