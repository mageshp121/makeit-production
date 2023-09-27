declare module 'fast-two-sms' {
    export function sendMessage(params: {
      authorization: string;
      message: string;
      numbers: string[];
    }): Promise<any>;
  }