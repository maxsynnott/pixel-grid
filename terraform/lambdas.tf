resource "aws_lambda_function" "painter" {
  function_name = "painter"
  role          = aws_iam_role.lambda.arn
  package_type  = "Zip"
  s3_bucket     = var.painter_lambda_s3_bucket_name
  s3_key        = "function.zip"
  runtime       = "nodejs14.x"
  handler       = "function/src/index.handler"
  timeout       = 60
  // TODO: Reduce to more reasonable size
  memory_size = 10240

  environment {
    variables = {
      REDIS_HOST = local.redis_host
    }
  }

  // ! Must be in private VPC
  vpc_config {
    subnet_ids         = [aws_subnet.private_1.id, aws_subnet.private_2.id, aws_subnet.private_3.id]
    security_group_ids = [aws_security_group.painter.id]
  }
}
