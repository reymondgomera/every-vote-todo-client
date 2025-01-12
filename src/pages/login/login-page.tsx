import { DotBackgroundWrapper } from "@/components/dot-background";
import { ThemeToggle } from "@/components/mode-toggle";
import LoginForm from "./login-form";

const LoginPage = () => {
  return (
    <section className="relative flex h-screen w-full items-center justify-center font-inter">
      <DotBackgroundWrapper>
        <div className="absolute -top-4 right-5">
          <ThemeToggle />
        </div>

        <LoginForm />
      </DotBackgroundWrapper>
    </section>
  );
};
export default LoginPage;
