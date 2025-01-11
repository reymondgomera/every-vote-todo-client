import { DotBackgroundWrapper } from "@/components/dot-background";
import { ThemeToggle } from "@/components/mode-toggle";

const LoginPage = () => {
  return (
    <section className="relative flex h-screen w-full items-center justify-center font-inter">
      <DotBackgroundWrapper>
        <div className="absolute -top-4 right-5">
          <ThemeToggle />
        </div>
      </DotBackgroundWrapper>
    </section>
  );
};
export default LoginPage;
