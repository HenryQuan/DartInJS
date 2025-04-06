export declare interface DartBridgeInterface {
  functionName: () => void;
  quickSort: (list: number[], low: number, high: number) => number[];
  fetchData: () => Promise<string>;
}
