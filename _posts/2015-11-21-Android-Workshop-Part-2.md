---
layout: post
title: "Android Workshop Part 2: Customising the colors"
date: 2015-11-21
type: "tutorial"
---

Now we have our app set up, let's customise it a bit.

Step 1: The FAB
==================

I'm not talking about being fabulous here, I'm talking about the *Floating Action Button*, shown below.

![FAB]({{site.url}}/images/posts/AndroidWorkshops/FAB.png){:class="article-image"}

We are going to use this button to perform an action in our app, specifically adding an item to a list.
Currently the button has a mail icon, we want to *change this to an add icon*.

The FAB button is a view component, the view of your android app is created using
[XML layout](http://developer.android.com/guide/topics/ui/declaring-layout.html) files. In these files you can add 
and style different view components, such as buttons and text fields.

Changing the icon
==================

In Android Studio, open the project navigator *View > Tool Windows > Project* and
open `activity_main.xml` from the res > layout folder. You'll see a picture of a phone with our current layout in it.
 This is design mode, this won't be covered in this workshop as it's rather fiddly. Instead let's switch to **Text** 
 mode using the toggle shown below:
![Design Mode]({{site.url}}/images/posts/AndroidWorkshops/DesignMode.png){:class="article-image"}

At the bottom of the file you should see code that looks like this:

{% highlight xml%}
<android.support.design.widget.FloatingActionButton
        android:id="@+id/fab"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:layout_gravity="bottom|end"
        android:layout_margin="@dimen/fab_margin"
        android:src="@android:drawable/ic_dialog_email"/>
{% endhighlight %}

This is the code that creates our FAB button, you'll notice it has an **id**, just like HTML elements, as
well as some other properties defining how to display it. You'll also notice it has a **src**, this is where
the email icon is defined. Android has a number of built in icons, for now we will use those. We want to
replace:

{% highlight xml%}
android:src="@android:drawable/ic_dialog_email"
{% endhighlight %}

with:
{% highlight xml%}
android:src="@android:drawable/ic_input_add"
{% endhighlight %}

If you click the play button again now to run the application, you'll see the FAB looks like this:

![Add FAB]({{site.url}}/images/posts/AndroidWorkshops/AddFAB.png)

It's the right icon, but the colours are terrible, so lets fix it.

Changing the icon colour
==================

To change the icon colour we need add a `tint` property to the XML for the FAB. After the line:

{% highlight xml%}
android:layout_margin="@dimen/fab_margin"
{% endhighlight %}

Add the line:

{% highlight xml%}
android:tint="@color/icon"
{% endhighlight %}

This line should go red, as `@color/icon` is not yet defined, so let's define it!

Open `colors.xml` from the *res > values* folder. in here you'll see some color definitions.
Underneath the declaration of `colorAccent` we want to declare `colorIcon` like so:

{% highlight xml%}
<color name="colorIcon">#FFFFFF</color>
{% endhighlight %}

This will set `colorIcon` to be white.

Changing the background colour
==================

In the same `colors.xml` file you'll see a variable `colorAccent`
with value `#FF4081`, this is a hexadecimal code for the color pink. This is, by default, used to colour the FAB.

Change it to the color of your choice (ideally not white). You can pick a color using the Android Studio colour 
picker by clicking on the little pink square next to the variable definition.

Try running your app again now, you should see that the FAB looks something like this:
![Coloured FAB]({{site.url}}/images/posts/AndroidWorkshops/FABColoured.png){:class="article-image"}

Step 2: The Navigation Bar
==================

Still in the same `colors.xml` file you'll see a two other variables, `colorPrimary` and  `colorPrimaryDark`, change 
these to the colours of your choice to. In general with the Android navigation bar, the dark colour should be a 
darkened version of the primary colour.

Run the app again and you should see the navigation bar has changed to the colours you picked.