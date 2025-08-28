export const TASK_TYPES = {
  TASK: 'task',
  STORY: 'story',
  BUG: 'bug',
} as const;

export type TaskType = typeof TASK_TYPES[keyof typeof TASK_TYPES];

export const TASK_TYPE_CONFIG = {
  [TASK_TYPES.TASK]: {
    label: 'Task',
    colorClasses: 'bg-blue-50 text-blue-700 border-blue-200',
    priorityColor: 'bg-blue-500',
  },
  [TASK_TYPES.STORY]: {
    label: 'Story',
    colorClasses: 'bg-green-50 text-green-700 border-green-200',
    priorityColor: 'bg-green-500',
  },
  [TASK_TYPES.BUG]: {
    label: 'Bug',
    colorClasses: 'bg-red-50 text-red-700 border-red-200',
    priorityColor: 'bg-red-500',
  },
} as const;

export const DEFAULT_TASK_CONFIG = {
  colorClasses: 'bg-gray-50 text-gray-700 border-gray-200',
  priorityColor: 'bg-gray-500',
};
