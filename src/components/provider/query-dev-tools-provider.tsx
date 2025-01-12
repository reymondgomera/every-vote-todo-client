import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const QueryDevTools = () => {
  if (import.meta.env.PROD) return null;
  return <ReactQueryDevtools initialIsOpen={false} />;
};

export default QueryDevTools;
