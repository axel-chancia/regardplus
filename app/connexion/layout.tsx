import type { Metadata } from "next";


export const metadata: Metadata = {
  title: "login page",
  description: "Page de connexion avec scan",
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
