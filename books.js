let id = 0;
const form = document.getElementById("myForm")

var serialize = function (form) {

	// Setup our serialized data
	var serialized = [];

	// Loop through each field in the form
	for (var i = 0; i < form.elements.length; i++) {

		var field = form.elements[i];

		// Don't serialize fields without a name, submits, buttons, file and reset inputs, and disabled fields
		if (!field.name || field.disabled || field.type === 'file' || field.type === 'reset' || field.type === 'submit' || field.type === 'button') continue;

		// If a multi-select, get all selections
		if (field.type === 'select-multiple') {
			for (var n = 0; n < field.options.length; n++) {
				if (!field.options[n].selected) continue;
				serialized.push(encodeURIComponent(field.name) + "=" + encodeURIComponent(field.options[n].value));
			}
		}

		// Convert field data to a query string
		else if ((field.type !== 'checkbox' && field.type !== 'radio') || field.checked) {
			serialized.push(encodeURIComponent(field.name) + "=" + encodeURIComponent(field.value));
		}
	}

	return serialized.join('&');

};

let myLibrary = [];
const bookDOM = document.querySelector('.books table');
function Book(title, author, pages, read = false) {
  this.title = title
  this.author = author
  this.pages = pages
  this.id = id
  id++;
}

Book.prototype.info = function() {
  console.log(this.title + " by " + this.author + `, ${this.pages}, ${!this.read? "not read yet." : "read already"}`)
}


function addBookToLibrary() {
  var formData = serialize(form);
  formData= formData.map(d => ([d.name,d.value]))

  myLibrary.push(formData)
 form.reset();
}

function render(library){
  library.forEach(element => {
    insertHTML = 
    `<tr>
       <td>${element.title}</td>
       <td>${element.author}</td>
       <td>${element.pages}</td>
       <td>${!this.read? "not read yet." : "read already"}</td>
    </tr>`
    bookDOM.innerHTML += insertHTML;
  });
}

book1 = new Book("mr fox", "reynard", 323);book2 = new Book("mr fox", "reynard", 323);book3 = new Book("mr fox", "reynard", 323);

render(myLibrary)

function openForm() {
  form.style.display = "block";
}

function closeForm() {
  form.style.display = "none";
}




