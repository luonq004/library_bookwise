import Header from "@/components/HeaderComponent";
import { ReactNode } from "react";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <main className="bg-[url('/images/pattern.webp')] root-container">
      <div className="mx-auto max-w-7xl">
        <Header />

        <div className="mt-20 pb-20">{children}</div>
      </div>
    </main>
  );
};

export default Layout;
