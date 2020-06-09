#include <iostream>
#include <vector>

std::vector<int>& bubbleSort(std::vector<int>& arr)
{
    for (int i = 0; i < arr.size(); i++) {
        for (int j = 0; j < arr.size() - 1; j++) {
            if (arr[j + 1] < arr[j]) {
                int tmp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = tmp;
            }
        }
    }

    return arr;
}
