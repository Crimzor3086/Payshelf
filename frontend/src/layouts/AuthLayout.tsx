import { Outlet } from "react-router-dom";
import Logo from "@/components/Logo";

const AuthLayout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-muted/30">
      {/* Simple Header */}
      <header className="border-b border-border bg-background">
        <div className="container flex h-16 items-center">
          <Logo />
        </div>
      </header>

      {/* Auth Content */}
      <main className="flex-1 flex items-center justify-center p-4 md:p-8">
        <Outlet />
      </main>

      {/* Simple Footer */}
      <footer className="border-t border-border bg-background py-4">
        <div className="container text-center">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} PayShelf. Secure payments made simple.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default AuthLayout;
