chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
	if (changeInfo.status === 'loading') {
		chrome.storage.local.get(
			{ darkmodeForTripletex: true },
			(localstorage) => {
				if (localstorage.darkmodeForTripletex == true) {
					setDarkMode();
				}
			}
		);
	}
});

const setDarkMode = () => {
	chrome.tabs.query({ currentWindow: true, active: true }, (tab) => {
		if (!(tab.length == 0)) {
			if (
				tab[0].url.includes('tripletex.no') &&
				tab[0].status === 'loading'
			) {
				chrome.tabs.insertCSS(tab[0].id, {
					file: 'styles.css',
					runAt: 'document_end',
				});
			}
		}
	});
};

chrome.runtime.onMessage.addListener((request, sender, sendReponse) => {
	if (request === 'toggleDarkMode') {
		chrome.storage.local.get(['darkmodeForTripletex'], (data) => {
			if (data.darkmodeForTripletex === false) {
				chrome.storage.local.set({ darkmodeForTripletex: true }, () => {
					chrome.tabs.reload();
				});
			} else {
				chrome.storage.local.set(
					{ darkmodeForTripletex: false },
					() => {
						chrome.tabs.reload();
					}
				);
			}
		});
	}
});
