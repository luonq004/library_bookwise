import { auth } from "@/auth";
import Header from "@/components/HeaderComponent";
import { redirect } from "next/navigation";
import { ReactNode } from "react";

const Layout = async ({ children }: { children: ReactNode }) => {
  const session = await auth();
  console.log("Session in layout:", session);

  if (!session) redirect("/sign-in");

  return (
    <main className="bg-[url('/images/pattern.webp')] root-container">
      <div className="mx-auto max-w-7xl">
        <Header session={session} />

        <div className="mt-20 pb-20">{children}</div>
      </div>
    </main>
  );
};

export default Layout;
