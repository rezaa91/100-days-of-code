#include <iostream>
#include <vector>

std::vector<int> temp;

void merge(std::vector<int>& arr, int low, int mid, int high)
{
    int leftStart = low;
    int rightStart = mid + 1;
    int i;

    for (i = low; leftStart <= mid && rightStart <= high; i++) {
        if (arr[leftStart] <= arr[rightStart]) {
            temp[i] = arr[leftStart++];
        } else {
            temp[i] = arr[rightStart++];
        }
    }

    while (leftStart <= mid) {
        temp[i++] = arr[leftStart++];
    }

    while (rightStart <= high) {
        temp[i++] = arr[rightStart++];
    }

    for (i = low; i <= high; i++) {
        arr[i] = temp[i];
    }
}

void mergeSort(std::vector<int>& arr, int low, int high)
{
    // initialise temp size on initial fn call
    if (temp.size() == 0) {
        temp.resize(arr.size() - 1);
    }

    if (low < high) {
        int mid = low + (high - low) / 2;

        mergeSort(arr, low, mid);
        mergeSort(arr, mid + 1, high);
        merge(arr, low, mid, high);
    }
}
