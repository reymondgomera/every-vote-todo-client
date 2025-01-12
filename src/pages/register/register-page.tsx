import { DotBackgroundWrapper } from "@/components/dot-background";
import { ThemeToggle } from "@/components/mode-toggle";
import RegisterForm from "./register-form";

//* Register page component
const RegisterPage = () => {
  return (
    <section className="relative flex h-screen w-full items-center justify-center font-inter">
      <DotBackgroundWrapper>
        <div className="absolute -top-4 right-5">
          <ThemeToggle />
        </div>

        <RegisterForm />
      </DotBackgroundWrapper>
    </section>
  );
};

export default RegisterPage;
