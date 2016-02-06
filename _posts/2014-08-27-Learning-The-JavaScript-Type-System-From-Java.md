---
layout: post
title: "Learning The JavaScript Type System, From Java"
date: 2014-08-27
category: blog
---

When hearing about JavaScript (JS) you might expect it to be closely related to Java. Now is a good time to stop expecting this.
They are incredibly different, both syntactically and semantically, they perform different functions
and are used in different situations.
This article is meant to help those familiar with Java get to grips with typing in JS.

Both languages are **Object-Oriented** languages, so I guess they have that in common ... but that's about it.
Java is a programming language that requires a compiler, when you write Java code
this compiler turns that code into something called *ByteCode*, which can then be run on
the Java Virtual Machine.
JS is a scripting language which is interpreted at runtime, meaning it is human readable and
can be dynamically changed. JS is normally used only in the browser.

So if you are coming from Java you are probably used to static typing, that is, declaring the type of a variable
to be some specific class or primitive and then using it only in that way. JS is not statically typed, instead
variables are checked at runtime to determine if they have the required property, if not an error occurs.
This is dynamic typing, and is one of the biggest changes when moving between Java and JS.
To illustrate, consider the declarations below:
    
{% highlight java%}
String number = "10";
return number * 10;
{% endhighlight %}
{% highlight javascript%}
var number = "10";
number = number * 10;
{% endhighlight %}

The first is Java code, and would not compile as <b>*</b> is not a valid operator for a String.
The second is JS code. You might expect this to also fail, however,
dynamic typing means that number actually ends up equal to 100.
Magic. This magic does not mean that there are no types in JS,
just that types can be inferred and freely converted.
There are six "types" in JS, as shown below:
 
- String
- Number
- Boolean
- Object
- null
- undefined


Null and Undefined
==================

In JS, the **null** object refers to an empty or non-existent reference, as in Java.
If something is **undefined** in JS it means that it does not exist or has never been assigned to,
meaning expected behaviour cannot be defined. Undefined is not an object, if
something is undefined it means that JS cannot determine what type it is, or what value it should have.


String
==================

Strings in JS are similar to Java, they are sequences of unicode characters.
They have a *length* and a number of functions,
some of which are illustrated below. A full list is given by
[W3Schools](http://www.w3schools.com/jsref/jsref_obj_string.asp)

{% highlight javascript%}
var myString = "hello world";
myString.replace("world","Dave")  //myString is now "hello Dave"
myString.charAt(11)               //returns "d"
myString.length                   //returns "11"
myString.match("hello world")     //returns true
{% endhighlight %}


Number
==================

Numbers in JS are different to numbers in Java (and most other languages). There is not an *int*, a
*double* or a *float*, instead just *Number*.
Technically, a Number in JS is a **64 bit double**.
This may cause you a few problems regarding precision, for example, in JS:

{% highlight javascript%}
0.1 + 0.7 = 0.7999999
{% endhighlight %}

Integers can be considered to be precise up to 15 digits, but be wary.
All Basic operators, such as *++, -- , \** are supported, as well as bitwise operators.
 

Boolean
==================

Booleans are pretty straight forward, false is false, and true is true. However, *all variables* can be converted
to a boolean. This is actually one of the nicer features in my eyes as it allows for much cleaner code.   
  
False, 0, empty string, NaN, null, and undefined ==> false

Everything else ==> true.

Object
==================

Objects are a little different in JS than Java. In Java an object is an instance of a class,
in JS objects are variables which have properties and/or functions/methods. The code snippets below
give some examples. Something to note is that objects in JS are passed by reference not value.

Objects Through Properties
------

The example below shows a JS object defined by property values.

{% highlight javascript%}
var dog = {
    name:"Oliver",
    breed:"German Shepherd",
    age:4
};
dog.name    //Oliver
dog.age     //4
{% endhighlight %}


This can also be done using a constructor, similar to Java, as shown below.

{% highlight javascript%}
function Dog(name, breed, age){
    this.name = name;
    this.breed= breed;
    this.age = age;
}

var oliverDog = new Dog("Oliver","German Shepherd",4);
{% endhighlight %}

Properties can also be functions, and constructors can also take functions as parameters, as demonstrated below.
In JS everything (with the exception of **undefined**) is an object, meaning that functions can be
passed as parameters.

{% highlight javascript%}
function Dog(name, breed, age, behaviour){
    this.name = name;
    this.breed= breed;
    this.age = age;
    this.behaviour = behaviour;
}

var behaviour = function (){
    //some code
}

var oliverDog = new Dog("Oliver","German Shepherd",4, behaviour);
{% endhighlight %}


Objects as Classes
------

In JS **prototypes** can be used to define classes. Every object has a prototype, which is used to define its properties.
Classes can be defined by adding functions to a prototype which are added to all objects which inherit this prototype.
This is demonstrated below.

{% highlight javascript%}
function Dog(name, breed, age){
    this.name = name;
    this.breed= breed;
    this.age = age;
}

Dog.prototype.behave = function (){
    //some code
}

var oliverDog = new Dog("Oliver","German Shepherd",4);
oliverDog.behave();
{% endhighlight %}