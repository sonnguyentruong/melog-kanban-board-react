import { useState } from "react";
import { Id, Task } from "../types";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { getTaskTypeClasses, getTaskTypeIcon, getPriorityColor } from "../utils";

interface Props {
  task: Task;
  deleteTask: (id: Id) => void;
  updateTask: (id: Id, description: string) => void;
}

const TaskCard = ({ task, updateTask }: Props) => {
  const [editMode, setEditMode] = useState(false);
  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: task.id,
    data: { type: "Task", task },
    disabled: editMode,
  });
  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  const toggleEditMode = () => {
    setEditMode((prev) => !prev);
  };

  if (isDragging) {
    return (
      <div
        ref={setNodeRef}
        style={style}
        className="bg-white/80 shadow-lg opacity-50 p-4 min-h-[120px] flex items-start rounded-lg border-2 border-dashed border-slate-300 cursor-grab relative"
      />
    );
  }

  if (editMode) {
    return (
      <div
        {...attributes}
        {...listeners}
        ref={setNodeRef}
        style={style}
        className="bg-white p-4 min-h-[120px] flex items-start rounded-lg shadow-sm border border-slate-200 focus-within:ring-2 focus-within:ring-blue-400 focus-within:border-blue-400 cursor-grab relative"
      >
        <textarea
          className="w-full resize-none border-none rounded bg-transparent text-slate-800 text-sm leading-relaxed focus:outline-none placeholder-slate-400"
          value={task.description}
          autoFocus
          placeholder="What needs to be done?"
          onBlur={toggleEditMode}
          onKeyDown={(e) => {
            if (e.shiftKey && e.key == "Enter") toggleEditMode();
          }}
          onChange={(e) => updateTask(task.id, e.target.value)}
        ></textarea>
      </div>
    );
  }

  return (
    <div
      onClick={toggleEditMode}
      {...attributes}
      {...listeners}
      ref={setNodeRef}
      style={style}
      className="relative group bg-white rounded-lg border shadow-sm transition-all duration-200 my-2 select-none border-gray-200 hover:shadow-md hover:-translate-y-0.5"
    >
      {/* Priority Indicator */}
      <div className={`h-1 w-full ${getPriorityColor(task.type)} rounded-t-lg`}></div>

      {/* Task Header */}
      <div className="p-4 flex flex-col">
        <div className="flex justify-between items-start mb-3">
          <div
            className={`inline-flex items-center gap-1.5 px-2 py-1 rounded-md text-xs font-medium border ${getTaskTypeClasses(
              task.type
            )}`}
          >
            {getTaskTypeIcon(task.type)}
            {task.type}
          </div>
          <div className="flex items-center gap-1">
            <button className="opacity-0 group-hover:opacity-100 w-6 h-6 rounded hover:bg-gray-100 flex items-center justify-center transition-all duration-200">
              <svg
                className="w-3 h-3 text-gray-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </button>
            <button className="opacity-0 group-hover:opacity-100 w-6 h-6 rounded hover:bg-gray-100 flex items-center justify-center transition-all duration-200">
              <svg
                className="w-3 h-3 text-gray-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
                />
              </svg>
            </button>
          </div>
        </div>
        {/* Task Content */}
        <div className="flex-1 mb-3">
          <p className="text-slate-800 text-sm leading-relaxed whitespace-pre-wrap break-words task-description pb-1">
            {task.description}
          </p>
          <p className="text-xs text-blue-600 font-mono font-medium">
            {task.id}
          </p>
        </div>
        {/* Task Metadata */}
        <div className="flex items-center justify-between ">
          <div className="flex items-center gap-2">
            {/* Story Points */}
            <div className="w-6 h-6 bg-gray-100 rounded text-xs font-bold text-gray-600 flex items-center justify-center">
              {Math.floor(Math.random() * 8) + 1}
            </div>

            {/* Labels */}
            <div className="flex gap-1">
              <span className="px-2 py-0.5 bg-purple-100 text-purple-700 text-xs rounded-full font-medium">
                Frontend
              </span>
            </div>
          </div>

          {/* Assignee */}
          <div className="flex items-center gap-2">
            {task.assignee ? (
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 text-white flex items-center justify-center text-xs font-semibold shadow-sm">
                  {task.assignee.charAt(0).toUpperCase()}
                </div>
              </div>
            ) : (
              <div className="w-7 h-7 rounded-full border-2 border-dashed border-gray-300 flex items-center justify-center">
                <svg
                  className="w-3 h-3 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 4v16m8-8H4"
                  />
                </svg>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
