import {useMemo, useState} from "react"
import { Column, Id } from "../types"
import { useSortable, SortableContext } from '@dnd-kit/sortable';
import { CSS } from "@dnd-kit/utilities"
import PlusIcon from "../icons/PlusIcon";
import { Task } from "../types";
import TaskCard from "./TaskCard";

type Props = {
    column: Column;
    tasks: Task[];
    createTask: (columnId: Id) => void;
    deleteTask: (id: Id) => void;
    updateTask: (id:Id, content:string) => void;
}

const ColumnContainer = ( props:Props ) => {

    const [editMode, setEditMode] = useState(false);
    const { column, createTask, tasks, deleteTask, updateTask } = props;
    const tasksIds = useMemo(() => {
        return tasks.map((task) => task.id);
      }, [tasks]);
    const { setNodeRef, attributes, listeners, transform, transition, isDragging } = useSortable({
        id: column.id,
        data:{ type: "Column", column },
        disabled: editMode,
    });
    const style = {
        transition,
        transform: CSS.Transform.toString(transform)
    };

    if (isDragging){
        return <div ref={setNodeRef} style={style}
            className="w-[320px] h-[600px] bg-white/50 border-2 border-dashed border-slate-300 rounded-xl opacity-60 shadow-lg" />
    }

  return (

    <div ref={setNodeRef} style={style}
        className="w-[320px] bg-white rounded-xl shadow-sm border border-slate-200 flex flex-col min-h-[600px] hover:shadow-md transition-all duration-200">
        {/* Column Header */}
        <div {...attributes} {...listeners} onClick={()=>{setEditMode(true)}}
            className="p-5 border-b border-slate-100 bg-slate-50/50 rounded-t-xl cursor-grab select-none">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <h3 className="text-sm font-semibold text-slate-700 uppercase tracking-wide">
                        {column.title}
                    </h3>
                    <span className="bg-slate-200 text-slate-600 text-xs font-medium px-2 py-1 rounded-full">
                        {tasks.length}
                    </span>
                </div>
            </div>
        </div>
            

        {/* Tasks List */}
        <div className="flex-1 p-4 space-y-3 overflow-y-auto max-h-[480px] column-scroll">
            <SortableContext items={tasksIds}>
                {tasks.map((task) => (
                    <TaskCard key={task.id} task={task} deleteTask={deleteTask} updateTask={updateTask}/>
                ))}
            </SortableContext>
        </div>
        {/* Add Task Button */}
        <div className="p-4 border-t border-slate-100">
            <button onClick={()=>createTask(column.id)}
                className="w-full flex items-center justify-center gap-2 py-3 px-4 text-slate-600 hover:text-slate-800 hover:bg-slate-50 rounded-lg transition-all duration-150 border border-dashed border-slate-300 hover:border-slate-400 group">
                <PlusIcon/>
                <span className="text-sm font-medium">Add a card</span>
            </button>
        </div>

        </div>
  )
}

export default ColumnContainer