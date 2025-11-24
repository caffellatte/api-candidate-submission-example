import { Link } from "@heroui/link";

import { Navbar } from "~/app/components/navbar";

export default function DefaultLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative flex flex-col h-screen">
      <Navbar />
      <main className="container mx-auto max-w-7xl px-6 flex-grow flex items-center justify-center">
        {children}
      </main>
      <footer className="w-full flex items-center justify-center py-3">
        <Link
          isExternal
          className="flex items-center gap-1 text-current"
          href="https://github.com/caffellatte"
          title="caffellatte github"
        >
          <span className="text-default-600">Created by</span>
          <p className="text-primary">caffellatte</p>
        </Link>
      </footer>
    </div>
  );
}
