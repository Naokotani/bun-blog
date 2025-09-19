#!/bin/bash

bun cleancss -o static/css/normalize.min.css static/css/normalize.css &
bun cleancss -o static/css/styles.min.css static/css/styles.css &
wait
