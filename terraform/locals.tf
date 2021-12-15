locals {
  pixelgrid_domain_validation_option     = tolist(aws_acm_certificate.pixelgrid.domain_validation_options)[0]
  api_pixelgrid_domain_validation_option = tolist(aws_acm_certificate.api_pixelgrid.domain_validation_options)[0]
  node_server_image_uri                  = "${aws_ecr_repository.node_server.repository_url}@${data.aws_ecr_image.node_server.image_digest}"
}
