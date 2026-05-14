import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "FitBuddy - 你的智能健身助手",
  description: "陪你轻松练，每一步都算数",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-CN" className="h-full">
      <body className="h-full">{children}</body>
    </html>
  );
}
