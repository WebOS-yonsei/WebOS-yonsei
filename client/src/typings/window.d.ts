interface Window {
  PalmServiceBridge: any;
  webOSSystem?: {
    platformBack: () => void;
    close: () => void;
  };
}
