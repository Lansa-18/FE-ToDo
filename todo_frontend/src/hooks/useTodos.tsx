import { useQuery } from "@tanstack/react-query";
import { getTodos } from "../lib/api";

export function useTodos() {
  const {
    data: todos,
    isLoading,
    isError,
  } = useQuery({ queryKey: ["todos"], queryFn: () => getTodos() });

  return { todos, isLoading, isError };
}
