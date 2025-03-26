/* eslint-disable @typescript-eslint/no-explicit-any */
// deno-lint-ignore-file no-explicit-any
import { AxiosError } from "axios";
import { toast } from "sonner";

export function extractErrorMessage(
  error: AxiosError | null | unknown
): string {
  if (!error) return "An unknown error occurred";

  const axiosError = error as AxiosError;

  let errorMessage: string | undefined;

  if (axiosError.response?.data) {
    const responseData = axiosError.response.data as any;

    errorMessage =
      responseData.message ||
      responseData.error?.message ||
      responseData.error ||
      (typeof responseData === "string" ? responseData : undefined);
  }

  if (!errorMessage) {
    errorMessage =
      axiosError.message ||
      (axiosError as any).error?.message ||
      "An unexpected error occurred";
  }

  return errorMessage;
}

export function toastError(
  error: AxiosError | null | unknown,
  prefix?: string
) {
  const errorMessage = extractErrorMessage(error);
  toast.error(prefix ? `${prefix}: ${errorMessage}` : errorMessage);
}
