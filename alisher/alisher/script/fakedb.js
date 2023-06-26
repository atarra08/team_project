class User {
    constructor(id, fullname, email, password, imageLink) {
        this.id = id
        this.imageLink = imageLink
        this.email = email
        this.fullname = fullname
        this.posts = []
        this.password = password
    }
}

class Post {
    constructor(title, content, imageLink, isPrivate, type) {
        this.title = title
        this.type = type
        this.isPrivate = isPrivate
        this.imageLink = imageLink
        this.content = content
    }
}


const loginForm = document.getElementById('login_form');
const keys = Object.keys(localStorage);
const registrationForm = document.getElementById('registration-form');
const birthdayInput = document.getElementById('r_birthday')
const loginErrorMessage = document.getElementById('l-error-message')
const registrationErrorMessage = document.getElementById('r-error-message')

let users = [];
const addUser = (user) => {
    users.push(user)
    localStorage.setItem(`${user.id}`, JSON.stringify(user))
}
const getMaxValidDate = () => {
    let currentDate = new Date()
    return new Date(currentDate.getFullYear() - 16, currentDate.getMonth(), currentDate.getDay())
}


keys.forEach(key => {
    const user = JSON.parse(localStorage.getItem(key));
    addUser(user)
});

if (birthdayInput) {
    birthdayInput.setAttribute('max', `${getMaxValidDate()}`)
    birthdayInput.setAttribute('min', `1900-01-01`)
    birthdayInput.addEventListener('focus', () => {
        birthdayInput.setAttribute('type', 'date')
        birthdayInput.setAttribute('max', `${getMaxValidDate()}`)
    })
}


const getUserByEmail = email => users.filter(u => u.email === email)[0];
const getHTMLValue = (id) => document.getElementById(id).value

registrationForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const email = getHTMLValue('r_email')

    if (getUserByEmail(email)) {
        registrationErrorMessage.innerHTML = 'This email registered yet'
        return;
    }

    const user = new User(
        users.length + 1,
        getHTMLValue('r_fullname'),
        email,
        getHTMLValue('r_password'),
        getHTMLValue('r_imageLink')
    )
    addUser(user);
    window.location.href = `./Profile.html?id=${user.id}&state=me`;
})

loginForm.addEventListener('submit', (event) => {
    event.preventDefault()
    const email = getHTMLValue('l_email')
    const password = getHTMLValue('l_password')

    let user = getUserByEmail(email)

    if (user && user.password === password) {
        window.location.href = `/Profile.html?id=${user.id}&state=me`;
    } else {
        loginErrorMessage.innerHTML = 'Invalid credentials'
    }
})

