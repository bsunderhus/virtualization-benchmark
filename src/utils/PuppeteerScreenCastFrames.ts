import { CDPSession, Protocol } from "puppeteer";

// original code: https://www.npmjs.com/package/puppeteer-mass-screenshots
export interface FrameObectMetaData {
  // https://chromedevtools.github.io/devtools-protocol/tot/Page/#type-ScreencastFrameMetadata
  offsetTop: number; // Top offset in DIP.
  pageScaleFactor: number; // Page scale factor.
  deviceWidth: number; // Device screen width in DIP.
  deviceHeight: number; // Device screen height in DIP.
  scrollOffsetX: number; // Position of horizontal scroll in CSS pixels.
  scrollOffsetY: number; // Position of vertical scroll in CSS pixels.
  timestamp: number; // Time since EPOCH
}

export interface FrameObject {
  // https://chromedevtools.github.io/devtools-protocol/tot/Page/#event-screencastFrame
  data: string; // BASE64 string of image
  sessionId: number; // Frame number
  metadata: FrameObectMetaData;
}

export class PuppeteerScreenCastFrames {
  _session?: CDPSession;
  canScreenshot: boolean = false;

  async init(
    client: CDPSession,
    afterFrame: (frameData: FrameObject) => Promise<void> | void
  ) {
    this._session = client;
    this._session.on(
      "Page.screencastFrame",
      async (frameObject: FrameObject) => {
        if (this.canScreenshot) {
          try {
            await this._session?.send("Page.screencastFrameAck", {
              sessionId: frameObject.sessionId,
            });
            await afterFrame(frameObject);
          } catch (e) {
            this.canScreenshot = false;
          }
        }
      }
    );
  }

  public async start(options: Protocol.Page.StartScreencastRequest = {}) {
    const startOptions = {
      format: "png" as const,
      quality: 100,
      maxWidth: 1920,
      maxHeight: 1080,
      everyNthFrame: 1,
      ...options,
    };
    this.canScreenshot = true;
    return await this._session?.send("Page.startScreencast", startOptions);
  }

  public async stop() {
    this.canScreenshot = false;
    return await this._session?.send("Page.stopScreencast");
  }
}
