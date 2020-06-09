#include <iostream>

// LIFO list
class Stack
{
private:
    int* arr;
    int capacity;
    int size;
public:
    Stack(int capacity)
        : capacity(capacity)
    {
        size = 0;
        arr = new int[capacity];
    }

    void push(int data)
    {
        arr[size++] = data;
    }

    void pop()
    {
        arr[size--];
    }

    int peek()
    {
        return arr[size - 1];
    }

    void print()
    {
        for (int i = 0; i < size; i++) {
            std::cout << arr[i] << std::endl;
        }
    }
};
