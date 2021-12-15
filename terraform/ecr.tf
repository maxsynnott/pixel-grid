resource "aws_ecr_repository" "node_server" {
  name = var.node_server_ecr_repository_name
}

resource "aws_ecr_lifecycle_policy" "node_server" {
  repository = aws_ecr_repository.node_server.name

  policy = <<EOF
{
    "rules": [
        {
            "rulePriority": 1,
            "description": "Only keep one untagged image",
            "selection": {
                "tagStatus": "untagged",
                "countType": "imageCountMoreThan",
                "countNumber": 1
            },
            "action": {
                "type": "expire"
            }
        }
    ]
}
EOF
}

data "aws_ecr_image" "node_server" {
  repository_name = aws_ecr_repository.node_server.name
  image_tag       = "latest"
}
