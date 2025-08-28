export type Id = string | number;

export type Column ={
    id: Id;
    title: string;
}

export type Task = {
    id: string;
    columnId: Id;
    description: string;
    type: string;
    assignee?: string;
}