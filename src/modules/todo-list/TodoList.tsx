import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { todoListApi } from "./api";
import { useState } from "react";
import cn from "classnames";

export function TodoList() {
  const [page, setPage] = useState(1);
  const [enabled, setEnabled] = useState(false);

  const {
    data: todoItems,
    error,
    isLoading,
    isPlaceholderData,
  } = useQuery({
    queryKey: ["tasks", "list", { page }],
    queryFn: (meta) => todoListApi.getTodoList({ page }, meta),
    placeholderData: keepPreviousData,
    enabled,
  });

  if (isLoading) {
    return <div>Loading</div>;
  }

  if (error) {
    return <div>error: {JSON.stringify(error)}</div>;
  }

  return (
    <div className="p-5 mx-auto max-w-[1200px] mt-10">
      <h1 className="text-3xl font-bold underline mb-5">Todo List</h1>
      <button
        className="border border-cyan-300 rounded mb-2 p-2 hover:bg-cyan-200"
        onClick={() => setEnabled((prev) => !prev)}
      >
        {enabled ? "Disable request" : "Enable request"}
      </button>

      <div
        className={cn("flex flex-col gap-4", {
          ["opacity-50"]: isPlaceholderData,
        })}
      >
        {todoItems?.data.map((todo) => (
          <div key={todo.id} className="border border-slate-300 rounded p-3">
            {todo.text}
          </div>
        ))}
      </div>

      <div className="flex gap-2 mt-4">
        <button onClick={() => setPage((p) => Math.max(1, p - 1))} className="p-3 rounded border border-teal-500">
          prev
        </button>
        <button
          onClick={() => setPage((p) => Math.min(p + 1, todoItems?.pages ?? 1))}
          className="p-3 rounded border border-teal-500"
        >
          next
        </button>
      </div>
    </div>
  );
}
