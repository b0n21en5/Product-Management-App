export function handleError(res, err) {
  return res
    .status(500)
    .send({ success: false, message: "Internal Server Error!" });
}
