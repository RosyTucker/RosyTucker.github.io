---
layout: post
title: "Algorithms"
date: 2016-02-12
category: blog
---

So it has been a couple of years since I have been able to do any kind of proper computer science thinking. I've had my head stuck in problems of the real world, web services, forms, mobile apps e.t.c and want to get back to basics.

*So here we go...*

Contents
========

[How does code run on a computer?](#how_does_code_run)  

<a name="how_does_code_run">How does code run on a computer?</a>
================
Let's say you have written a piece of *insert favourite programming language here* code that looks like this:

{% highlight java%}
int result = 10 + 5;
{% endhighlight %}

This code is stored on a file on your machine, and you want to execute it, to get the result. **But how does that actually work? Computers are digital right? Don't they only understand 1's and 0s**?

Believe it or not there are no magic fairies inside of your machine, doing the math. What actually happens is the following:

Step 1: Get the machine to understand your code
-------------------------
So we have some human readable code, a computer doesn't understand that, so we need to convert them into something that it will understand.

In essence, we need to go from `int result = 10 + 5;` to something like `01001110 1101110 10111011 ...`.

The thing that actually understands the binary is a machine's CPU, different computers have different CPUs, and thus the binary representation of the above instructions varies between them.

**If the binary varies, how come I only have to write my code once and it runs on lots of machines?**

Glad you asked! So because we know the binary code needs to change depending on the CPU it is to be run on, we know we can't just convert our code to binary code and then distribute that binary code straight to other computers.

*We need something in the middle*

We want to be able to give something our source code and have it look at the CPU of the machine. Using those two pieces of information it can determine what the binary code representation of the source code is, for this particular CPU. The CPU can then be given that binary and use it to compute a result (we will go into how it does that later).

