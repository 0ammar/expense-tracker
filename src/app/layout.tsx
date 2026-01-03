import './globals.scss';

export const metadata = {
  title: 'Expense Tracker',
  description: 'Track your income and expenses efficiently',
  icons: {
    icon: "/logo.png",
    shortcut: "/logo.png",
    apple: '/logo.png',
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}