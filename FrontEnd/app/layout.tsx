import type { Metadata } from "next";
import { cormorant, inter } from "@/lib/fonts";
import { AuthProvider } from "@/context/AuthContext";
import { ToastProvider } from "@/context/ToastContext";
import "./globals.css";

export const metadata: Metadata = {
  title: "Casa Interior — Luxury Interior Design Studio",
  description:
    "Luxury interior design studio specializing in premium residential & commercial spaces, custom furniture, and architectural visualization.",
  keywords: ["interior design", "luxury", "residential", "commercial", "furniture design", "architectural visualization","casa","interior","design","studio","luxury","residential","commercial","furniture","design","architectural","visualization","luxury","interior","design","studio","luxury","residential","commercial","furniture","design","architectural","visualization","luxury","interior","design","studio","luxury","residential","commercial","furniture","design","architectural","visualization","luxury","interior","design","studio","luxury","residential","commercial","furniture","design","architectural","visualization","luxury","interior","design","studio","luxury","residential","commercial","furniture","design","architectural","visualization","luxury","interior","design","studio","luxury","residential","commercial","furniture","design","architectural","visualization","luxury","interior","design","studio","luxury","residential","commercial","furniture","design","architectural","visualization", "office design"],
  authors: [{ name: "Casa Interior Studio" }],
  openGraph: {
    title: "Casa Interior — Luxury Interior Design Studio",
    description: "Crafting extraordinary spaces that transcend expectations.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Casa Interior — Luxury Interior Design Studio",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${cormorant.variable} ${inter.variable}`} suppressHydrationWarning>
      <body className="bg-ivory antialiased">
        <AuthProvider>
          <ToastProvider>
            {children}
          </ToastProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
