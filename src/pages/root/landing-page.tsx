import { DotBackgroundWrapper } from "@/components/dot-background";
import { ThemeToggle } from "@/components/mode-toggle";
import { buttonVariants } from "@/components/ui/button";
import { NotebookPen } from "lucide-react";
import { Link } from "react-router";

//* Landing page component
const LandingPage = () => {
  return (
    <section className="relative flex h-screen w-full items-center justify-center font-inter">
      <DotBackgroundWrapper>
        <div className="absolute -top-4 right-5">
          <ThemeToggle />
        </div>

        <div className="flex h-full w-full max-w-lg flex-col items-center justify-center gap-5 p-5 md:max-w-2xl">
          <div className="flex flex-col items-center justify-center gap-2">
            <h1 className="text-balance text-center text-3xl font-extrabold md:text-4xl lg:text-5xl">
              EveryVote{" "}
              <span className="relative">
                <span className="text-primary">Todo</span>
                <NotebookPen className="absolute -right-5 top-0 h-5 w-5" />
              </span>
            </h1>
            <p className="text-center text-sm leading-relaxed md:text-base">
              Organize, prioritize, and accomplish your tasks effortlessly with
              EveryVote Todo. The smarter way to stay on top of what matters
              most.
            </p>
          </div>

          <div className="flex gap-3.5">
            <Link
              to="/login"
              className={buttonVariants({ variant: "default" })}
            >
              Login
            </Link>

            <Link
              to="/register"
              className={buttonVariants({ variant: "outline" })}
            >
              Register
            </Link>
          </div>
        </div>
      </DotBackgroundWrapper>
    </section>
  );
};

export default LandingPage;
