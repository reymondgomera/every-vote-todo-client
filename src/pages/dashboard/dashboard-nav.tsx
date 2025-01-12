import { Link } from "react-router";
import { NotebookPen } from "lucide-react";

import UserButton from "./user-button";
import { ThemeToggle } from "@/components/mode-toggle";
import { useAuth } from "@/hooks/useAuth";

//* Dashboard nav component
const DashboardNav = () => {
  const { user, setToken } = useAuth();

  const signOut = () => {
    setToken(null);
    window.location.href = "/login";
  };

  return (
    <header className="h-[80px] w-full bg-transparent px-6">
      <nav className="flex items-center justify-between py-5">
        <Link
          to="/"
          className="text-balance text-center text-xl font-extrabold"
        >
          EveryVote{" "}
          <span className="relative">
            <span className="text-primary">Todo</span>
            <NotebookPen className="absolute -right-5 top-0 size-4" />
          </span>
        </Link>

        <div className="flex w-[100px] items-center gap-x-3">
          <ThemeToggle />
          <UserButton user={user} signOut={signOut} />
        </div>
      </nav>
    </header>
  );
};

export default DashboardNav;
