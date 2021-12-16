variable "spa_s3_bucket_name" {
  type    = string
  default = "pixelgrid-spa"
}

variable "domain_name" {
  type    = string
  default = "pixelgrid.xyz"
}

variable "ecs_cluster_name" {
  type    = string
  default = "pixelgrid-cluster"
}

variable "node_server_ecr_repository_name" {
  type    = string
  default = "node-server"
}

variable "lb_logs_s3_bucket_name" {
  type    = string
  default = "pixelgrid-lb-logs"
}

variable "launch_configuration_name" {
  type    = string
  default = "node-server"
}

variable "ecs_capacity_provider_name" {
  type    = string
  default = "node-server"
}

variable "node_server_ami_image_id" {
  type    = string
  default = "ami-06bb94c46ddc47feb"
}

variable "painter_lambda_s3_bucket_name" {
  type    = string
  default = "pixelgrid-painter-lambda"
}
