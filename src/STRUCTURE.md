# Project Structure Documentation

## Overview
This document describes the organized folder structure for better code maintainability and reusability.

## Folder Structure

### `/src/utils/`
Contains reusable utility functions that can be used across components.

- **`taskStyles.ts`** - Functions for styling tasks based on their type
  - `getTaskTypeClasses(type: string)` - Returns CSS classes for task type styling
  - `getPriorityColor(type: string)` - Returns priority color based on task type

- **`taskIcons.tsx`** - Functions for task type icons
  - `getTaskTypeIcon(type: string)` - Returns React icon component for task type

- **`index.ts`** - Barrel export for all utilities

### `/src/constants/`
Contains application constants and configuration objects.

- **`taskTypes.ts`** - Task type definitions and configurations
  - `TASK_TYPES` - Enum-like object for task types
  - `TASK_TYPE_CONFIG` - Configuration object with styling and colors for each task type
  - `DEFAULT_TASK_CONFIG` - Default configuration for unknown task types

- **`index.ts`** - Barrel export for all constants

### `/src/store/`
Placeholder for future state management implementation.

- **`index.ts`** - Contains placeholder structure for global state management

## Benefits

### 1. **Reusability**
- Utility functions can be used across multiple components
- Constants ensure consistency across the application

### 2. **Maintainability**
- Centralized styling logic makes updates easier
- Single source of truth for task type configurations

### 3. **Type Safety**
- TypeScript definitions for all constants and utilities
- Better IDE support and error catching

### 4. **Scalability**
- Easy to add new task types or styling options
- Prepared structure for state management

## Usage Examples

```typescript
// Using task utilities
import { getTaskTypeClasses, getTaskTypeIcon, getPriorityColor } from '../utils';

// Using constants
import { TASK_TYPES, TASK_TYPE_CONFIG } from '../constants';

// Example in component
const taskClasses = getTaskTypeClasses(task.type);
const taskIcon = getTaskTypeIcon(task.type);
const priorityColor = getPriorityColor(task.type);
```

## Migration Notes

The following functions were moved from `TaskCard.tsx` to utility files:
- `getTaskTypeClasses()` → `/utils/taskStyles.ts`
- `getTaskTypeIcon()` → `/utils/taskIcons.tsx`
- `getPriorityColor()` → `/utils/taskStyles.ts`

These functions now accept the task type as a parameter instead of accessing it from component context.
