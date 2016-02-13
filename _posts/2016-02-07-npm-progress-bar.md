---
layout: post
title: "NPM Progress bar"
date: 2016-02-07
category: blog
---

The current version of *NPM (3.5.2)*, and possibly other versions, have an interesting issue.
Having the progress bar enabled actually slows the install process by around **20%**.

<!--more-->

Running the command `npm set progress=false` will disable the progress bar, and thus bypass the code causing the issue.

If you are interested in the in depth analysis of why this is an issue, there is a comment on [this](https://github.com/npm/npm/issues/11283) thread that describes it in incredible detail.

It also appears like this issue will soon be fixed in later versions of NPM.
