const library = [];

function Book(title, author, pages, readed) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.readed = readed;
}

function addBookToLibrary() {
  // take value from input
  let title = document.querySelector('[name="title"]');
  let author = document.querySelector('[name="author"]');
  let pages = document.querySelector('[name="pages"]');
  let readed = document.querySelector('[name="readed"]');

  let titleValid,
    authorValid,
    pagesValid = false;

  // validate title
  if (validateInput("text", title.value)) {
    handleStyle(title, true);
    titleValid = true;
  } else {
    handleStyle(title, false);
    titleValid = false;
  }
  // validate author
  if (validateInput("text", author.value)) {
    handleStyle(author, true);
    authorValid = true;
  } else {
    handleStyle(author, false);
    authorValid = false;
  }
  // valid pages count
  if (validateInput("number", pages.value)) {
    handleStyle(pages, true);
    pagesValid = true;
  } else {
    handleStyle(pages, false);
    pagesValid = false;
  }

  // add book to library
  if (titleValid === true && authorValid === true && pagesValid === true) {
    addBook(title, author, pages, readed);
  }
}

function addBook(title, author, pages, readed) {
  // add book to library
  library.push(
    new Book(title.value, author.value, pages.value, readed.checked)
  );

  // reset input
  title.value = "";
  author.value = "";
  pages.value = "";
  readed.checked = false;

  // show last added book on screen
  showBook(library[library.length - 1]);
}

function showBook(lastBook) {
  // create elements and show data to screen
  // section container
  let container = document.getElementById("library");
  // counter element
  let counterElem = document.getElementById("counter");
  // increase counter
  let currCounter = parseInt(counterElem.innerText);
  counterElem.innerText = currCounter + 1;

  // book container
  let cardContainer = document.createElement("div");
  cardContainer.className = "card";
  cardContainer.id = `book${library.indexOf(lastBook)}`;

  // add title
  let titleElem = document.createElement("p");
  titleElem.className = "cardBookTitle";
  titleElem.innerText = lastBook.title;
  cardContainer.append(titleElem);
  // add pages
  let pagesElem = document.createElement("p");
  pagesElem.innerText = lastBook.pages + (lastBook.pages == 1 ? " page" : " pages");
  cardContainer.append(pagesElem);
  // add author
  let authorElem = document.createElement("p");
  authorElem.className = "cardBookAuthor";
  authorElem.innerText = lastBook.author;
  cardContainer.append(authorElem);
  // add readed info
  let readedElem = document.createElement("p");
  readedElem.innerText = lastBook.readed ? "the book was read" : "the book has not been read";
  cardContainer.append(readedElem);

  // add remove btn
  let removeBtn = document.createElement("button");
  removeBtn.innerText = "Remove book!";
  removeBtn.className = "removeBtn";
  removeBtn.addEventListener("click", () => removeBook(lastBook));
  cardContainer.append(removeBtn);

  // add change readed btn
  let readedBtn = document.createElement("button");
  readedBtn.innerText = "Change readed status";
  readedBtn.className = "readedBtn";
  readedBtn.addEventListener("click", () => changeReaded(lastBook));
  cardContainer.append(readedBtn);

  // append new container to screen
  cardContainer.classList.add(lastBook.readed ? "bookReaded" : "bookNotReaded");
  container.append(cardContainer);
}

function clearLibrary() {
  library.length = 0;
  document.getElementById("library").innerHTML = "";
  document.getElementById("counter").innerText = 0;
}

function validateInput(type, value) {
  if (type === "text") {
    if (value.length > 0 && value.length <= 30) {
      return true;
    }
  }
  if (type === "number") {
    if (value > 0 && value <= 20000) {
      return true;
    }
  }

  return false;
}

function handleStyle(elem, state) {
  if (state === true) {
    // reset to default
    // reset old error messages if any
    document.getElementById(`${elem.name}Error`).style.display = "none";
    elem.style.border = "1px solid #ccc"; /* default style from css */
  }
  if (state === false) {
    // if error message
    document.getElementById(`${elem.name}Error`).style.display = "block";
    elem.style.border = "1px solid red";
  }
}

function removeBook (book) {
  // remove from library
  let bookIndex;
  library.map((b,i) => {
    if ((b.title === book.title) && (b.author === book.author) && (b.pages === book.pages) && (b.readed === book.readed)) {
      bookIndex = i;
    }
    return;
  });

  library.splice(bookIndex, 1);

  // remove card
  let currentCardElem = event.target.parentNode;
  currentCardElem.parentNode.removeChild(currentCardElem);

  // reduce book counter
  let counterElem = document.getElementById("counter");
  // increase counter
  let currCounter = parseInt(counterElem.innerText);
  counterElem.innerText = currCounter - 1;
}

function changeReaded (book) {
  let card = event.target.parentNode;
  library.map((b,i) => {
    if ((b.title === book.title) && (b.author === book.author) && (b.pages === book.pages) && (b.readed === book.readed)) {
      if (book.readed === true) {
        card.classList.remove("bookReaded");
        card.classList.add("bookNotReaded");
        // select readed message elem
        card.childNodes[3].innerText = "the book has not been read";
      } else {
        card.classList.remove("bookNotReaded");
        card.classList.add("bookReaded");
        // select readed message elem 
        card.childNodes[3].innerText = "the book was read";
      }
      b.readed = !b.readed;
    }
    return;
  });
}
