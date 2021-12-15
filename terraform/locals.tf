locals {
  pixelgrid_domain_validation_option     = tolist(aws_acm_certificate.pixelgrid.domain_validation_options)[0]
  api_pixelgrid_domain_validation_option = tolist(aws_acm_certificate.api_pixelgrid.domain_validation_options)[0]
}
