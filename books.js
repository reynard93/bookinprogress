//should get last id
let myLibrary = JSON.parse(localStorage.getItem('books')) || [];
let id = myLibrary.length? myLibrary[myLibrary.length - 1].id : -1;
const form = document.getElementById("myForm");

function openForm() {
  form.style.display = "block";
}

function closeForm() {
  form.style.display = "none";
}

var serialize = function(form) {
  // Setup our serialized data
  var serialized = [];

  const inputs = form.getElementsByTagName("input");

  // Loop through each field in the form
  for (var i = 0; i < inputs.length; i++) {
    var field = inputs[i];

    // Don't serialize fields without a name, submits, buttons, file and reset inputs, and disabled fields
    if (
      !field.name ||
      field.disabled ||
      field.type === "file" ||
      field.type === "reset" ||
      field.type === "submit" ||
      field.type === "button"
    )
      continue;

    // If a multi-select, get all selections
    if (field.type === "select-multiple") {
      for (var n = 0; n < field.options.length; n++) {
        if (!field.options[n].selected) continue;
        serialized.push({
          name: field.name,
          value: field.options[n].value
        });
      }
    }

    // Convert field data to a query string
    else if (
      (field.type !== "checkbox" && field.type !== "radio") ||
      field.checked
    ) {
      serialized.push({
        name: field.name,
        value: field.value
      });
    }
  }

  return serialized;
};

$(document).ready(function(){
  animateDiv('.open-button');
});

function makeNewPosition(){
  
  // Get viewport dimensions (remove the dimension of the div)
  var h = $(window).height() - 50;
  var w = $(window).width() - 50;
  
  var nh = Math.floor(Math.random() * h);
  var nw = Math.floor(Math.random() * w);
  
  return [nh,nw];    
  
}

function animateDiv(myclass){
  var newq = makeNewPosition();
  $(myclass).animate({ top: newq[0], left: newq[1] }, 1000,   function(){
    animateDiv(myclass);        
  });
  
};

const bookDOM = document.querySelector(".books table");
function Book({ title, author, pages, read = false }) {
  id++;
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.id = id;
  this.read = read === "on" ? true : false;
  
}

function addBookToLibrary() {
  var serializedData = serialize(form);
  let result = {};

  serializedData.forEach(function(data) {
    result[data.name] = data.value;
  });

  const myBook = new Book(result);
  myLibrary.push(myBook);
  localStorage.setItem("books", JSON.stringify(myLibrary));
  render(myLibrary);
  const realForm = form.getElementsByTagName("form");
  realForm[0].reset();
  closeForm();
}

function toggle() {
  const searchID = event.target.parentElement.firstElementChild.innerHTML;
  var theEle = myLibrary.find(e => e.id == searchID);
  theEle.read = !theEle.read;
  render(myLibrary);
}

function render(library) {
  bookDOM.innerHTML =
    "<tr><th>ID</th><th>Title</th><th>Author</th><th>Pages</th><th>Read?</th><th>Delete</th></tr>";
  library.forEach(element => {
    let readalrd = element["read"] ? true : false;
    insertHTML = `<tr>
       <td>${element.id}</td>
       <td>${element.title}</td>
       <td>${element.author}</td>
       <td>${element.pages}</td>
       <td style="background:${
         readalrd
           ? "#fff url('icons/toggle-on.png') no-repeat center center;"
           : "#fff url('icons/toggle-off.png') no-repeat center center;"
       }" onclick="toggle()"></td>
       <td style="background:#fff url('icons/delete.png') no-repeat center center;" onclick="deleteBook()"></td>
    </tr>`;

    bookDOM.innerHTML += insertHTML;
  });
}

function deleteBook() {
  const searchID = event.target.parentElement.firstElementChild.innerHTML;
  myLibrary.splice(searchID, 1);
  localStorage.setItem("books", JSON.stringify(myLibrary));
  render(myLibrary);
}

render(myLibrary);


