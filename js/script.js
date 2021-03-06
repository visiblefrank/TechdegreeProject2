/******************************************
Treehouse Techdegree:
Frank Keane
FSJS project 2 - List Filter and Pagination
******************************************/

let theList = document.querySelectorAll("li");
let searchArray = [];
const perPage = 9;
const pageContainer = document.querySelector(".page"); //this variable is global so searchBar and appendPageLinks can see it
const errorP = document.createElement("p");
//function to hide or display 'pages' - sections of 10(perPage) list items
function showPage(list, section) {
  let startIndex = section * perPage - perPage;
  let endIndex = section * perPage;
  //reset li styles
  for (let i = 0; i < theList.length; i++) {
    theList[i].style.display = "none";
  }//for
  for (let i = 0; i <= list.length; i++) {
    if (section == 1) {
      if (i >= startIndex && i <= endIndex) {
        list[i].style.display = "block";
      } 
    } else if (section > 1) {
      if (i >= startIndex + 1 && i <= endIndex + 1) {
        list[i].style.display = "block";
      } 
    }
  } //for
}//showPage

//function to generate, append, and add functionality to the pagination buttons.
function appendPageLinks(list) { 
  const pageList = Math.ceil(list.length / perPage);
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
  theList.length = 0; //reset after being filled with searchArray
  theList = document.querySelectorAll(".student-item"); //repopulate
  //console.log(theList);
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
  let match = 0;
  //ERROR
  // create elements for error message and add to page
  const errorContainer = document.createElement("div");
  pageHeader.appendChild(errorContainer);
  errorContainer.appendChild(errorP);
  errorContainer.style.textAlign = "center";
  errorP.style.color = "#4ba6c3";
  errorP.className = "error-p";
  //create an array including all student names
  let studentArray = [];
  let currentName = "";
  const studentH3 = document.getElementsByTagName("H3");
  for (let i = 0; i < studentH3.length; i++) {
    currentName = studentH3[i];
    studentArray.push(currentName.textContent);
  }
console.log(studentArray);
  let paginationList = document.querySelector(".pagination");
  // add search function to button
    searchBtn.addEventListener("click", () => {
      let searchTerm = searchInput.value;
      // loop through student details and compare search input to student names
      searchArray = [];
      for (let i = 0; i < theList.length; i++) {
        //console.log(studentArray[i]);
        if (studentArray[i].includes(searchTerm)) {
          searchArray.push(theList[i]);
          match = 1;
          errorP.textContent = "";
        } //if
      } //for
      console.log(searchArray);
      showPage(searchArray, 1);
      console.log(searchArray);
      if (match == 0) {
        errorP.textContent = "Sorry, no results have been found.";
      }
      let ul = document.querySelector(".pagination");
      document.querySelector(".page").removeChild(ul);
      appendPageLinks(searchArray);
      console.log(searchArray);
      searchInput.value = "";

  }); //listener
} //searchBar()

showPage(theList, 1);
appendPageLinks(theList);
searchBar();