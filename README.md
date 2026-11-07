# Library Management System

A simple library API built with NestJS and Prisma.

## Schema Decisions

I kept Genre as its own table instead of just writing the genre name inside Book. This way one genre can have many books, and if I need to change a genre name I only change it in one place.

I used a relation between Book and Genre with genreId. This keeps the data clean and avoids repeating the same genre text many times.

I separated User and Review from Book because a user can leave many reviews and a book can have many reviews. This makes it easy to check who reviewed what and to calculate average ratings later.

I added a Role enum with PATRON and LIBRARIAN so librarians can manage books while patrons can only borrow and review. This makes permissions clear from the start.