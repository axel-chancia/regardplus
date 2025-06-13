import type { Metadata } from "next";


export const metadata: Metadata = {
  title: "login page",
  description: "Page de connexion avec l'id lorsqu'on ne peut pas scanner",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <main
       
      >
        {children}
      </main>
  );
}
