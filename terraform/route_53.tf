resource "aws_route53_zone" "pixelgrid" {
  name = var.domain_name
}

resource "aws_route53_record" "validation_record" {
  zone_id = aws_route53_zone.pixelgrid.id
  ttl     = "300"
  type    = local.pixelgrid_domain_validation_option.resource_record_type
  name    = local.pixelgrid_domain_validation_option.resource_record_name
  records = [local.pixelgrid_domain_validation_option.resource_record_value]
}

resource "aws_route53_record" "www" {
  zone_id = aws_route53_zone.pixelgrid.id
  name    = "www.${var.domain_name}"
  type    = "A"

  alias {
    name                   = aws_cloudfront_distribution.www_distribution.domain_name
    zone_id                = aws_cloudfront_distribution.www_distribution.hosted_zone_id
    evaluate_target_health = false
  }
}

resource "aws_route53_record" "root" {
  zone_id = aws_route53_zone.pixelgrid.id
  name    = ""
  type    = "A"

  alias {
    name                   = aws_cloudfront_distribution.www_distribution.domain_name
    zone_id                = aws_cloudfront_distribution.www_distribution.hosted_zone_id
    evaluate_target_health = false
  }
}

resource "aws_route53_record" "api_pixelgrid_validation_record" {
  zone_id = aws_route53_zone.pixelgrid.id
  ttl     = "300"
  type    = local.api_pixelgrid_domain_validation_option.resource_record_type
  name    = local.api_pixelgrid_domain_validation_option.resource_record_name
  records = [local.api_pixelgrid_domain_validation_option.resource_record_value]
}

resource "aws_route53_record" "api" {
  zone_id = aws_route53_zone.pixelgrid.id
  name    = "api.pixelgrid.xyz"
  type    = "A"

  alias {
    name                   = aws_lb.pixelgrid.dns_name
    zone_id                = aws_lb.pixelgrid.zone_id
    evaluate_target_health = false
  }
}
