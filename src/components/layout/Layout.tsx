import { ReactNode } from "react";
import { useLocation } from "react-router-dom";
import SiteSeo from "@/components/SiteSeo";
import Header from "./Header";
import Footer from "./Footer";
import Aside from "./Aside";

interface LayoutProps {
  children: ReactNode;
  showAside?: boolean;
}

const Layout = ({ children, showAside = true }: LayoutProps) => {
  const { pathname } = useLocation();
  const isWriting = pathname.startsWith("/writing");

  return (
    <div className="min-h-screen flex flex-col">
      {!isWriting && <SiteSeo />}
      <div className="flex-1 flex justify-center">
        <div className="flex w-full max-w-5xl px-6">
          <Header />
        </div>
      </div>
      <div className="flex-1 flex justify-center">
        <div className="flex w-full max-w-5xl px-6">
          <main className="flex-1 max-w-[720px]">{children}</main>
          {showAside && <Aside />}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
