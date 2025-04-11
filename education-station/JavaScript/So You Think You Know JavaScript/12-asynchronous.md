[Previous: Can't Function Without You](11-functions.md)

### I Have Asynching Feeling 
Suppose that we want to make a network request and process the response. It will take time for the request to reach its destination, for the server to handle the request, and for the response to reach us. We could have the entire application stop and wait for the response, but then if the user continues to interact with the application, we cannot respond to their request until our request finishes.

For this reason, JavaScript queues up tasks to be executed. Here's a broad, simplified overview of what these queues are.

The first is the synchronous task queue. Items in this queue are dequeued in order and moved to the callstack to be executed, until there are no more tasks in the queue.

The second queue is the asynchronous microtask queue. This queue contains small tasks that have become ready to execute. When all tasks in the synchronous task queue have been completed, all tasks from the asynchronous microtask queue are moved over to the synchronous task queue.

The third queue is the asynchronous task queue. This contains large asynchronous tasks that are ready to execute. Once all synchronous tasks have been executed, if there are no tasks on the asynchronous microtask queue, one task will be moved from the asynchronous task queue to the synchronous task queue.

This process of executing tasks is called the Event Loop. To recap:
1. Execute all tasks on the synchronous task queue
2. If there are tasks on the asynchronous microtask queue, move them all to the synchrnous task queue and go to step 1.
3. Otherwise, move 1 task from the asynchronous task queue and go to step 1.

Or if you find psuedocode more helpful:
```
while (true) {
    while (!syncTaskQueue.empty) {
        syncTaskQueue.dequeue().execute()
    }

    if (!asyncMicrotaskQueue.empty) {
        while (!asyncMicrotaskQueue.empty) {
            syncTaskQueue.enqueue(asyncMicrotaskQueue.dequeue()))
        }
    } else {
        if (!asyncTaskQueue.empty) {
            syncTaskQueue.enqueue(asyncTaskQueue.dequeue())
        }
    }
}

```

[Next: Please Callback](13-callbacks.md)

[Table of Contents](0-intro.md)
