import { useState, useMemo } from "react"
import { Column, Id, Task } from "../types"
import ColumnContainer from "./ColumnContainer"
import { DndContext, DragOverlay, DragStartEvent, DragOverEvent, useSensors, useSensor, PointerSensor } from "@dnd-kit/core"
import { SortableContext, arrayMove } from "@dnd-kit/sortable"
import { createPortal } from "react-dom"
import TaskCard from "./TaskCard"


const KanbanBoard = () => {

    // Hardcoded columns for Jira-like board
    const initialColumns: Column[] = [
        { id: 'todo', title: 'TO DISCUSS' },
        { id: 'inprogress', title: 'READY FOR DEV' },
        { id: 'review', title: 'REVIEW' },
        { id: 'done', title: 'IN DEVELOPMENT' },
    ];
    const [columns] = useState<Column[]>(initialColumns)
    // Remove setColumns, columns are fixed
    const [activeColumn, setActiveColumn] = useState<Column | null>(null)
    const [activeTask, setActiveTask] = useState<Task | null>(null)
    const [tasks, setTasks] = useState<Task[]>([
        {
            id: 1,
            columnId: 'todo',
            content: 'Review user feedback from latest sprint demo'
        },
        {
            id: 2,
            columnId: 'todo',
            content: 'Update API documentation for new endpoints'
        },
        {
            id: 3,
            columnId: 'inprogress',
            content: 'Implement user authentication flow'
        },
        {
            id: 4,
            columnId: 'inprogress',
            content: 'Design mobile responsive layouts'
        },
        {
            id: 5,
            columnId: 'review',
            content: 'Code review for payment integration'
        },
        {
            id: 6,
            columnId: 'done',
            content: 'Setup CI/CD pipeline for automated testing'
        }
    ])
    const columnsId = useMemo(() => columns.map((col) => col.id), [columns])
    const sensors = useSensors(useSensor(PointerSensor, {
        activationConstraint: { distance: 3 }
    }))


    // Remove add/delete column functionality
    function generateId () {
        return Math.floor(Math.random() * 1000) + 1;
    }

    function createTask (columnId: Id) {
        const newTask: Task = {
            id: generateId(),
            columnId,
            content: `Task ${tasks.length + 1}`,
        };
        setTasks([...tasks, newTask])

    }

    function deleteTask (id:Id) {
        const newTasks = tasks.filter((task)=> task.id!==id);
        setTasks(newTasks)
    }

    function updateTask (id:Id, content:string) {
        const newTasks = tasks.map((task)=>{
            if(task.id !== id) return task;
            return{...task, content}
        })
        setTasks(newTasks)
    }

    function onDragStart (event: DragStartEvent) {
        console.log("Drag Start", event)
        if (event.active.data.current?.type === "Column") {
            setActiveColumn(event.active.data.current.column);
            return;
        }
        if (event.active.data.current?.type === "Task") {
            setActiveTask(event.active.data.current.task);
            return;
        }
    }

    function onDragEnd () {
        setActiveColumn(null);
        setActiveTask(null);
        // Columns are fixed, so do not reorder columns
    }

    function onDragOver (event: DragOverEvent) {
        const {active, over} = event;
        if(!over) return;

        const activeId = active.id;
        const overId = over.id;

        if (activeId === overId) return;
        const isActiveATask = active.data.current?.type === "Task";
        const isOverATask = over.data.current?.type === "Task";

        if(!isActiveATask) return;

        // dropping a task over another task
        if(isActiveATask && isOverATask){
            setTasks((tasks)=>{
                const activeIndex = tasks.findIndex((t)=>t.id === activeId);
                const overIndex = tasks.findIndex((t)=> t.id === overId);
                tasks[activeIndex].columnId = tasks[overIndex].columnId
                return arrayMove(tasks, activeIndex, overIndex)
            })
        }

        const isOverAColumn = over.data.current?.type === "Column";
        //dorpping a task over another coloumn
        if (isActiveATask && isOverAColumn){
            setTasks((tasks)=>{
                const activeIndex = tasks.findIndex((t)=>t.id === activeId);
                tasks[activeIndex].columnId = overId
                return arrayMove(tasks, activeIndex, activeIndex)
            }) 
        }
    }   

    return (
        <div
            className="min-h-screen w-full bg-gradient-to-br from-[#f8fafc] to-[#e2e8f0] p-8"
        >
            <div className="max-w-[1600px] mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-slate-800 mb-2">Melog - Project Board</h1>
                    <p className="text-slate-600">Manage your team's work and track progress</p>
                </div>
                
                <DndContext sensors={sensors} onDragStart={onDragStart} onDragEnd={onDragEnd} onDragOver={onDragOver}>
                    <div className="flex gap-6 overflow-x-auto pb-4 column-scroll">
                        <SortableContext items={columnsId}>
                            {columns.map((col) => (
                                <ColumnContainer
                                    key={col.id}
                                    column={col}
                                    createTask={createTask}
                                    tasks={tasks.filter((task) => task.columnId === col.id)}
                                    deleteTask={deleteTask}
                                    updateTask={updateTask}
                                />
                            ))}
                        </SortableContext>
                    </div>
                    {createPortal(
                        <DragOverlay>
                            {activeColumn && (
                                <ColumnContainer
                                    column={activeColumn}
                                    createTask={createTask}
                                    tasks={tasks.filter((task) => task.columnId === activeColumn.id)}
                                    deleteTask={deleteTask}
                                    updateTask={updateTask}
                                />
                            )}
                            {activeTask && <TaskCard task={activeTask} deleteTask={deleteTask} updateTask={updateTask} />}
                        </DragOverlay>,
                        document.body
                    )}
                </DndContext>
            </div>
        </div>
    )
}

export default KanbanBoard