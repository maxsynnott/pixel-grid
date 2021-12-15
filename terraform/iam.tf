data "aws_iam_policy_document" "spa_s3_bucket_policy" {
  statement {
    actions   = ["s3:GetObject"]
    resources = ["arn:aws:s3:::${var.spa_s3_bucket_name}/*"]
    effect    = "Allow"
    principals {
      type        = "*"
      identifiers = ["*"]
    }
  }
}

resource "aws_iam_instance_profile" "ecs_ec2" {
  name = "ecs-ec2"
  role = data.aws_iam_role.ecs_instance_role.name
}

data "aws_iam_role" "ecs_instance_role" {
  name = "ecsInstanceRole"
}

// TODO: Tighten this up to be more restrictive
data "aws_iam_policy_document" "lb_logs_s3_bucket_policy" {
  statement {
    actions   = ["s3:GetObject", "s3:PutObject"]
    resources = ["arn:aws:s3:::${var.lb_logs_s3_bucket_name}/*"]
    effect    = "Allow"
    principals {
      type        = "*"
      identifiers = ["*"]
    }
  }

  statement {
    actions   = ["s3:GetBucketAcl"]
    resources = ["arn:aws:s3:::${var.lb_logs_s3_bucket_name}"]
    effect    = "Allow"
    principals {
      type        = "*"
      identifiers = ["*"]
    }
  }
}
