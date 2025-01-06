<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Task extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'title',
        'description',
        'status',
    ];

    /**
     * Scope a query to sort tasks by created_at.
     *
     * @param \Illuminate\Database\Eloquent\Builder $query
     * @param string $order
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopeSortByCreatedAt($query, $order = 'desc')
    {
        return $query->orderBy('created_at', $order);
    }

    /**
     * Scope a query to paginate tasks.
     *
     * @param \Illuminate\Database\Eloquent\Builder $query
     * @param int $perPage
     * @return \Illuminate\Contracts\Pagination\LengthAwarePaginator
     */
    public function scopePaginateTasks($query, $perPage = 10)
    {
        return $query->paginate($perPage);
    }

    /**
     * Scope a query to search tasks by title or description.
     *
     * @param \Illuminate\Database\Eloquent\Builder $query
     * @param string|null $search
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopeSearch($query, $search = null)
    {
        if ($search) {
            return $query->where('title', 'like', "%{$search}%")
                         ->orWhere('description', 'like', "%{$search}%");
        }

        return $query;
    }
} 