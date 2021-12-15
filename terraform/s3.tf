resource "aws_s3_bucket" "terraform" {
  bucket = "pixelgrid-terraform"
  versioning {
    enabled = true
  }
}

resource "aws_s3_bucket" "spa" {
  bucket = var.spa_s3_bucket_name
  acl    = "public-read"
  policy = data.aws_iam_policy_document.spa_s3_bucket_policy.json
  website {
    index_document = "index.html"
  }
}

// TODO: Tighten this up to be more restrictive
resource "aws_s3_bucket" "lb_logs" {
  bucket = var.lb_logs_s3_bucket_name
  policy = data.aws_iam_policy_document.lb_logs_s3_bucket_policy.json
}
