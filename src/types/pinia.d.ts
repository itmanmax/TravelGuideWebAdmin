import 'pinia'

declare module 'pinia' {
  export interface PiniaCustomProperties {
    $patch: <T extends object>(partialState: T) => void
  }
} 