/// <reference types="vite/client" />

declare module '*.css';
declare module '*.svg';
declare module '*.png';
declare module '*.jpg';

declare class Html5Qrcode {
  constructor(elementId: string);
  start(config: any, options: any, onSuccess: (code: string) => void, onError?: (err: string) => void): Promise<void>;
  stop(): void;
}

declare module 'html5-qrcode' {
  export default Html5Qrcode;
}

declare module 'qrcodejs' {
  export default QRCode;
}
