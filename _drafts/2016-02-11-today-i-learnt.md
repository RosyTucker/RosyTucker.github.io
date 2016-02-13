---
layout: post
title: "Today I Learnt"
date: 2016-02-12
category: blog
---

7th Febuary 2016:  NPM Progress bar
================
The current version of NPM (3.5.2), and possibly other versions, have an interesting issue. Having the progress bar enabled actually slows the install process by around 20%. Running the command `npm set progress=false` will disable the progress bar, and thus bypass the code causing the issue.
If you are interested in the in depth analysis of why this is an issue, there is a comment on [this](https://github.com/npm/npm/issues/11283) thread that describes it in incredible detail.

8th Febuary 2016:  SSL Protocols and Negotiations
================
When a client sends a HTTP request to a server, the connects of that request are in plain text. This means that anyone else, outside the client that sent the request and the server that the request was inteneded for, would be able to see the contents of that request. Normally a HTTP request looks something like the following:

<diagram>

HTTP is a protocol, it defines the format of a request and response, to ensure that the client and the server understand each other. HTTPS is another such protocol, the 'S' here stands for secure. People are generally aware that, if for example you are filling in a login form, HTTPS is the better option. But why and what does it really mean?

SSL and TLS
------

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
