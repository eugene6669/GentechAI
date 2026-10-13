import { useState } from 'react';
import {
  PlusIcon,
  EllipsisVerticalIcon,
} from '@heroicons/react/24/outline';

/**
 * TaskBoard — Kanban-style task board with 5 columns
 * 
 * Columns: NEW, IN PROGRESS, URGENT, HOLD, DONE
 */

interface Task {
  id: string;
  title: string;
  description?: string;
  column: TaskColumn;
  createdAt: Date;
}

type TaskColumn = 'NEW' | 'IN_PROGRESS' | 'URGENT' | 'HOLD' | 'DONE';

const columns: { id: TaskColumn; label: string; color: string }[] = [
  { id: 'NEW', label: 'NEW', color: 'bg-blue-100 text-blue-700 border-blue-200' },
  { id: 'IN_PROGRESS', label: 'IN PROGRESS', color: 'bg-purple-100 text-purple-700 border-purple-200' },
  { id: 'URGENT', label: 'URGENT', color: 'bg-red-100 text-red-700 border-red-200' },
  { id: 'HOLD', label: 'HOLD', color: 'bg-yellow-100 text-yellow-700 border-yellow-200' },
  { id: 'DONE', label: 'DONE', color: 'bg-green-100 text-green-700 border-green-200' },
];

export function TaskBoard() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [showAddTask, setShowAddTask] = useState<TaskColumn | null>(null);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskDescription, setNewTaskDescription] = useState('');

  const getTasksByColumn = (column: TaskColumn) => {
    return tasks.filter(task => task.column === column);
  };

  const addTask = (column: TaskColumn) => {
    if (!newTaskTitle.trim()) return;

    const task: Task = {
      id: Date.now().toString(),
      title: newTaskTitle,
      description: newTaskDescription,
      column,
      createdAt: new Date(),
    };

    setTasks([...tasks, task]);
    setNewTaskTitle('');
    setNewTaskDescription('');
    setShowAddTask(null);
  };

  const moveTask = (taskId: string, newColumn: TaskColumn) => {
    setTasks(tasks.map(task => 
      task.id === taskId ? { ...task, column: newColumn } : task
    ));
  };

  const deleteTask = (taskId: string) => {
    setTasks(tasks.filter(task => task.id !== taskId));
  };

  return (
    <div className="h-full flex flex-col">
      <div className="flex-1 overflow-x-auto">
        <div className="min-w-max flex gap-4 p-6 h-full">
          {columns.map((column) => {
            const columnTasks = getTasksByColumn(column.id);
            
            return (
              <div
                key={column.id}
                className="flex flex-col w-80 bg-surface rounded-card border border-border"
              >
                {/* Column header */}
                <div className="p-4 border-b border-border">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <h3 className="font-heading font-semibold text-sm text-charcoal">
                        {column.label}
                      </h3>
                      <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${column.color}`}>
                        {columnTasks.length}
                      </span>
                    </div>
                    <button
                      onClick={() => setShowAddTask(column.id)}
                      className="p-1 hover:bg-sand rounded transition-colors"
                      title="Add task"
                    >
                      <PlusIcon className="w-5 h-5 text-muted" />
                    </button>
                  </div>
                </div>

                {/* Column content */}
                <div className="flex-1 p-3 space-y-3 overflow-y-auto">
                  {/* Add task form */}
                  {showAddTask === column.id && (
                    <div className="p-3 bg-canvas rounded-card border border-border">
                      <input
                        type="text"
                        placeholder="Task title"
                        value={newTaskTitle}
                        onChange={(e) => setNewTaskTitle(e.target.value)}
                        className="w-full px-3 py-2 mb-2 border border-border rounded text-sm focus:outline-none focus:ring-2 focus:ring-orange"
                        autoFocus
                      />
                      <textarea
                        placeholder="Description (optional)"
                        value={newTaskDescription}
                        onChange={(e) => setNewTaskDescription(e.target.value)}
                        className="w-full px-3 py-2 mb-2 border border-border rounded text-sm resize-none focus:outline-none focus:ring-2 focus:ring-orange"
                        rows={2}
                      />
                      <div className="flex gap-2">
                        <button
                          onClick={() => addTask(column.id)}
                          className="px-3 py-1.5 bg-orange text-white text-sm rounded-button hover:bg-[#E64800] transition-colors"
                        >
                          Add
                        </button>
                        <button
                          onClick={() => {
                            setShowAddTask(null);
                            setNewTaskTitle('');
                            setNewTaskDescription('');
                          }}
                          className="px-3 py-1.5 border border-border text-sm rounded-button hover:bg-sand transition-colors"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Tasks */}
                  {columnTasks.map((task) => (
                    <TaskCard
                      key={task.id}
                      task={task}
                      onMove={moveTask}
                      onDelete={deleteTask}
                      columns={columns}
                    />
                  ))}

                  {columnTasks.length === 0 && showAddTask !== column.id && (
                    <div className="text-center py-8 text-muted text-sm">
                      No tasks yet
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function TaskCard({ 
  task, 
  onMove, 
  onDelete,
  columns 
}: { 
  task: Task; 
  onMove: (id: string, column: TaskColumn) => void;
  onDelete: (id: string) => void;
  columns: { id: TaskColumn; label: string; color: string }[];
}) {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <div className="p-3 bg-white rounded-card border border-border hover:border-orange transition-colors group relative">
      <div className="flex items-start justify-between mb-2">
        <h4 className="text-sm font-medium text-charcoal flex-1 pr-2">
          {task.title}
        </h4>
        <button
          onClick={() => setShowMenu(!showMenu)}
          className="opacity-0 group-hover:opacity-100 p-1 hover:bg-sand rounded transition-opacity"
        >
          <EllipsisVerticalIcon className="w-4 h-4 text-muted" />
        </button>
      </div>

      {task.description && (
        <p className="text-xs text-muted mb-2">{task.description}</p>
      )}

      <div className="text-xs text-muted">
        {new Date(task.createdAt).toLocaleDateString()}
      </div>

      {/* Menu */}
      {showMenu && (
        <>
          <div 
            className="fixed inset-0 z-10" 
            onClick={() => setShowMenu(false)}
          />
          <div className="absolute right-3 top-10 w-48 bg-surface border border-border rounded-card shadow-lg py-1 z-20">
            <div className="px-3 py-2 text-xs font-semibold text-muted">Move to</div>
            {columns.map((col) => (
              col.id !== task.column && (
                <button
                  key={col.id}
                  onClick={() => {
                    onMove(task.id, col.id);
                    setShowMenu(false);
                  }}
                  className="w-full text-left px-3 py-2 text-sm hover:bg-sand transition-colors"
                >
                  {col.label}
                </button>
              )
            ))}
            <div className="border-t border-border my-1" />
            <button
              onClick={() => {
                onDelete(task.id);
                setShowMenu(false);
              }}
              className="w-full text-left px-3 py-2 text-sm text-error hover:bg-sand transition-colors"
            >
              Delete
            </button>
          </div>
        </>
      )}
    </div>
  );
}
