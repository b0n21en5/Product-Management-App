export function validateInput(req, res, next) {
  const requiredFields = [
    "productId",
    "name",
    "price",
    "rating",
    "company",
    "createdAt",
  ];

  for (const field of requiredFields) {
    if (!req.body[field]) {
      return res
        .status(400)
        .send({ success: false, message: `Missing required field: ${field}` });
    }
  }

  next();
}
