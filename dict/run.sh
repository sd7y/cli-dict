#!/bin/bash

tsc dict.ts
word=`cat /home/alex/devp/alex/ECDICT/ecdict.csv | grep ^$1,`
echo $word
echo "=============="
node dict.js "$word"