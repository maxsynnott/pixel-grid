resource "aws_elasticache_cluster" "redis" {
  cluster_id           = "pixelgrid"
  engine               = "redis"
  engine_version       = "6.x"
  parameter_group_name = "default.redis6.x"
  node_type            = "cache.t2.micro"
  num_cache_nodes      = 1
  subnet_group_name    = aws_elasticache_subnet_group.redis.name
  security_group_ids   = [aws_security_group.redis.id]
}

resource "aws_elasticache_subnet_group" "redis" {
  name       = "redis"
  subnet_ids = [aws_subnet.private_1.id, aws_subnet.private_2.id, aws_subnet.private_3.id]
}
