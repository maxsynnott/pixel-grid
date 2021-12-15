resource "aws_acm_certificate" "pixelgrid" {
  provider = aws.acm

  domain_name       = "*.pixelgrid.xyz"
  validation_method = "DNS"

  subject_alternative_names = ["pixelgrid.xyz"]
}

resource "aws_acm_certificate_validation" "pixelgrid" {
  provider = aws.acm

  certificate_arn         = aws_acm_certificate.pixelgrid.arn
  validation_record_fqdns = [aws_route53_record.validation_record.fqdn]
}
