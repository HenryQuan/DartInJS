@JS()
library callable_function;

import 'quick.dart';

import 'package:js/js.dart';

@JS('globalThis.functionName') // Expose to global JS scope
external set _functionName(void Function() f);

void _someDartFunction() {
  print('Hello from Dart!');
}

@JS('globalThis.quickSort')
external set _quickSort(List<int> Function(dynamic, int, int) f);

List<int> _quickSortImpl(dynamic list, int low, int high) {
  // make sure list is a List<int>
  // try to convert to List<int>
  final intList = List<int>.from(list);
  quickSort(intList, low, high);
  // change it back to a js.Array
  return intList;
}

void main() {
  _functionName = allowInterop(_someDartFunction); // Wrap for JS compatibility
  _quickSort = allowInterop(_quickSortImpl); // export to JS
}
