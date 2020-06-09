#include <iostream>
#include <vector>

class MinHeap
{
private:
    std::vector<int> heap;
    int parent(int i) { return (i - 1) / 2; }
    int left(int i) { return (i * 2) + 1; }
    int right(int i) { return (i * 2) + 2; }
public:
    MinHeap() {}

    void insert(int data)
    {
        heap.push_back(data);
        int index = heap.size() - 1;

        while(heap[index] < heap[parent(index)]) {
            std::swap(heap[index], heap[parent(index)]);
            index = parent(index);
        }
    }

    int extractMin()
    {
        int min = heap[0];

        // pop from front
        heap.erase(heap.begin());

        heapify(0);

        return min;
    }

    // correctly position the heap
    void heapify(int i)
    {
        int left = this->left(i);
        int right = this->right(i);
        int smallest = i;

        if (heap[smallest] > heap[left]) {
            smallest = left;
        }

        if (heap[smallest] > heap[right]) {
            smallest = right;
        }

        if (smallest != i) {
            std::swap(heap[smallest], heap[i]);
            heapify(smallest);
        }
    }

    int getMin()
    {
        return heap[0];
    }

    void print()
    {
        for (int& x : heap) {
            std::cout << x << std::endl;
        }
    }
};
