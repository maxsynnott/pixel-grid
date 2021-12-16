resource "aws_lambda_function" "painter" {
  function_name = "painter"
  role          = aws_iam_role.lambda.arn
  package_type  = "Zip"
  s3_bucket     = var.painter_lambda_s3_bucket_name
  s3_key        = "function.zip"
  runtime       = "nodejs14.x"
  handler       = "function/src/index.handler"
}
