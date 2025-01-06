"use client";

import React, { useState } from 'react';

const TasksTable = ({ tasks, currentPage, lastPage, onPageChange }) => {
    return (
        <div className="mt-8 bg-white dark:bg-gray-800 overflow-hidden shadow sm:rounded-lg">
            <div className="p-6">
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">Tasks</h2>
                <table className="min-w-full mt-4">
                    <thead>
                        <tr>
                            <th className="px-6 py-3 border-b-2 border-gray-300 text-left leading-4 text-gray-600 dark:text-gray-400 tracking-wider">Title</th>
                            <th className="px-6 py-3 border-b-2 border-gray-300 text-left leading-4 text-gray-600 dark:text-gray-400 tracking-wider">Description</th>
                            <th className="px-6 py-3 border-b-2 border-gray-300 text-left leading-4 text-gray-600 dark:text-gray-400 tracking-wider">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tasks.map(task => (
                            <tr key={task.id}>
                                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">{task.title}</td>
                                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">{task.description}</td>
                                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">{task.status}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div className="flex justify-between mt-4">
                    <button
                        onClick={() => onPageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                        className="px-4 py-2 bg-gray-300 text-gray-700 rounded disabled:opacity-50"
                    >
                        Previous
                    </button>
                    <span className="text-gray-700">
                        Page {currentPage} of {lastPage}
                    </span>
                    <button
                        onClick={() => onPageChange(currentPage + 1)}
                        disabled={currentPage === lastPage}
                        className="px-4 py-2 bg-gray-300 text-gray-700 rounded disabled:opacity-50"
                    >
                        Next
                    </button>
                </div>
            </div>
        </div>
    );
};

export default TasksTable; 