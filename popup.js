const statusComponent = document.querySelector('#status');
const checkLocalStorage = () => {
	chrome.storage.local.get(['darkmodeForTripletex'], (localstorage) => {
		chrome.runtime.sendMessage('toggleDarkMode');
		setColorOfStatus(!localstorage.darkmodeForTripletex);
	});
};
const toggleDarkMode = () => {
	checkLocalStorage();
};

const setColorOfStatus = (status) => {
	if (status) {
		statusComponent.classList.add('activated');
		statusComponent.innerText = 'Aktivert';
	} else {
		statusComponent.classList.remove('activated');
		statusComponent.innerText = 'Deaktivert';
	}
};

chrome.storage.local.get(['darkmodeForTripletex'], (localstorage) => {
	setColorOfStatus(localstorage.darkmodeForTripletex);
});

document
	.querySelector('.toggleButton')
	.addEventListener('click', toggleDarkMode);
