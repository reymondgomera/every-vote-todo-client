import { AxiosError } from "axios";
import { toast } from "sonner";

//* Handle axios error
export const handleAxiosError = (err: unknown) => {
  if (err instanceof AxiosError) {
    const data = err.response?.data ?? "Something wenth wrong. Please try again."; // prettier-ignore
    if (data?.message) toast.error(data.message);
    return;
  } else if (err instanceof Error) {
    toast.error(err.message);
    return;
  }

  toast.error("Unknown error occurred.");
};
