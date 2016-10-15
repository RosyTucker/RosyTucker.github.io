---
layout: post
title: "How Does Code Run - Compilers, Interpreters and CPUs"
date: 2016-02-12
category: blog
---

So you have written a program in *insert favourite language here* and you want to execute it.

**How does that actually work?**

<!--more-->

{% highlight java%}
int result = 10 + 5;
logger.log(result);
{% endhighlight %}

The first step to understanding how a computer runs your code, is knowing that every computer has a *CPU* (central processing unit).
This is a hardware chip, and is responsible for executing commands known as *instructions*. Every-time you ask a computer to do something it goes through it the computer's CPU.

The CPU doesn't understand our source code, so in order to execute our code we need to turn it into instructions that it can understand. Once we have these instructions, we can give them to the CPU to be executed.

What does the CPU understand?
=========

In short: *Binary code*

Computers are digital, and under the hood your CPU is just a big pile of logic gates. Logic gates are super useful as they allow us represent states, two states to be particular *0 and 1*. This is binary code, the lowest level code you can run, and this is what a computer's CPU understands.

This means that we need to convert from something like `int result = 10 + 5;` to a binary code representation, for example `01001110 1101110 10111011 ...`.

This is a bit more complicated than it sounds.

There are many many different CPUs out there, and different computers use different ones. Each CPU understands binary code differently. We call this *machine code*, the binary language specific to the CPU. Machine code varies between CPUs and defines how that CPU will interpret binary code.

For example

- On CPU A the binary code: `11010101` may mean `SUBTRACT 5`
- On CPU B the binary code: `11010101` may mean `ADD 5`

So because the machine code is different for different CPUs, we can't just convert our code to binary code and then distribute that binary code straight to other computers. The same binary code will be understood differently by different CPUs, and therefore something that works on my computer will likely not work on a different one.

*We need something in the middle*

We want to be able to give something our source code, and have it turn that source code into machine code for a particular CPU. The CPU can then be given that machine code and use it to compute the result of the program (we will go into how it does that later).

There are a couple of standard options for how to do this conversion from source code to machine code. Generally source code will either be compiled, interpreted or both.

**Compiled? Interpreted? What does this mean?**

Compiling Code
==============

Compiling code, is effectively taking code in a programming language (the source) and converting it into code of another language (the target).

So ... the output of compiling code is different code.

In a simple case, we want a compiler that takes our source code language and outputs machine code. If a compiler outputs machine code then that means it needs to know how the computers CPU will interpret binary code.

Every computer we want to run our code on will therefore need to have a compiler that understands the source language and outputs machine code specific to it's CPU. This means that the input to the compiler is always the same, but the output will vary, depending on the CPU.

i.e The compiler for CPU A will need to know that `ADD 5` is `11010010` in machine code.

How does the compiler work?
---------------------------

The compiler takes the source code and will go through converting it into tokens, where each token is a small part of the overall program. For our source code example this could look something like:

{% highlight java%}
type "int"
variable "result"
equals
literal 10
plus
literal 5
{% endhighlight %}

This is called *lexical analysis*. Once the code has been converted to these lexical tokens, the compiler will then check that these tokens make sense, and conform properly the the source programming language. This is called *syntactical analysis*. If syntactical analysis fails, the compiler will inform you that it couldn't understand the code, perhaps with an error or warning such as:

* You tried to use a variable that was not declared
* You said that this variable was going to be number but then tried to assign a string to it.

Most developers will be all too familiar with this type of error.

If the tokens are all valid, and the syntactical analysis is successful, then good news your code is valid code for that programming language. This means the compiler can understand your input source code and can convert that source code into machine code which can then be given to the CPU.

When the compiler is run on the code, the code doesn't actually get executed, the compiler spits out machine code, but **doesn't actually run it**. 

It's worth noting that some compilers do not output pure machine code, but instead they output something called *object code*, machine code for part of a full program (think a .class file in Java, or a .o file in C). These parts of the program will then be linked together to form a full executable, normally called a *binary*.

This means all of the code has to get compiled before it can be executed. Compilation and execution are *two distinct steps*.

*C* is often used as an example of a language that is normally compiled. When you write a C program, you have to compile your source code into a `.o`, object code, file and then execute the `.exe` or `.bin` in order to get the output.

Interpreting Code
================

Interpreting code is different from compiling code. An *interpreter* is another program on the computer that takes in source code and executes it instruction at a time.

It may do this by getting an instruction, translating it into machine code, executing it, then writing the result somewhere. This cycle is repeated until the program completes or an error occurs.

This means you will only find out about errors at runtime, it also means that you will only find out about one error at a time, you do not get a list of all errors as you do when compiling.

Unlike compiling and executing, *interpreting is a cycle*.

*JavaScript* is often used as an example of a language that can be interpreted.
If you write the following Javascript:

{% highlight javascript%}
console.log('I'm about to error);
let ohNo;
console.log(ohNo.doesNotExist);
{% endhighlight %}

The first line will be executed, you will see the output, the second line will then be executed, then the third line will then produce an error. If the Javascript was to be compiled, none of the program would be executed and you would get an error during the compilation.

Doing Both
==========

It is important to mention here that a language should not be referred to as an *interpreted* language OR a *compiled* language.

The language itself does not control that, how the language is executed is essentially independent of the actual language. You could interpret Javascript, you could also compile it. A lot of languages will ship with a compiler, an interpreter or both.

Some languages may use a compiler to convert the source code into one format, and then use an interpreter to execute the instructions. This is particularly useful as it allows the output of the compiler to be machine independent, as it is not outputting machine mode. This means for others to run the code, they don't need to have all the source code, they just need the compiler output and an interpreter for that compiler output.

One common example of this approach is *Java*. Java source code is compiled, from `.java` files to `.class` files. These `.class` files contain a code known as *bytecode*, this is not machine code, and therefore is not specific to a CPU.

The bytecode can then be executed through an interpreter (the JVM). The interpreter itself is machine specific. The reason Java is compiled to bytecode first is for efficiency, it means the interpreter only needs to understand bytecode.

The JVM (Java virtual machine) is a particularly interesting interpreter, because sometimes it is actually a compiler.

*So meta*

The JVM includes something called a *JIT*, a just in time compiler. It uses this sometimes for efficiency. The JIT, is just like the compilers explained above, it takes code in a source language (bytecode) and translates it to machine code. If a particular bit of code appears many times, interpreting it can be expensive, you would be doing the same thing over and over. In cases like this the code is compiled directly to machine code rather than interpreted, so it only has to happen once.

Most modern languages do some sort of hybrid approach like this.

Summary
=======

Hopefully this article has helped explain what happens when you run a piece of computer code, and how CPUs are a core part of this process, as well as how to convert your code into something a CPU can actually understand.

