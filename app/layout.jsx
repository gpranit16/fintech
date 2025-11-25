import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'FINTECH - Fast Automated Lending',
  description: 'Instant loan decisions powered by AI. Upload documents, get verified, receive decision in under 2 minutes.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
