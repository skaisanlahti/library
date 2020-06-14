/*=== App overview ===
Add and remove books from a library array. Render library as HTML table
and enable saving/loading from local storage.

Table of contents:
- DOM Elements
- Variables
- Events
- Functions
- Init App
=============================================================================*/

/*=== DOM Elements ===
=============================================================================*/
const libraryTable = document.querySelector(".lb-main__table");
const addBook = document.querySelector(".lb-main__add-button");
const readToggle = document.querySelector("#read");

/*=== Variables ===
=============================================================================*/
let myLibrary = [
    {
        author: "Author",
        title: "Name of book",
        pages: 365,
        read: false
    },
    {
        author: "Author",
        title: "Name of book",
        pages: 532,
        read: true
    },
    {
        author: "Author",
        title: "Name of book",
        pages: 125,
        read: true
    }
];

/*=== Events ===
=============================================================================*/
addBook.addEventListener("click", (e) => {
    addBookToLibrary(myLibrary);
    render(myLibrary, libraryTable);
});
readToggle.addEventListener("click", function(e){
    this.innerText = this.innerText === "Read" ? "Unread" : "Read";
});

/*=== Functions ===
=============================================================================*/
function Book(title, author, pages, read){
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}
function addBookToLibrary(library){
    const title = document.querySelector("#title").value;
    const author = document.querySelector("#author").value;
    const pages = document.querySelector("#pages").value;
    const read = document.querySelector("#read").innerText === "Read" ? true : false;
    let newBook = new Book(author, title, pages, read);
    library.push(newBook);
    document.querySelector("#title").value = "";
    document.querySelector("#author").value = "";
    document.querySelector("#pages").value = "";
    document.querySelector("#read").innerText = "Read";
}
function render(library, table){
    // clear table for re-render
    while (table.childElementCount > 1) {
        table.removeChild(table.lastChild);
    }
    for (let i = 0; i < library.length; i++){
        // create table row
        const row = document.createElement("tr");
        row.classList.add("lb-main__table-row");
        libraryTable.appendChild(row);
        // create table cells
        const name = document.createElement("td");
        const author = document.createElement("td");
        const pages = document.createElement("td");
        const read = document.createElement("td");
        const readButton = document.createElement("button");
        const remove = document.createElement("td");
        const removeButton = document.createElement("button");
        // set cell data
        name.innerText = library[i].title;
        author.innerText = library[i].author;
        pages.innerText = library[i].pages;
        readButton.innerText = library[i].read ? "Read" : "Unread";
        removeButton.innerText = "Remove";
        // append elements to parents
        row.appendChild(name);
        row.appendChild(author);
        row.appendChild(pages);
        row.appendChild(read);
        read.appendChild(readButton);
        row.appendChild(remove);
        remove.appendChild(removeButton);
        // add event listeners
        readButton.addEventListener("click", function(e){
            library[i].read = !library[i].read;
            this.innerText = library[i].read ? "Read" : "Unread";
        });
        removeButton.addEventListener("click", (e) => {
            library.splice(i,1);
            render(library, table);
        });
    }
    // update local storage
    localStorage.setItem("lib", JSON.stringify(library));
}

/*=== Init App ===
=============================================================================*/
if (!localStorage.getItem("lib")){
    console.log("Initializing empty storage...")
    localStorage.setItem("lib", JSON.stringify(myLibrary));
    render(myLibrary, libraryTable);
}else {
    console.log("Storage is already setup. Loading library...")
    myLibrary = JSON.parse(localStorage.getItem("lib"));
    render(myLibrary, libraryTable);
}

