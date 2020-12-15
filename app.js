// compare dates = new Date(date value from contact).toDateString() === new Date().toDateString()
function createAvatarImage() {
    const image = document.createElement("img");
    image.id = "avatarImage";
    image.className = "avatarImage";
    return image;
}

function onAvatarInput(input) {
    if (input.files && input.files[0]) {
        const reader = new FileReader();
        reader.onload = function (e) {
            let image = document.getElementById("avatarImage");
            if (image) {
                image.src = e.target.result;
            } else {
                const image = createAvatarImage();
                image.src = e.target.result;
                const container = document.querySelector(".form-control-img");
                container.appendChild(image);
            }
        }
        reader.readAsDataURL(input.files[0]);
    }
}

function setAvatar(src) {
	let image = document.getElementById("avatarImage");
	if (image) {
		image.src = src;
	} else {
		const image = createAvatarImage();
		image.src = src;
		const container = document.querySelector(".form-control-img");
		container.appendChild(image);
	}
}

window.onload = function () {
	const localKey = 'contactsCollection';
	const form = document.querySelector('form');
	const list = document.getElementById('users');
	const userName = document.getElementById('nameInput');
	const userLname = document.getElementById('lnameInput');
	const userTel = document.getElementById('telInput');
	const userEmail = document.getElementById('emailInput');
	const userBirth = document.getElementById('birthInput');
	const avatarInput = document.getElementById('avatarInput');

	let contactsList = getContacts();
	let activeContact = {};

	generateContactList();
	compareDates();

	function compareDates() {
		const calendar = document.getElementById('dateNow');
		const today = new Date().toDateString();
		calendar.innerHTML = today;
		const todayBirthDays = contactsList.filter(({birthDay}) => new Date(birthDay).toDateString() === today);
		if (todayBirthDays.length) {
			showModal(todayBirthDays);
			console.log(todayBirthDays);
		}
	}

	function clearAvatarInput() {
		avatarInput.value = '';
		const image = document.getElementById("avatarImage");
		if (image) {
			image.remove();
		}
	}

	function showModal(contacts) {
		const names = contacts.map(({ name, lastName }) => `${name} ${lastName}`);
		let modal = document.getElementById('myModal');
		modal.style.display = "block";
		let modalPar = document.getElementById('modalP');
		modalPar.innerText = `Today is ${names.join(", ")} birthday`;
		let span = document.getElementById('close');
		span.onclick = function () {
			modal.style.display = "none";
		}
	}

    function getBase64Image(img) {
        const canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0);
        const dataURL = canvas.toDataURL("image/png");
        return dataURL.replace(/^data:image\/(png|jpg);base64,/, "");
    }

	//validation
	form.addEventListener('submit', (e) => {
		e.preventDefault();
		if (validateForm()) {
			const contact = {
				id: Object.keys(activeContact).length ? activeContact.id : getId(),
				name: userName.value,
				lastName: userLname.value,
				phone: userTel.value,
				mail: userEmail.value,
				birthDay: userBirth.value
			}
			const avatarImage = document.getElementById("avatarImage");
			if (avatarImage) {
				contact.avatar = `data:image/png;base64,${getBase64Image(avatarImage)}`;
			}
			if (Object.keys(activeContact).length) {
				updateContact(contact);
				setActiveContact({});
			} else {
				recordContact(contact);
			}
		}
	})

	function setErrorFor(input) {
		const formControl = input.parentElement;
		formControl.classList.add("error");
	}

	function removeError(input) {
		const formControl = input.parentElement;
		formControl.classList.remove("error");
	}

	function isValidField(field) {
		const valid = !!field.value.trim();
		if (!valid) {
			setErrorFor(field);
		} else {
			removeError(field);
		}
		return valid;
	}

	function validateForm() {
		const validateFields = document.querySelectorAll('.form-input');
		const validFields = [];
		validateFields.forEach(field => validFields.push(isValidField(field)));
		return !validFields.some(valid => !valid);
	}

	function getContacts() {
		const res = localStorage.getItem(localKey);
		return res ? JSON.parse(res) : [];
	}

	function setToStorage(data) {
		localStorage.setItem(localKey, data);
	}

	function updateContactList(newList) {
		const string = JSON.stringify(newList);
		contactsList = newList;
		setToStorage(string);
		generateContactList();
	}

	function recordContact(newContact) {
		updateContactList([...contactsList, newContact])
	}

	function updateContact(newData) {
		contactsList = contactsList.map(contact => contact.id === newData.id ? newData : contact);
		updateContactList(contactsList);
	}

	function deleteContact(removeId) {
		contactsList = contactsList.filter(({id}) => id !== removeId);
		updateContactList(contactsList);
	}

	function switchButtonTitle() {
		const switchButton = document.getElementById('btnAdd');
		switchButton.innerText = "Update";
	}


	function setActiveContact(contact) {
		activeContact = contact;
		const contacts = document.querySelectorAll('.contact-item');
		const {id = "", name = "", lastName = "", phone = "", mail = "", birthDay = "", avatar = ""} = contact;
		contacts.forEach((contact) => {
			if (contact.id === `contact-${id}`) {
				contact.classList.add('active');

			} else {
				contact.classList.remove('active');
				switchButtonTitle();
			}
		})
		userName.value = name;
		userLname.value = lastName;
		userTel.value = phone;
		userEmail.value = mail;
		userBirth.value = birthDay;
		if (avatar) {
			setAvatar(avatar);
		} else {
			clearAvatarInput();
		}
	}

	function generateContactList() {
		const fragment = document.createDocumentFragment();
		contactsList.forEach((contact) => {
			const { id, name, lastName, phone, mail, birthDay, avatar } = contact;
			const container = document.createElement('div');

			container.onclick = () => setActiveContact(contact);
			container.id = `contact-${id}`;
			container.className = 'contact-item';
			const title = document.createElement('p');
			title.className = 'titleLi'
			title.innerText = `${name} ${lastName}`;

			const infoList = document.createElement('div');
			infoList.className = 'infoList'
			infoList.innerText = `${phone} 
            ${mail}
            ${birthDay}`;

			const data = document.createElement("div");
			data.className = "contact-data";
			data.appendChild(title);
			data.appendChild(infoList);

			const infoListPhoto = document.createElement('img');
			infoListPhoto.className = "infoListPhoto";
			infoListPhoto.alt = "Image preview...";
			infoListPhoto.src = avatar || './emptyAvatar.jpg'

			const avatarContainer = document.createElement("div");
			avatarContainer.className = "contact-avatar";
			avatarContainer.appendChild(infoListPhoto);

			container.appendChild(avatarContainer);
			container.appendChild(data);

			const deleteBtn = document.createElement('button');
			deleteBtn.className = 'deleteBtn'
			container.appendChild(deleteBtn);
			deleteBtn.addEventListener('mousedown', function (e) {
				e.preventDefault();
			})
			fragment.appendChild(container);

			deleteBtn.addEventListener('click', function () {
				deleteContact(id);
			})
			document.getElementById('nameInput').value = "";
			document.getElementById('lnameInput').value = "";
			document.getElementById('telInput').value = "";
			document.getElementById('emailInput').value = "";
			document.getElementById('birthInput').value = "";
			clearAvatarInput();
		});

		list.innerHTML = '';
		list.appendChild(fragment);
	}

	function getId() {
		return '_' + Math.random().toString(36).substr(2, 9);
	}
}


function removeAll() {
	if (window.confirm("This action will remove all contacts. Are you sure?")) {
		window.localStorage.clear();
		document.location.reload();
	}
}

function newFunction() {
	return document.getElementById('contactsCount');
}

