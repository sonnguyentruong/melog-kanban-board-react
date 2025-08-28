import { useState } from "react";
import TrashIcon from "../icons/TrashIcon";
import { Id, Task } from "../types"
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from "@dnd-kit/utilities"

interface Props {
    task: Task;
    deleteTask: (id:Id) => void
    updateTask: (id:Id, content:string) => void
}

const TaskCard = ( {task, deleteTask, updateTask}:Props ) => {

    const [mouseIsOver, setMouseIsOver] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const { setNodeRef, attributes, listeners, transform, transition, isDragging } = useSortable({
        id: task.id,
        data:{ type: "Task", task },
        disabled: editMode,
    });
    const style = {
        transition,
        transform: CSS.Transform.toString(transform)
    };
    
    const toggleEditMode = () => {
        setEditMode((prev)=> !prev)
    }

    if(isDragging) {
        return <div ref={setNodeRef} style={style}
        className="bg-white/80 shadow-lg opacity-50 p-4 min-h-[120px] flex items-start rounded-lg border-2 border-dashed border-slate-300 cursor-grab relative"/>
    }

    if (editMode) {
        return (
            <div {...attributes} {...listeners}
            ref={setNodeRef} style={style}
            className="bg-white p-4 min-h-[120px] flex items-start rounded-lg shadow-sm border border-slate-200 focus-within:ring-2 focus-within:ring-blue-400 focus-within:border-blue-400 cursor-grab relative">
                <textarea className="w-full resize-none border-none rounded bg-transparent text-slate-800 text-sm leading-relaxed focus:outline-none placeholder-slate-400"
                value={task.content} autoFocus
                placeholder="What needs to be done?"
                onBlur={toggleEditMode}
                onKeyDown={(e)=>{
                    if(e.shiftKey && e.key == "Enter") toggleEditMode();
                }}
                onChange={(e)=>updateTask(task.id, e.target.value)}
                ></textarea>
        </div>
        )
    }

    return (
        <div onClick={toggleEditMode}
            onMouseEnter={()=>{setMouseIsOver(true)}}
            onMouseLeave={()=>{setMouseIsOver(false)}}
            {...attributes} {...listeners}
            ref={setNodeRef} style={style}
            className="bg-white p-4 min-h-[120px] flex items-start rounded-lg shadow-sm border border-slate-200 hover:shadow-md hover:border-slate-300 transition-all duration-200 cursor-grab relative group">
            <div className="flex-1">
                <p className="text-slate-800 text-sm leading-relaxed whitespace-pre-wrap break-words task-content">
                    {task.content}
                </p>
                {/* Task metadata - you can add more here */}
                <div className="flex items-center gap-2 mt-3">
                    <div className="flex items-center gap-1">
                        <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                        <span className="text-xs text-slate-500">Task</span>
                    </div>
                </div>
            </div>
            { mouseIsOver && (
                <button onClick={(e)=>{e.stopPropagation(); deleteTask(task.id)}}
                    className="ml-2 opacity-0 group-hover:opacity-100 stroke-slate-400 hover:stroke-red-500 hover:bg-red-50 p-1.5 rounded transition-all duration-150">
                    <TrashIcon/>
                </button>
            )}
        </div>
    )
}

export default TaskCard