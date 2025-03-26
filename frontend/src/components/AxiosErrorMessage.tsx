// deno-lint-ignore-file no-explicit-any
/* eslint-disable @typescript-eslint/no-explicit-any */
import { AxiosError } from "axios";
import { cn } from "@/lib/utils.ts";

interface AxiosErrorMessageProps {
  error: AxiosError | null | unknown;
  className?: string;
}

export function AxiosErrorMessage({
  error,
  className,
}: AxiosErrorMessageProps) {
  if (!error) return null;

  const axiosError = error as AxiosError;

  // Try to extract the error message from various possible locations
  let errorMessage: string | undefined;

  if (axiosError.response?.data) {
    const responseData = axiosError.response.data as any;

    // Check common error message patterns
    errorMessage =
      responseData.message ||
      responseData.error?.message ||
      responseData.error ||
      (typeof responseData === "string" ? responseData : undefined);
  }

  // Fallback to other possible error locations
  if (!errorMessage) {
    errorMessage =
      axiosError.message ||
      (axiosError as any).error?.message ||
      "An unexpected error occurred";
  }

  return (
    <p className={cn("text-xs text-destructive", className)}>{errorMessage}</p>
  );
}
