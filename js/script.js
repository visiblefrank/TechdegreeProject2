/******************************************
Treehouse Techdegree:
Frank Keane
FSJS project 2 - List Filter and Pagination
******************************************/

let theList = document.querySelectorAll("li");
let searchArray = [];
const perPage = 9;
const pageContainer = document.querySelector(".page");
const errorP = document.createElement("p");
//function to hide or display 'pages' - sections of 10(perPage) list items
function showPage(list, section) {
  let startIndex = section * perPage - perPage + (section - 1); // -1 to level index(starts at 0) and section number (starts at 1)
  let endIndex = section * perPage + (section - 1) ;
  let pageList = Math.ceil(list.length / perPage); 
  //reset li styles
  for (let i = 0; i < theList.length; i++) {
    theList[i].style.display = "none";
  }//for
    for (let i = 0; i <= list.length - 1; i++) { // -1 so it doesn't go out of bounds and cause undefined
        if (i >= startIndex && i <= endIndex) {
          list[i].style.display = "block"
        } //if
    } //for
}//showPage

//function to generate, append, and add functionality to the pagination buttons.
function appendPageLinks(list) { 
  let pageList = Math.ceil(list.length / perPage); 
  let ul = document.createElement("ul");
  ul.className = "pagination";
  pageContainer.appendChild(ul);
  //loop through the list of pages & create a button for each page unless there is only 1 page to display
  for (let i = 1; i <= pageList; i++) {
    let li = document.createElement("li");
    var button = document.createElement("a");
    ul.appendChild(li);
    li.appendChild(button);
    button.textContent = i;
    button.href = "#";
    button.style.margin = "1em";
    errorP.textContent = ""; 
// when clicked, buttons will clear 'active' style from the currently active button and add it to new active button. 
    button.addEventListener("click", () => { 
      let activeBtn = document.getElementsByClassName("active")[0];
      activeBtn.classList.remove('active');
      let activeButtonNumber = parseInt(event.target.textContent, 10);
      event.target.className = "active";
        errorP.textContent = "";
          if (searchArray.length > 0){
            showPage(searchArray, activeButtonNumber);
          }else {
            showPage(theList, activeButtonNumber);
          }
    });//listener
    let initButton = document.getElementsByTagName("a")[0]; 
    initButton.className = "active";
  }//for
}//appendPageLinks

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
  //ERROR
  // create elements for error message and add to page
  const errorContainer = document.createElement("div");
  pageHeader.appendChild(errorContainer);
  errorContainer.appendChild(errorP);
  errorContainer.style.textAlign = "center";
  errorP.style.color = "#4ba6c3";
  errorP.className = "error-p";
  let match = 0;
  //create an array including all student names
  let studentArray = [];
  let currentName = "";
  const studentH3 = document.getElementsByTagName("H3");
  for (let i = 0; i < studentH3.length; i++) {
    currentName = studentH3[i];
    studentArray.push(currentName.textContent);
  }
  // add search function to button
  searchBtn.addEventListener("click", () => {
    let searchTerm = searchInput.value;
    searchArray = []; //reset
    // loop through student details and compare search input to student names
    for (let i = 0; i < theList.length; i++) {
      if (studentArray[i].includes(searchTerm)) {
        searchArray.push(theList[i]);
        match = 1;
        errorP.textContent = "";
      } //if
    } //for
    if (match == 0) {
      errorP.textContent = "Sorry, no results have been found.";
    } 
    else {
      showPage(searchArray, 1);
      let ulSearch = document.querySelector(".pagination");
      document.querySelector(".page").removeChild(ulSearch);
      appendPageLinks(searchArray);
      searchInput.value = "";
    }
  }); //listener
} //searchBar()

showPage(theList, 1);
appendPageLinks(theList);
searchBar();