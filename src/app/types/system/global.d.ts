export {};

declare global {
  interface Window {
    env: {
      NEXT_PUBLIC_REGISTRATION_KEY?: string;
    };
  }
}
