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
When a client sends a HTTP request to a server, the connects of that request are in *plain text*. This means that anyone else, outside the client that sent the request and the server that the request was inteneded for, would be able to see the contents of that request. Is is what is known as **Man in the Middle**. A HTTP request looks something like the following:

<diagram>

HTTP is a protocol, it defines the format of a request and response, to ensure that the client and the server understand each other. HTTPS is another such protocol, the 'S' here stands for secure. People are generally aware that, if for example you are filling in a login form, HTTPS is the better option. But why and what does it really mean?

SSL Certificates
------

HTTPS requests are encrypted in transport between the client and the server. In order to do this, the server requires a certificate, this certicicate is sent to the client when first contact is made, for example when you load [https://github.com](https://github.com).

This certificate is used to identify the server, as a particular domain name and company. A certificate authority (CA) signs this certificate saying that they trust these details to be correct. The certificate binds the domain name to a public key.

When a client makes a request to the server, which has this certificate, the client will first check the domain name.
If the domain name matches the address to which the request is being made then the client will check the CA against its trusted CAs.
If the CA is trusted then the client will take the public key provided by the certificate and use it to start communicating securely.

As an aside, an important thing to remember here is that this process all relies on the CA being trusted. CAs have a root cerificate, this certificate is what was used to sign further certificates. Browsers normally come with these root certificates installed, so that they can identify fraudgenent that have not been correctly signed. If a CA becomes comprimised, a browser may remove its root certificate from its trusted set and thus will report any sites trying to comminicate over HTTPS with a certificate signed by this root certificate as insecure.
The idea that the browser has a copy of the CA root certificates is an example of certificate pinning. The browser does not need to rely on anyone else in order to check the authenticity of a certificate. This can be done in server to server comminication too, or mobile apps for example. If a client pins the certificate of a server it means that it does not require a CA in order check the authenticity of a certificate, as it has the actual certificate for reference. This means that a server can say that it will only trust a particular certificate. This is much more secure than having to trust a CA. A mobile, for example, may ship with the certificate for it's API, meaning it will only trust communications from the APi's domain. Google chrome also uses a [variation](https://en.wikipedia.org/wiki/HTTP_Strict_Transport_Security) of this mechanism.

So, given the servers certificate has been validated by the client, we are now ready to start sending encrypted requests. Well not just yet, we need to make sure our client is cabable of understanding the server and vice versa. This is where the handshake protocol becomes important.

Until recently the protocol used for initiating an encrypted session has been SSL (Secure Sockets Layer), however, recently SSL 3 (the latest version) has been shown to be insecure (POODLE amoungst other thing) and is open to exploitation. This leaves TLS to protect the intenet. TLS (transport layer security) is an encryption policy used to make this initial handshake.

Not all HTTPS requests work the same way
------

(this needs to be re ordered, protocol negotiation happens before cert exchange)

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
