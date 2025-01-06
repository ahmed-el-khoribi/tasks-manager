import useSWR from 'swr'
import axios from '@/lib/axios'

// Fetch all tasks with pagination and search
export const useTasks = (page = 1, perPage = 10, searchQuery = '') => {
    const { data, error, mutate } = useSWR(`/api/tasks?page=${page}&per_page=${perPage}&search=${searchQuery}`, () =>
        axios.get(`/api/tasks?page=${page}&per_page=${perPage}&search=${searchQuery}`).then(res => res.data.data)
    )

    return {
        tasks: data?.data || [],
        currentPage: data?.current_page || 1,
        lastPage: data?.last_page || 1,
        total: data?.total || 0,
        isLoading: !error && !data,
        isError: error,
        mutate,
    }
}

// Fetch a single task by ID
export const useTask = (id) => {
    const { data, error, mutate } = useSWR(id ? `/api/tasks/${id}` : null, () =>
        axios.get(`/api/tasks/${id}`).then(res => res.data)
    )

    return {
        task: data,
        isLoading: !error && !data,
        isError: error,
        mutate,
    }
}

// Create a new task
export const createTask = async (taskData) => {
    return axios.post('/api/tasks', taskData)
}

// Update an existing task
export const updateTask = async (id, taskData) => {
    return axios.put(`/api/tasks/${id}`, taskData)
}

// Delete a task
export const deleteTask = async (id) => {
    return axios.delete(`/api/tasks/${id}`)
} 