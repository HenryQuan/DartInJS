import { DartBridgeInterface } from "./bridge";
import { getDartBridge } from "../../shared/dartloader";

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
    try {
      const bridge = getDartBridge();
      this.setDartBridge(bridge);
    } catch (error) {
      throw new Error("Dart bridge is not available. Make sure the Dart script is loaded first.");
    }
  }
}
