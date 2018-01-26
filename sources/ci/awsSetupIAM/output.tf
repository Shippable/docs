output "base_ecs_ami" {
  value = "${lookup(var.ecsAmi, var.region)}"
}

output "region" {
  value = "${var.region}"
}

output "ami_vpc_id" {
  value = "${aws_vpc.ami_vpc.id}"
}

output "ami_public_sn_id" {
  value = "${aws_subnet.ami_public_sn.id}"
}

output "ami_public_sg_id" {
  value = "${aws_security_group.ami_public_sg.id}"
}

output "test_vpc_id" {
  value = "${aws_vpc.test_vpc.id}"
}

output "test_public_sn_01_id" {
  value = "${aws_subnet.test_public_sn_01.id}"
}

output "test_public_sn_02_id" {
  value = "${aws_subnet.test_public_sn_02.id}"
}

output "test_public_sg_id" {
  value = "${aws_security_group.test_public_sg.id}"
}


output "prod_vpc_id" {
  value = "${aws_vpc.prod_vpc.id}"
}

output "prod_public_sn_01_id" {
  value = "${aws_subnet.prod_public_sn_01.id}"
}

output "prod_public_sn_02_id" {
  value = "${aws_subnet.prod_public_sn_02.id}"
}

output "prod_public_sg_id" {
  value = "${aws_security_group.prod_public_sg.id}"
}
