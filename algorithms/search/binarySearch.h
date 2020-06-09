#include <iostream>
#include <vector>

int binarySearch(std::vector<int>& arr, int needle, int low, int high)
{
    if (low < high) {
        int mid = low + (high - low) / 2;

        if (arr[mid] == needle) {
            return mid;
        }

        if (needle < arr[mid]) {
            return binarySearch(arr, needle, low, mid);
        }

        return binarySearch(arr, needle, mid + 1, high);
    }

    return -1;
}
