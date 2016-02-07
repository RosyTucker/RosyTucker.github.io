#!/usr/bin/env bash

gem install jekyll
gem install html-proofer
jekyll build
htmlproof ./_site