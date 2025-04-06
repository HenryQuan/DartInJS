@JS()
library interop;

import 'quick.dart';
import "httpin.dart";
import 'package:js_interop_utils/js_interop_utils.dart';

@JS('globalThis.dartbridge.functionName') // Expose to global JS scope
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
  // try to convert to List<int>
  final List<int> intList = list.toDart.cast<int>();
  quickSort(intList, low.toDartInt, high.toDartInt);
  // change it back to a js.Array
  return intList.toJS;
}

@JS('globalThis.dartbridge.fetchData')
external set _fetchData(JSFunction f);

JSPromise<JSString> _fetchDataImpl() {
  return JSPromise(
    (JSFunction resolve, JSFunction reject) {
      fetchData()
          .then((value) {
            // don't forget to include resolve here also
            resolve.callAsFunction(resolve, value.toJS);
          })
          .catchError((error) {
            reject.callAsFunction(reject, error.toJS);
          });
    }.toJS,
  );
}

void main() {
  _functionName = _someDartFunction.toJS;
  // _quickSort = quickSort.toJSBox;
  _quickSort = _quickSortImpl.toJS;
  _fetchData = _fetchDataImpl.toJS;
}
