"use client";

import React, { useState } from 'react';
import LoginLinks from '@/app/LoginLinks';
import { useTasks } from '@/hooks/tasks';
import TasksTable from '@/app/(app)/dashboard/TasksTable';
import Header from '@/app/(app)/Header';

const Home = () => {
    const [page, setPage] = useState(1);
    const [perPage, setPerPage] = useState(10); // Default per_page value
    const [searchQuery, setSearchQuery] = useState(''); // State for search query
    const [isUserLoading, setIsUserLoading] = useState(false); // Local loading state
    const { tasks, currentPage, lastPage, isLoading, isError } = useTasks(page, perPage, searchQuery);

    // Show spinner only when fetching tasks, not during user interactions
    if (isLoading && !isUserLoading) <div>Loading...</div>;
    if (isError) return <div>Error loading tasks</div>;

    const handlePageChange = (newPage) => {
        setPage(newPage);
    };

    const handlePerPageChange = (event) => {
        setIsUserLoading(true); // Set loading state to true
        setPerPage(event.target.value);
        setPage(1); // Reset to the first page when per_page changes
        setIsUserLoading(false); // Reset loading state after setting perPage
    };

    const handleSearchChange = (event) => {
        setIsUserLoading(true); // Set loading state to true
        setSearchQuery(event.target.value);
        setPage(1); // Reset to the first page when search query changes
        setIsUserLoading(false); // Reset loading state after setting searchQuery
    };

    return (
        <>
            <Header title="Dashboard" />
            <div className="relative flex items-top justify-center min-h-screen bg-gray-100 dark:bg-gray-900 sm:items-center sm:pt-0">
                <LoginLinks />

                <div className="max-w-6xl mx-auto sm:px-6 lg:px-8">
                    <div className="flex justify-center pt-8 sm:justify-start sm:pt-0">
                        <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
                            Welcome to Our Task Management Application
                        </h1>
                    </div>

                    <div className="mt-8 bg-white dark:bg-gray-800 overflow-hidden shadow sm:rounded-lg">
                        <div className="p-6">
                            <p className="text-lg text-gray-600 dark:text-gray-400">
                                This application is designed to help you manage your tasks efficiently. You can create, update, and delete tasks, as well as view a list of all your tasks. Our goal is to provide a simple and intuitive interface for managing your daily tasks.
                            </p>
                            <h2 className="mt-4 text-2xl font-semibold text-gray-900 dark:text-white">Features:</h2>
                            <ul className="list-disc list-inside mt-2 text-gray-600 dark:text-gray-400">
                                <li>Create new tasks with a title, description, and status.</li>
                                <li>View a list of all tasks with sorting and pagination options.</li>
                                <li>Update existing tasks to keep your information current.</li>
                                <li>Delete tasks that are no longer needed.</li>
                                <li>Search tasks by title or description to find what you need quickly.</li>
                            </ul>
                            <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
                                We hope this tool helps you stay organized and productive. If you have any questions or feedback, feel free to reach out to us.
                            </p>
                        </div>
                    </div>

                    <div className="mt-4 flex items-center">
                        
                        <select
                            id="perPage"
                            value={perPage}
                            onChange={handlePerPageChange}
                            className="mt-1 block w-1/5 border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                        >
                            <option value={5}>5</option>
                            <option value={10}>10</option>
                            <option value={20}>20</option>
                            <option value={50}>50</option>
                        </select>

                        <input
                            type="text"
                            placeholder="Search tasks..."
                            value={searchQuery}
                            onChange={handleSearchChange}
                            className="mt-1 ml-4 block w-4/5 border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                        />
                    </div>

                    <TasksTable
                        tasks={tasks}
                        currentPage={currentPage}
                        lastPage={lastPage}
                        onPageChange={handlePageChange}
                    />
                </div>
            </div>
        </>
    );
};

export default Home;