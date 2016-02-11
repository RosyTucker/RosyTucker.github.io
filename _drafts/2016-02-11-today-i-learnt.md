---
layout: post
title: "Today I Learnt"
date: 2016-02-12
category: blog
---

7th Febuary 2016:  Npm Progress bar
================
- npm is broken, the progress bar is blocking, causing progress to slow.
- run `npm set progress=false` to speed up all the things

8th Febuary 2016:  SSL Protocols and Negotiations 
================
- SSL vs TLS
- The impact of supporting particular protocols
- Client server negotiation and ciphers

9th Febuary 2016: Killing processes in Node
================
- use spawn
- process.kill(-child.id)
- Be careful not to kill if the process already exited

10th Febuary 2016: DNS and TTL
================
- How ttl is configured
- Browsers vs isps DNS caching and lookup

10th Febuary 2016: Network topology of ELB with EC2 (AWS)
================
- Subnets, ELB, ports, EC2, zones and regions, Nat vs igw

11th Febuary 2016: The Elastic in Elastic Load Balancer
================
- 2 types of elasticity, ip pool for ELB machines and the ec2 instances.
- Amazon auto abusts ELB machines based on traffic
- Wrong ttl could causes issues

11th Febuary 2016: Spawning node child processes on Windows (hell)
================
- need to use cmd /c and pass in command as an arg
- need to escape the original args because windows
- cannot be detached else you use the inherited stdout
