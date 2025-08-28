import { TASK_TYPE_CONFIG, DEFAULT_TASK_CONFIG } from '../constants/taskTypes';

/**
 * Get CSS classes for task type styling
 */
export const getTaskTypeClasses = (type: string): string => {
  const normalizedType = type.toLowerCase();
  
  if (normalizedType in TASK_TYPE_CONFIG) {
    return TASK_TYPE_CONFIG[normalizedType as keyof typeof TASK_TYPE_CONFIG].colorClasses;
  }
  
  return DEFAULT_TASK_CONFIG.colorClasses;
};

/**
 * Get priority color for task type
 */
export const getPriorityColor = (type: string): string => {
  const normalizedType = type.toLowerCase();
  
  if (normalizedType in TASK_TYPE_CONFIG) {
    return TASK_TYPE_CONFIG[normalizedType as keyof typeof TASK_TYPE_CONFIG].priorityColor;
  }
  
  return DEFAULT_TASK_CONFIG.priorityColor;
};
