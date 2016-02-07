---
layout: post
title: "SuperMaze"
date: 2012-10-20
category: project
---

SuperMaze is an interactive, and customisable, Android wallpaper which turns your background into a maze.

It generates an unlimited amount of mazes, finish one by getting the ball to the coloured tile and you'll receive a 
new maze to play. When you only have a few minutes to spare SuperMaze is perfect, no need to load and open an app 
because it's already there.

Like NoteMaker, SuperMaze was made in a 12 hour hackathon. When creating the game I opted for a modified Prim's 
algorithm to be the driving force behind the maze generation. The screen is split into a grid and the 
algorithm runs through, removing edges between tiles to make paths. You can find a really good explanation of how 
Prim's algorithm can be used for maze generation [here](http://weblog.jamisbuck.org/2011/1/10/maze-generation-prim-s-algorithm).
For physics I used Box2D, through the [LibGDX](https://libgdx.badlogicgames.com) library.

[Download SuperMaze from the Google Play store here](https://play.google.com/store/apps/details?id=co.uk.iceroad.wallpaper){:class="center"}

{::options parse_block_html="true" /}
<div class="screenshot-group">
![SuperMaze Screenshot]({{site.url}}/assets/images/projects/supermaze1.jpg)
![SuperMaze Screenshot]({{site.url}}/assets/images/projects/supermaze2.jpg)
</div>