#include <iostream>

/**
 * FIFO list
*/
class Queue
{
private:
    int capacity;
    int size;
    int front;
    int rear;
    int* arr;
public:
    Queue(int capacity)
        : capacity(capacity)
    {
        size = 0;
        front = 0;
        arr = new int[capacity];
    }

    void enqueue(int data)
    {
        if (size == capacity)
        {
            std::cerr << "capacity reached" << std::endl;

            return;
        }

        arr[size++] = data;
    }

    void dequeue()
    {
        for (int i = 0; i < size; i++) {
            arr[i] = arr[i + 1];
        }

        size = size != 0 ? size - 1 : 0;
    }

    int peek()
    {
        return arr[front];
    }

    void print()
    {
        for (int i = 0; i < size; i++) {
            std::cout << arr[i] << std::endl;
        }
    }

    ~Queue()
    {
        delete arr;
    }
};
