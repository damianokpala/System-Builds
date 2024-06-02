class Book {
  constructor(title, author, isbn) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
    this.isAvailable = true;
  }
}

class Member {
  constructor(name, memberId) {
    this.name = name;
    this.memberId = memberId;
    this.borrowedBooks = [];
  }

  borrowBook(book) {
    if (book.isAvailable) {
      book.isAvailable = false;
      this.borrowedBooks.push(book);
      return true;
    }
    return false;
  }

  returnBook(book) {
    book.isAvailable = true;
    this.borrowedBooks = this.borrowedBooks.filter((b) => b.isbn !== book.isbn);
  }
}

class Library {
  constructor() {
    this.books = [];
    this.members = [];
  }

  addBook(book) {
    this.books.push(book);
    this.displayBooks();
  }

  addMember(member) {
    this.members.push(member);
    this.displayMembers();
  }

  findBookByISBN(isbn) {
    return this.books.find((book) => book.isbn === isbn);
  }

  findMemberById(memberId) {
    return this.members.find((member) => member.memberId === memberId);
  }

  displayBooks() {
    const booksList = document.getElementById("books-list");
    booksList.innerHTML = "";
    this.books.forEach((book) => {
      const bookItem = document.createElement("li");
      bookItem.textContent = `${book.title} by ${book.author} (ISBN: ${
        book.isbn
      }) - ${book.isAvailable ? "Available" : "Borrowed"}`;
      booksList.appendChild(bookItem);
    });
  }

  displayMembers() {
    const membersList = document.getElementById("members-list");
    membersList.innerHTML = "";
    this.members.forEach((member) => {
      const memberItem = document.createElement("li");
      memberItem.textContent = `${member.name} (ID: ${member.memberId})`;
      membersList.appendChild(memberItem);
    });
  }
}

const library = new Library();

document
  .getElementById("add-book-form")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    const title = document.getElementById("book-title").value;
    const author = document.getElementById("book-author").value;
    const isbn = document.getElementById("book-isbn").value;
    const book = new Book(title, author, isbn);
    console.log(book);
    library.addBook(book);
    console.log(library.books);
    document.getElementById("add-book-form").reset();
  });

document
  .getElementById("add-member-form")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    const name = document.getElementById("member-name").value;
    const memberId = document.getElementById("member-id").value;
    const member = new Member(name, memberId);
    library.addMember(member);
    document.getElementById("add-member-form").reset();
  });

document
  .getElementById("borrow-book-form")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    const memberId = document.getElementById("borrow-member-id").value;
    const isbn = document.getElementById("borrow-book-isbn").value;
    const member = library.findMemberById(memberId);
    const book = library.findBookByISBN(isbn);
    if (member && book) {
      const success = member.borrowBook(book);
      if (success) {
        alert(`${member.name} successfully borrowed ${book.title}.`);
      } else {
        alert(`${book.title} is currently not available.`);
      }
      library.displayBooks();
    } else {
      alert("Invalid Member ID or Book ISBN.");
    }
    document.getElementById("borrow-book-form").reset();
  });
