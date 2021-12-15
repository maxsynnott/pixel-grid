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
