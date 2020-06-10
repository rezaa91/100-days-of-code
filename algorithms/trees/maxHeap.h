#include <iostream>
#include <vector>

class MaxHeap
{
private:
    std::vector<int> heap;
    int parent(int i) { return (i - 1) / 2; }
    int left(int i) { return (i * 2) + 1; }
    int right(int i) { return (i * 2) + 2; }
public:
    MaxHeap() {}

    void insert(int data)
    {
        heap.push_back(data);
        int lastIndex = heap.size() - 1;

        while (heap[lastIndex] > heap[parent(lastIndex)]) {
            std::swap(heap[lastIndex], heap[parent(lastIndex)]);
            lastIndex = parent(lastIndex);
        }
    }

    int getMax()
    {
        return heap[0];
    }

    int extractMax()
    {
        int max = heap[0];
        heap.erase(heap.begin());

        heapify(0);

        return max;
    }

    void heapify(int i)
    {
        int left = this->left(i);
        int right = this->right(i);
        int biggest = i;

        if (left < heap.size() && heap[biggest] < heap[left]) {
            biggest = left;
        }

        if (right < heap.size() && heap[biggest] < heap[right]) {
            biggest = right;
        }

        if (biggest != i) {
            std::swap(heap[biggest], heap[i]);
            heapify(biggest);
        }
    }

    void print()
    {
        for (int& x : heap) {
            std::cout << x << std::endl;
        }
    }
};