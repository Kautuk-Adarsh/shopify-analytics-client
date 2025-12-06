import './globals.css';

export const metadata = {
  title: 'Xeno Dashboard',
  description: 'Shopify Data Ingestion & Insights',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}