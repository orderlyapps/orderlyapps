/**
 * Normalizes any thrown value into a real `Error`.
 *
 * - `Error` instances pass through unchanged.
 * - Strings become `new Error(string)`.
 * - Objects with a `message` property become `new Error(obj.message)`.
 * - Anything else is stringified.
 */
export function toError(value: unknown): Error {
  if (value instanceof Error) return value;
  if (typeof value === "string") return new Error(value);
  if (typeof value === "object" && value !== null && "message" in value) {
    const message = (value as { message: unknown }).message;
    return new Error(typeof message === "string" ? message : String(message));
  }
  return new Error(String(value));
}

/**
 * Returns a human-readable message from any thrown value, falling back to a
 * generic message when the value has no usable message.
 */
export function getErrorMessage(error: unknown, fallback = "Something went wrong."): string {
  const message = toError(error).message;
  return message.trim().length > 0 ? message : fallback;
}
