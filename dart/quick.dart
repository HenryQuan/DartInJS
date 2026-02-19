void quickSort(List<int> list, int low, int high) {
  if (low < high) {
    int pivotIndex = _partition(list, low, high);
    quickSort(list, low, pivotIndex - 1);
    quickSort(list, pivotIndex + 1, high);
  }
}

int _partition(List<int> list, int low, int high) {
  int pivot = list[high];
  int i = low - 1;

  for (int j = low; j < high; j++) {
    if (list[j] < pivot) {
      i++;
      _swap(list, i, j);
    }
  }

  _swap(list, i + 1, high);
  return i + 1;
}

void _swap(List<int> list, int i, int j) {
  int temp = list[i];
  list[i] = list[j];
  list[j] = temp;
}

void main() {
  List<int> numbers = [34, 7, 23, 32, 5, 62];
  print('Before sorting: $numbers');
  quickSort(numbers, 0, numbers.length - 1);
  print('After sorting: $numbers');
}
