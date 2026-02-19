@JS()
library interop;

import 'dart:js_interop';
import 'quick.dart';
import "httpin.dart";

@JS('globalThis.dartbridge.functionName')
external set _functionName(JSFunction f);

void _someDartFunction() {
  print('Hello from Dart!');
}

@JS('globalThis.dartbridge.quickSort')
external set _quickSort(JSFunction f);

JSArray<JSNumber> _quickSortImpl(
  JSArray<JSNumber> list,
  JSNumber low,
  JSNumber high,
) {
  // Convert JSArray to Dart List
  final List<int> intList = [];
  for (int i = 0; i < list.toDart.length; i++) {
    intList.add((list.toDart[i] as JSNumber).toDartInt);
  }

  quickSort(intList, low.toDartInt, high.toDartInt);

  // Convert back to JSArray
  return intList.map((e) => e.toJS).toList().toJS;
}

@JS('globalThis.dartbridge.fetchData')
external set _fetchData(JSFunction f);

JSPromise<JSString> _fetchDataImpl() {
  return fetchData().then((value) => value.toJS).toJS;
}

// another dummy function to test gen
@JS('globalThis.dartbridge.anotherFunction')
external set _anotherFunction(JSFunction f);

void _anotherFunctionImpl() {
  print('This is another function!');
}

void main() {
  _functionName = _someDartFunction.toJS;
  _quickSort = _quickSortImpl.toJS;
  _fetchData = _fetchDataImpl.toJS;
  _anotherFunction = _anotherFunctionImpl.toJS;
}
