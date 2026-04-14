export function successResponse<T>(data: T) {
  return { status: true, data };
}