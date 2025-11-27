provider "aws" {
  region = "us-east-1"
}

# 1. BUCKET S3 (modulo4)
resource "aws_s3_bucket" "stats_bucket" {
  bucket = "parcial-modulo-4-tu-nombre-aqui" # <--- CAMBIAR ESTO
}

# 2. CONFIGURACIÓN WEBSITE
resource "aws_s3_bucket_website_configuration" "stats_config" {
  bucket = aws_s3_bucket.stats_bucket.id

  index_document {
    suffix = "index.html"
  }

  error_document {
    key = "index.html"
  }
}

# 3. DESBLOQUEO DE ACCESO
resource "aws_s3_bucket_public_access_block" "stats_public" {
  bucket = aws_s3_bucket.stats_bucket.id

  block_public_acls       = false
  block_public_policy     = false
  ignore_public_acls      = false
  restrict_public_buckets = false
}

# 4. POLÍTICA DE LECTURA
resource "aws_s3_bucket_policy" "stats_policy" {
  bucket = aws_s3_bucket.stats_bucket.id
  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Sid       = "PublicReadGetObject"
        Effect    = "Allow"
        Principal = "*"
        Action    = "s3:GetObject"
        Resource  = "${aws_s3_bucket.stats_bucket.arn}/*"
      },
    ]
  })
  depends_on = [aws_s3_bucket_public_access_block.stats_public]
}

# 5. CLOUDFRONT
resource "aws_cloudfront_distribution" "stats_distribution" {
  origin {
    domain_name = aws_s3_bucket_website_configuration.stats_config.website_endpoint
    origin_id   = "S3OriginStats"

    custom_origin_config {
      http_port              = 80
      https_port             = 443
      origin_protocol_policy = "http-only"
      origin_ssl_protocols   = ["TLSv1.2"]
    }
  }

  enabled             = true
  is_ipv6_enabled     = true
  default_root_object = "index.html"

  default_cache_behavior {
    allowed_methods  = ["GET", "HEAD", "OPTIONS"]
    cached_methods   = ["GET", "HEAD"]
    target_origin_id = "S3OriginStats"

    forwarded_values {
      query_string = false
      cookies {
        forward = "none"
      }
    }

    viewer_protocol_policy = "redirect-to-https"
    min_ttl                = 0
    default_ttl            = 3600
    max_ttl                = 86400
  }

  restrictions {
    geo_restriction {
      restriction_type = "none"
    }
  }

  viewer_certificate {
    cloudfront_default_certificate = true
  }
}

output "cloudfront_url" {
  value = aws_cloudfront_distribution.stats_distribution.domain_name
}