import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  await prisma.review.deleteMany();
  await prisma.book.deleteMany();
  await prisma.genre.deleteMany();
  await prisma.user.deleteMany();

  const fiction = await prisma.genre.create({ data: { name: 'Fiction' } });
  const african = await prisma.genre.create({ data: { name: 'African Literature' } });
  const tech = await prisma.genre.create({ data: { name: 'Technology' } });
  const nonfiction = await prisma.genre.create({ data: { name: 'Non-Fiction' } });

  const books = [
    { title: 'The Vanishing Half', author: 'Brit Bennett', isbn: '9780525536291', publishedYr: 2020, genreId: fiction.id },
    { title: 'Normal People', author: 'Sally Rooney', isbn: '9780571334650', publishedYr: 2018, genreId: fiction.id },
    { title: 'Klara and the Sun', author: 'Kazuo Ishiguro', isbn: '9780593318171', publishedYr: 2021, genreId: fiction.id },
    { title: 'Tomorrow, and Tomorrow, and Tomorrow', author: 'Gabrielle Zevin', isbn: '9780593321201', publishedYr: 2022, genreId: fiction.id },
    { title: 'Purple Hibiscus', author: 'Chimamanda Ngozi Adichie', isbn: '9780007200283', publishedYr: 2003, genreId: african.id },
    { title: 'Disgrace', author: 'J.M. Coetzee', isbn: '9780099289524', publishedYr: 1999, genreId: african.id },
    { title: 'Born a Crime', author: 'Trevor Noah', isbn: '9780399588198', publishedYr: 2016, genreId: african.id },
    { title: 'The Theory of Flight', author: 'Siphiwe Gloria Ndlovu', isbn: '9781485903734', publishedYr: 2017, genreId: african.id },
    { title: 'Clean Code', author: 'Robert C. Martin', isbn: '9780132350884', publishedYr: 2008, genreId: tech.id },
    { title: 'Python Crash Course', author: 'Eric Matthes', isbn: '9781718502705', publishedYr: 2023, genreId: tech.id },
    { title: 'The Pragmatic Programmer', author: 'David Thomas', isbn: '9780135957059', publishedYr: 2019, genreId: tech.id },
    { title: 'Designing Data-Intensive Applications', author: 'Martin Kleppmann', isbn: '9781449373320', publishedYr: 2017, genreId: tech.id },
    { title: 'Atomic Habits', author: 'James Clear', isbn: '9780735211292', publishedYr: 2018, genreId: nonfiction.id },
    { title: 'Educated', author: 'Tara Westover', isbn: '9780399590504', publishedYr: 2018, genreId: nonfiction.id },
    { title: 'Sapiens', author: 'Yuval Noah Harari', isbn: '9780062316097', publishedYr: 2011, genreId: nonfiction.id },
  ];

  for (const b of books) {
    await prisma.book.create({ data: b });
  }

  await prisma.user.create({
    data: { name: 'Ginah Aphane', email: 'ginah.library@test.com', role: 'LIBRARIAN' },
  });

  console.log('Seeded 4 genres and 15 books');
}

main().catch((e) => { console.error(e); process.exit(1); }).finally(async () => { await prisma.$disconnect(); });
