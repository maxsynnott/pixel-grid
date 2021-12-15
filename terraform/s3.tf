resource "aws_s3_bucket" "terraform" {
  bucket = "pixelgrid-terraform"
  versioning {
    enabled = true
  }
}
