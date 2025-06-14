import type { Metadata } from "next";


export const metadata: Metadata = {
  title: "user page",
  description: "Liste des utilisateurs",
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
