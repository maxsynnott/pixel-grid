terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 3.69.0"
    }
  }

  backend "s3" {
    bucket = "pixelgrid-terraform"
    key    = "tfstate"
    region = "eu-west-1"
  }

  required_version = ">= 1.1.0"
}
