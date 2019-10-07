---
layout: post
title: "Scala: Pattern Matching"
date: 2019-10-06
category: blog
---

One of the most valuable features in the scala language is *pattern matching*, but comingfrom an Object oriented, or
Java-esque background it may not be clear why this is such an important language feature. **It's just a fancy switch right?**
is often what you will hear. This article aims to explain scala pattern matching in detail and expand on the benefits it has 
over a simple switch.

<!--more-->

The Switch Statement
====================

So in order to understand pattern matching, and why it's more than just a *switch* statement, it's important to understand what a switch statement really is, and it's limitations.

Here is a classic Java switch statement

{% highlight java%}
switch(myExpression)
{
   case expressionValue1 :
      <code>
      break;
   case expressionValue2 :
     <code>
      break;
   default: 
     <code>
}
{% endhighlight %}
       
It's generally used to replace chained if statements
<example>
 
       
Some things to note about the above
* The type of `expressionValue1` and `expressionValue2` must be the same as the type of `myExpression`
* Additionally `expressionValue1` and `expressionValue2` must both be either constants or literals, they cannot vary at runtime 

example 

* The type of `myExpression` is limited to a small number of types: char, int, Enum, String. 
   * The reason for this limitation is actually due to the Java switch implementation. Under the hood a `lookupswitch` is being used which has a max key size of 32 bits (maybe this should be it's own talk) We get away with it for strings as it can be turned into an equality check
* If you forget to `break` the next matching case will execute, which is normally not what you want (worth noting there is new syntax to improve this in Java 12). Using break will exit the `switch`.
* There is no requirement for a `default` case, it's perfectly fine for a switch to only cover some cases
