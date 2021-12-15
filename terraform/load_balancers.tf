resource "aws_lb" "pixelgrid" {
  name               = "pixelgrid"
  internal           = false
  load_balancer_type = "application"
  security_groups    = [aws_security_group.load_balancer.id]
  subnets            = [aws_subnet.public_1.id, aws_subnet.public_2.id, aws_subnet.public_3.id]

  access_logs {
    bucket  = aws_s3_bucket.lb_logs.bucket
    enabled = true
  }
}

resource "aws_lb_target_group" "pixelgrid" {
  name        = "pixelgrid"
  protocol    = "HTTP"
  target_type = "instance"
  port        = 8080
  vpc_id      = aws_vpc.pixelgrid.id

  health_check {
    path                = "/healthcheck"
    matcher             = "200"
    healthy_threshold   = 3
    unhealthy_threshold = 3
    interval            = 30
    timeout             = 10
  }
}

resource "aws_lb_listener" "https" {
  load_balancer_arn = aws_lb.pixelgrid.arn
  protocol          = "HTTPS"
  port              = 443
  certificate_arn   = aws_acm_certificate_validation.api_pixelgrid.certificate_arn
  ssl_policy        = "ELBSecurityPolicy-2016-08"

  default_action {
    type             = "forward"
    target_group_arn = aws_lb_target_group.pixelgrid.arn
  }
}

resource "aws_lb_listener" "http" {
  load_balancer_arn = aws_lb.pixelgrid.arn
  protocol          = "HTTP"
  port              = 80

  default_action {
    type = "redirect"

    redirect {
      port        = 443
      protocol    = "HTTPS"
      status_code = "HTTP_301"
    }
  }
}
