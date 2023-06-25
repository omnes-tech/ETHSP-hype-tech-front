import { Layout } from "@/components/Shared/Layout";
import "./globals.css";
import { Providers } from "@/components/Shared/Providers";

export const metadata = {
  title: "HYPE-TECH",
  description: "HYPE-TECH",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
