locals {
  domain_validation_option = tolist(aws_acm_certificate.pixelgrid.domain_validation_options)[0]
}
