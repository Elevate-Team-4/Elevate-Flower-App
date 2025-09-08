export default async function catchError<T>(
  callback: () => Promise<APIResponse<T>>,
): Promise<[SuccessfulResponse<T>, null] | [null, string]> {
  try {
    const payload = await callback();

    if ("code" in payload) throw new Error(payload.code ?? "Unknown error");

    return [payload as SuccessfulResponse<T>, null];
  } catch (error) {
    return [null, (error as Error).message];
  }
}
