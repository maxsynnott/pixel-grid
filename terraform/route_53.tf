resource "aws_route53_zone" "pixelgrid" {
  name = "pixelgrid.xyz"
}

resource "aws_route53_record" "validation_record" {
  zone_id = aws_route53_zone.pixelgrid.id
  ttl     = "300"
  type    = local.domain_validation_option.resource_record_type
  name    = local.domain_validation_option.resource_record_name
  records = [local.domain_validation_option.resource_record_value]
}
