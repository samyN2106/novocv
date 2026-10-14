import "./globals.css";
import { Inter } from 'next/font/google'
import { SessionProvider } from "next-auth/react"
 
// If loading a variable font, you don't need to specify the font weight
const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
})
  
export const metadata = {
  title: "novocv",
  description: "Créez un CV professionnel, moderne et personnalisé en quelques minutes. Choisissez votre modèle, valorisez vos compétences et expériences, puis préparez un CV adapté à vos objectifs professionnels.",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="fr"
      className={`h-full antialiased text-[62.5%] ${inter.className}`}
    >
      <SessionProvider>
          <body className={`min-h-full flex flex-col`}>{children}</body>
      </SessionProvider>
    </html>
  );
}
