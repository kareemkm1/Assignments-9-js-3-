var siteNameInput = document.getElementById('siteNameInput')
var siteUrlInput = document.getElementById('siteUrlInput')
var siteNameRegex = /^[a-z ]{3,}$/;
var siteUrlRegex = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w\.-]*)*\/?$/;
var bookMarkContainer = []

if (localStorage.getItem('bookMarks') != null) {
    bookMarkContainer = JSON.parse(localStorage.getItem('bookMarks'))
    displayBookMark()
}


function addBookMark() {
    var isValid = validate(siteNameRegex, siteNameInput) && validate(siteUrlRegex, siteUrlInput)
    if (isValid === true) {
        bookMark = {
            name: siteNameInput.value,
            url: siteUrlInput.value
        }
        bookMarkContainer.push(bookMark);
        localStorage.setItem('bookMarks', JSON.stringify(bookMarkContainer))
        clearBookMark()
        displayBookMark()
        const Toast = Swal.mixin({
            toast: true,
            position: "top-end",
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
                toast.onmouseenter = Swal.stopTimer;
                toast.onmouseleave = Swal.resumeTimer;
            }
        });
        Toast.fire({
            icon: "success",
            title: "Added successfully"
        });
    } else {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Something went wrong!",
            footer: `Please enter a valid Name or URL`
        });
    }
}


function clearBookMark() {
    siteNameInput.value = ''
    siteUrlInput.value = ''
    siteNameInput.classList.remove("is-valid")
    siteUrlInput.classList.remove("is-valid")
}


function displayBookMark() {
    var smallContainer = ``
    for (var i = 0; i < bookMarkContainer.length; i++) {
        smallContainer += ` <tr>
                        <td class="pt-3">${[i + 1]}</td>
                        <td class="pt-3">${bookMarkContainer[i].name}</td>
                        <td><button onclick="window.open('${bookMarkContainer[i].url}' , 'blank_')" type="button" class="btn btn-outline-success"><i class="fa-solid fa-eye fa-2xs"></i> Visit</button></td>
                        <td><button onclick="deleteBookMark(${i})" type="button" class="btn btn-outline-danger"><i class="fa-solid fa-trash fa-2xs"></i> Delete</button></td>
                    </tr>`
    }
    document.getElementById('tableBody').innerHTML = smallContainer;
}


function deleteBookMark(deletedBookMark) {

    Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
    }).then((result) => {
        bookMarkContainer.splice(deletedBookMark, 1)
        localStorage.setItem('bookMarks', JSON.stringify(bookMarkContainer))
        displayBookMark()


        if (result.isConfirmed) {
            Swal.fire({
                title: "Deleted!",
                text: "Your file has been deleted.",
                icon: "success"
            });
        }
    });

}

function searchBookMark(term) {
    var smallContainer = ``
    for (var i = 0; i < bookMarkContainer.length; i++) {
        if (bookMarkContainer[i].name.toLowerCase().includes(term.toLowerCase()) == true) {
            smallContainer += ` <tr>
                        <td>${[i + 1]}</td>
                        <td>${bookMarkContainer[i].name}</td>
                        <td><button onclick="window.open('${bookMarkContainer[i].url}' , 'blank_')" type="button" class="btn btn-info"><i class="fa-solid fa-eye fa-2xs"></i> Visit</button></td>
                        <td><button onclick="deleteBookMark(${i})" type="button" class="btn btn-danger"><i class="fa-solid fa-trash fa-2xs"></i> Delete</button></td>
                    </tr>`
        }

    }
    document.getElementById('tableBody').innerHTML = smallContainer;
}

function validate(regex, elemnt) {
    if (regex.test(elemnt.value)) {
        elemnt.nextElementSibling.classList.add("d-none")
        elemnt.classList.remove("is-invalid")
        elemnt.classList.add("is-valid")
        return true
    } else {
        elemnt.nextElementSibling.classList.remove("d-none")
        elemnt.classList.remove("is-valid")
        elemnt.classList.add("is-invalid")
        return false
    }
}

