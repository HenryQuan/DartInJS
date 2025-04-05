# Dart to JS
This is finally working to use a Dart function in Javascript. 

Compile dart files into Javascript using:
```cmd
dart compile js -O2 -o quick.js .\quick.dart
dart compile js -O2 -o interop.js .\interop.dart
```
Then, I use `bun` to run my `dartin.ts` to get my array sorted.
```cmd
bun .\dart.ts
```
You will get a long output, because it is a dart list.
```
[ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, [Symbol($ti)]: j {
    a: [Function: cM],
    b: [Function: cN],
    c: j {
      a: [Function: cI],
      b: [Function: bM],
      c: null,
      d: null,
      f: null,
      ...
      ...
```
However, the index will still work and will return null if it is out of bound.
