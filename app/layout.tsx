import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "RBAC Tool",
  description: "Role Based Access Control System",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
