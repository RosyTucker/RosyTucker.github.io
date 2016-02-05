---
layout: post
title: "A Basic Introduction to NoSQL"
date: 2013-11-16
type: blog
---

Recently the idea of a NoSQL solution for data storage has been gaining more
and more momentum, but what does it actually mean?
This article explains the
meaning of NoSQL, the main types of NoSQL data stores, and
when you would use each type. The overall message of the article is to choose the right
data store for your data format.

No SQL
==================

The word "NoSQL" is commonly used to describe data stores which do not
follow the conventional relational model. It first appeared in the 1990's,
used to describe a relational database management system (RDBMS) which
did not use the SQL query language. In the present the term is used with a
slightly different meaning, all apparently because of a twitter hashtag
created for a single meeting in 2009 by Johan Oskarsson.
When reading the word you would be tempted to think it means **no SQL**,
however, the NoSQL communities prefer it to thought of as **Not Only SQL**,
allowing scope for SQL like querying languages.
So it seems NoSQL effectively means **not relational**, and
actually is not a direct bashing of SQL.

Types?
==================

So what types of NoSQL databases exist and what are the differences?
Normally NoSQL databases are split into four key types: document,
key-value, column and graph.

Key-Value
------

A key value database, as the name suggests, stores keys and values. Each
value is associated with a key, and only the key can be queried. This is
useful as there is no set schema for the data: a value can be
anything. When using a RDBMS if the data you wish to store changes then
there is likely to be a large amount of migration required, with a key
value store this overhead is eliminated.

If you have ever made a mobile app for Android or iOS you are likely to
have come across key value stores before without even realising.
NSUserDefaults for iOS and SharedPreferences for Android are both key
value stores. When you save a setting for an app in one of these stores
you want to just give it a key and fetch it later, you don't want to be
messing around designing database schemas.

Things get complicated for a key value store when the value
becomes complex, this is because the value cannot be queried meaning more and more
information must be stored in the key, impacting performance. Key value stores therefore
are best suited for less structured data, and are often used for caching.

![Key Value]({{site.url}}/images/posts/KeyValue.png){:class="article-image"}

Document
------
A document store can solve the problem of being unable to query the
value within a key value store: by allowing you to query the value.
Document stores are particularly good for two reasons.

- Documents Can Contain Anything:
    There is again no hard schema for the contents of a document within
    a document store, although there will obviously be an implicit
    schema within the project context, defining what each type of document
    could contain. This is useful when the data you
    are storing has a lot of optional fields, which can't easily or efficiently be
    modeled using a relational model.

- Reducing Impedance Mismatch:
        If you have ever created a piece of software that interfaced with a datastore
        then you are likely to have built some sort of converter,
        to strip an Object within your program down to
        something that follows the relational model, and then another
        converter to convert it back again. This is called impedance
        mismatch, when the structure of an Object within your code does not
        match the structure of your data store, and conversions must be done. Of
        course, within most Object-Oriented languages there are classes, inheritance, and
        polymorphism, and with a RDBMS there is no way to model this. With
        a document store however the Object can be treated as an Aggregate,
        a single object. [Martin Fowler](https://www.youtube.com/watch?v=qI_g07C_Q5I)
        shows a nice example of when a document database can be used to solve this
        problem, consider an invoice containing a customer ID, their bank information,
        and a list of items they have ordered. In the relational model this data would be
        stored across numerous tables as shown, in order to build an invoice
        all three of those tables must be queried and then the information
        put together in the correct way, with a document store the invoice
        is treated as an aggregate, meaning one query and less latency.

![Document]({{site.url}}/images/posts/Document.png){:class="article-image"}

Column
------

Column databases are kind of like 3D key value stores...take a key value
store, and within the value have a key value store (I could make some
lame inception pun here but will refrain). Each row key addresses whats
called a "column family", the column family is our aggregate. Each row
can can address a different column family. This is a little more complex
than the other models, but makes it easier to retrieve individual
columns. Just like the document store this model means an Object (such
as the invoice above) can be stored in one place and not across multiple
records in multiple tables of a relational database.

![Document]({{site.url}}/images/posts/Column.png){:class="article-image"}

Aggregate Oriented
------

The three categories of NoSQL database described above are often called
*aggregate orientated*, as they all involve treating what would be, in
a relational model, multiple records as one object. This makes sharding a hell
of a lot easier than with an RDBMS. Aggregates can be grouped together so that
instead of a single query needing to access multiple records, within
multiple tables, on multiple nodes, everything can be done quickly by a
single node in the cluster. This is what makes these NoSQL databases so
horizontally scalable, and what prevents relational databases from being
feasable for "Big Data".

Graph
------

Graph databases are unlike the other types of NoSQL databases discussed
here, in my programmer head I think of the other three as being at a higher
level than an RDBMS, abstracting away complexity. I see a graph database
as the opposite, digging deeper into the relationships between data.
There are no aggregates with a graph database, nodes represent entities an
edge between two nodes represents the relationship between them, both nodes
and edges have properties. In the simple cases consider nodes which
represent people, an edge between them could represent a friendship.

![Graph database]({{site.url}}/images/posts/Graph.png){: class="article-image"}

The labels given to nodes are used for grouping, both "Tom" and "Jake" in
the above diagram are of the same group, this aids querying as queries can
be restricted to certain groups.
A graph database is queried by traversing the graph, present the graph with
an algorithm, for example if we wanted "all people that have friends
over 21", this identifies paths through the graph, of which nodes
fitting the criteria can be returned.

Graph databases, unlike the other NoSQL databases are not normally as easily
sharded across a cluster, as independent subgraphs are normally
non existent. Data can however be structured so that the
**cuts** in the graph (where the graph split between machines)
are as small as possible, reducing the number of expensive traversals
between machines in the cluster. One way
to do this is to use a heuristic algorithm such as Kernighan-Lin, an
algorithm originally designed to aid the splitting of tasks across multiple
CPU cores.

So if it is difficult to shard a graph database across a cluster, why would
you use one? The simple answer is that no other database format offers a way
of easily representing relationships between entities. This is a powerful
concept, it makes it incredibly easy to cluster similar data, imagine trying
to find "all people that have friends over 21" in a relational database, it
would be a pain. Graph databases like the other NoSQL databases are also
schema-less, meaning adding new node types and identifying new relationships
is easy and requires minimal migration.

Summary
==================

In summary NoSQL databases can be awesome... providing you use the right one
in the right place! They are not here to destroy the relational database
model, but instead to work alongside it.

It's important to consider the type of data you are storing and how it is
going to be queried when deciding on the data store to use, if your data fits the
relational model and will be queried as such, then use a RDBMS, if it
doesn't then don't. The idea of **polyglot persistence** comes into play,
using the right data for the right purpose in the right application: there is
no one size fits all.