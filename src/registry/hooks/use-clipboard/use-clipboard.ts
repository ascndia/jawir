export interface UseClipboardOptions {
  timeout?: number;
  format?: string;
}

export declare function useClipboard(
  value: string,
  optionsOrTimeout?: number | UseClipboardOptions
): {
  value: string;
  setValue: import("react").Dispatch<import("react").SetStateAction<string>>;
  onCopy: () => void;
  hasCopied: boolean;
};
