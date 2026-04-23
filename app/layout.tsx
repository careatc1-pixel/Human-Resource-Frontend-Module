import type { Metadata } from 'next';
import ClientProvider from '@/components/ClientProvider';
import './globals.css';
import { Geist } from "next/font/google";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

export const metadata: Metadata = {
  title: 'Discretal',
  description:
    'Discretal is a secure digital platform designed to protect and manage your sensitive information with advanced encryption and seamless accessibility.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={cn("font-sans", geist.variable)}>
      <body>
          {children}
          <ClientProvider />
      </body>
    </html>
  );
}
