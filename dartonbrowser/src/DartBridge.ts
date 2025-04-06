import { DartBridgeInterface } from "./bridge";

// a singleton to hold the dart bridge
export class DartBridge {
  private static instance: DartBridge | null = null;
  private dartBridge: DartBridgeInterface | null = null;

  private constructor() {}

  private static getInstance(): DartBridge {
    if (this.instance === null) {
      this.instance = new DartBridge();
    }
    return this.instance;
  }

  public static setDartBridge(dartBridge: any): void {
    const instance = this.getInstance();
    instance.dartBridge = dartBridge;
  }

  public static get(): DartBridgeInterface {
    const instance = this.getInstance();
    if (instance.dartBridge === null) {
      throw new Error("Dart bridge is not set. Please set it before using.");
    }
    return instance.dartBridge;
  }

  public static autoBridge(): void {
    // @ts-ignore
    if (window.dartbridge) {
      // @ts-ignore
      this.setDartBridge(window.dartbridge);
      // @ts-ignore
      delete window.dartbridge;
    } else {
      throw new Error("Dart bridge is not set. Please set it before using.");
    }
  }
}
