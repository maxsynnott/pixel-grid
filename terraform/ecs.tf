resource "aws_ecs_cluster" "pixelgrid" {
  name               = var.ecs_cluster_name
  capacity_providers = [aws_ecs_capacity_provider.node_server.name]
}

resource "aws_ecs_task_definition" "node_server" {
  family                   = "node-server"
  network_mode             = "bridge"
  requires_compatibilities = ["EC2"]
  container_definitions = jsonencode([
    {
      name      = "node-server"
      image     = local.node_server_image_uri
      essential = true
      portMappings = [
        {
          containerPort = 8080
          hostPort      = 8080
        }
      ]
      memory = 900
      environment = [
        {
          name  = "ENVIRONMENT"
          value = "production"
        }
      ]
    }
  ])

  memory = 900
}

resource "aws_ecs_service" "node_server" {
  name                       = "node-server"
  cluster                    = aws_ecs_cluster.pixelgrid.id
  task_definition            = aws_ecs_task_definition.node_server.arn
  desired_count              = 1
  deployment_maximum_percent = 300

  load_balancer {
    target_group_arn = aws_lb_target_group.pixelgrid.arn
    container_name   = "node-server"
    container_port   = 8080
  }

  capacity_provider_strategy {
    capacity_provider = aws_ecs_capacity_provider.node_server.name
    weight            = 100
  }
}

resource "aws_ecs_capacity_provider" "node_server" {
  name = var.ecs_capacity_provider_name

  auto_scaling_group_provider {
    auto_scaling_group_arn = aws_autoscaling_group.node_server.arn

    managed_scaling {
      status = "ENABLED"

      minimum_scaling_step_size = 1
      maximum_scaling_step_size = 10000
      target_capacity           = 100
    }
  }
}
