# Question 1:
Hello,
I'm new to search engines, and there are a lot of concepts I'm not educated on.
To make my onboarding smoother, it'd help if you could provide me with some
definitions of the following concepts:
- Records
- Indexing
I'm also struggling with understanding what types of metrics would be useful to
include in the "Custom Ranking."
Cheers, George

## Answer 1:
Hi George,
first of all thanks for contacting Algolia, for database concerns you're in good hands!
Regarding your questions:

- An index is the name given to place where you store your data in Algolia.
An index in Algolia is similar to a table in a database.

- A record is the name given to the data objects you've stored in an Algolia Index.
A record in Algolia is similar to a row result in a database request.
The records are structured as pair of key/value, Algolia store the data in JSON format.
Each records are optimized to speed-up the searching, filtering and ranking request.

Algolia is here to simplify your work, to not have to worry about technology,
here is the description of the Indexes and the Records:
https://www.algolia.com/doc/guides/getting-started/what-is-algolia/?language=javascript#vocabulary

Regarding the "Custom Ranking", it depends on your records structure and on your
relevant business metrics to reorder.
"Custom Ranking" allows you to reorder your results based on a second parameter
that you have to defined in in your data.
See the documentation and tutorial:
https://www.algolia.com/doc/guides/ranking/custom-ranking/
https://www.algolia.com/doc/tutorials/indexing/ranking/how-to-boost-or-penalize-some-records-in-the-search-results/?language=javascript#update-the-custom-ranking

Cheers,
Brice

________________________________________________________________________________

# Question 2:
Hello,
Sorry to give you the kind of feedback that I know you do not want to hear,
but I really hate the new dashboard design. Clearing and deleting indexes are
now several clicks away. I am needing to use these features while iterating,
so this is inconvenient.
Regards, Matt


## Answer 2:
Hi Matt,

We are very sorry here at Algolia to hear that some of our users are not satisfy
of the services we deliver to them.
We have updated our interface based on several pointers that show us that most of
the users are satisfied with this new presentation.
We really take care of all the opinions, could you dig your problem description
and present me an alternative so I can forward your request to the product manager
for later updates.
At the meantime try to play a bit with our new interface to give it a change to
fill your needs, some features are now more accessible and prettier organized!

Thanks for using Algolia,
Brice

________________________________________________________________________________

# Question 3:
Hi,
I'm looking to integrate Algolia in my website. Will this be a lot of development
work for me? What's the high level process look like?
Regards, Leo


## Answer 3:
Hi Leo,

first of all thanks for contacting Algolia, for database concerns you're in good hands!
Algolia provides a set of tools and services to easily integrate database request
for small and large companies.

If the data you want to manage through Algolia is small (<500Mo) and simply structured
(<10 tables) the integration process will be simple (around a couple of hours to have it done).
The more your data get wide and diversely structured the more the integration level
will be high.
See the implementation description here to see where your high-level would fit:
https://www.algolia.com/doc/guides/getting-started/what-is-algolia/

I suggest you to have a look to our Tutorial and API to see what can be done and how:
https://www.algolia.com/doc/tutorials/
https://www.algolia.com/doc/api-reference/

For the majority of our users the integration of Algolia is very simple and the
benefits for you are enormous so give it a try!

Thanks for trusting Algolia,
Brice


________________________________________________________________________________
