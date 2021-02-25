/******************************************
Treehouse Techdegree:
Frank Keane
FSJS project 2 - List Filter and Pagination
******************************************/

let theList = document.querySelectorAll("li");
let searchArray = [];
const perPage = 9;
const pageContainer = document.querySelector(".page"); //this variable global so searchBar and appendPageLinks can see it
//function to hide or display 'pages' - sections of 10(perPage) list items
function showPage(list, section) {
  console.log(list);
  const startIndex = section * perPage - perPage;
  const endIndex = section * perPage;
  for (let i = 0; i < list.length; i++) {
    list[i].style.display = "none";
  }
  for (let i = 0; i <= list.length; i++) {
    if (i >= startIndex && i <= endIndex) {
      list[i].style.display = "block";
    }
  }
}

//function to generate, append, and add functionality to the pagination buttons.
function appendPageLinks(list) {
  const pageList = Math.ceil(list.length / perPage);
  const ul = document.createElement("ul");
  const button = document.createElement("button");
  pageContainer.appendChild(ul);
  //loop through the list of pages & create a button for each page unless there is only 1 page to display
  //console.log(pageList);
  for (let i = 1; i <= pageList; i++) {
    const li = document.createElement("li");
    const button = document.createElement("a");
    button.href = "#";
    ul.appendChild(li);
    li.appendChild(button);
    button.textContent = i;
    button.style.margin = "1em";
    ul.className = "pagination";
    const initButton = document.querySelector(".pagination a");
    initButton.className = "active";
    // when clicked, buttons will clear 'active' style  from the currently active button and add it to new active button.
    button.addEventListener("click", () => {
      const errorP = document.querySelector(".error-p");
      const activeButton = document.querySelector(".active");
      activeButton.classList.remove("active");
      event.target.className = "active";
      showPage(theList, i);
      errorP.textContent = "";
    });
  }
}

//function to add search bar to page
function searchBar() {
  //create HTML elements for search bar
  const searchContainer = document.createElement("div");
  const searchForm = document.createElement("form");
  const searchInput = document.createElement("input");
  const searchBtn = document.createElement("button");
  //styles
  searchContainer.style.float = "right";
  searchBtn.textContent = "Search";
  searchInput.type = "text";
  searchInput.placeholder = "Enter student name";
  searchInput.className = "search-input";

  // add search bar to page
  const pageHeader = document.querySelector(".page-header");
  pageHeader.appendChild(searchContainer);
  searchContainer.appendChild(searchForm);
  searchForm.appendChild(searchInput);
  searchContainer.appendChild(searchBtn);
  searchBtn.textContent = "Search";
  searchInput.type = "text";
  searchForm.style.display = "inline";
  let match = 0;

  //ERROR
  // create elements for error message and add to page
  const errorContainer = document.createElement("div");
  const errorP = document.createElement("p");
  pageHeader.appendChild(errorContainer);
  errorContainer.appendChild(errorP);
  errorContainer.style.textAlign = "center";
  errorP.style.color = "#4ba6c3";
  errorP.className = "error-p";
  //create an array including all student names
  let studentArray = [];
  let currentName = "";
  let studentH3 = document.getElementsByTagName("H3");
  for (let i = 0; i < studentH3.length; i++) {
    currentName = studentH3[i];
    studentArray.push(currentName.textContent);
  }
  // add search function to button
  searchBtn.addEventListener("click", () => {
    let searchTerm = searchInput.value;
    // let pageDiv = document.getElementsByClassName("page");
    // let paginationList = document.querySelector(".pagination");
    // loop through student details and compare search input to student names
    for (let i = 0; i < theList.length; i++) {
      if (studentArray[i].includes(searchTerm)) {
        searchArray.push(theList[i]);
        console.log(theList[i]);
        console.log(searchArray[i]);
        match = 1;
      } //if
    } //for
    console.log(searchArray);
    showPage(searchArray, 1);
    if (match == 0) {
      errorP.textContent = "Sorry, no results have been found.";
    }
    pageContainer.removeChild(paginationList);
    appendPageLinks(searchArray);
  }); //listener
} //searchBar()

showPage(theList, 1);
appendPageLinks(theList);
searchBar();
