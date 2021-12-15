provider "aws" {
  profile = "default"
  region  = "eu-west-1"
}

provider "aws" {
  alias  = "acm"
  region = "us-east-1"
}
