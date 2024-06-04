class Book {
  constructor(title, author, isbn) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
    this.isAvailable = true;
  }

  updateStatus() {
    if (this.isAvailable == true) {
      this.isAvailable = false;
    } else this.isAvailable == true;
  }
}

class Library {
  constructor() {
    this.books = [];
  }

  addBooks(book) {
    this.books.push(book);
    this.displayBooks();
  }

  displayBooks() {
    this.books.forEach((book) => {
      `Book Title: ${book.title}, Author ${book.author}, ISBN: ${book.isbn}`;
    });
  }

  findBook(title) {
    return this.books.find((book) => book == title);
  }

  borrowBooks(title) {
    const book = this.findBook(title);

    if (book.isAvailable == false) return;

    alert(
      `A book named ${book.title} with the ISBN of ${book.isbn} is being borrowed out`
    );

    this.updateStatus();
  }

  returnBook(title) {
    const book = this.findBook(title);

    alert(
      `A book named ${book.title} with the ISBN of ${book.isbn} has been returned`
    );

    book.updateStatus();
  }
}
