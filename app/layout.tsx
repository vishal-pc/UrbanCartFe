import "./globals.css";
import { Navbar } from "./components/navbar";
import { Footer } from "./components/footer";
import "./style/app.css"



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-gray-200 text-gray-600 work-sans leading-normal text-base tracking-normal" suppressHydrationWarning={true}>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
