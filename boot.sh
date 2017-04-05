#!/bin/bash -e

pushd /home/shippable/docs > /dev/null
mkdocs serve --dev-addr=0.0.0.0:5555
