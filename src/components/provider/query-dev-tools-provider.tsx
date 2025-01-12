import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

//* React query devtools provider component
const QueryDevTools = () => {
  if (import.meta.env.PROD) return null;
  return <ReactQueryDevtools initialIsOpen={false} />;
};

export default QueryDevTools;
