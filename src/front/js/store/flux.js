const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			message: null,
			demo: [
				{
					title: "FIRST",
					background: "white",
					initial: "white"
				},
				{
					title: "SECOND",
					background: "white",
					initial: "white"
				}
			],
			token: null
		},
		actions: {
			// Use getActions to call a function within a fuction
			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},

			getMessage: async () => {
				const store = getStore();
				const options = {
					headers: {
						'Authorization': 'Bearer ' + store.token
					}
				}
				try {
					// fetching data from the backend

					const resp = await fetch("https://3001-4geeksacade-reactflaskh-0d7gmkrytyw.ws-us67.gitpod.io/api/hello", options)
					const data = await resp.json()
					setStore({ message: data.message })
					// don't forget to return something, that is how the async resolves
					return data;
				} catch (error) {
					console.log("Error loading message from backend", error)
				}
			},
			changeColor: (index, color) => {
				//get the store
				const store = getStore();

				//we have to loop the entire demo array to look for the respective index
				//and change its color
				const demo = store.demo.map((elm, i) => {
					if (i === index) elm.background = color;
					return elm;
				});

				//reset the global store
				setStore({ demo: demo });
			},
			syncTokenFromSessionStore: () => {
				const token = sessionStorage.getItem('token');
				console.log('Aplication just loaded, synching the session storage token');
				if (token && token != '' && token != undefined) setStore({ token: token });
			},
			logout: () => {
				sessionStorage.removeItem('token');
				console.log('Login out');
				setStore({ token: null });
			},
			login: async (email, password) => {
				const options = {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json'
					},
					body: JSON.stringify({
						email: email,
						password: password
					})
				}
				try {
					const resp = await fetch('https://3001-4geeksacade-reactflaskh-0d7gmkrytyw.ws-us67.gitpod.io/api/login', options)
					if (resp.status !== 200) {
						alert('There has been some error');
						return false;
					}

					const data = await resp.json();
					console.log('This came frome the backend'.data);
					sessionStorage.setItem('token', data.access_token);
					setStore({ token: data.access_token })
					return true;
				}
				catch (error) {
					console.error('There was an error login');
				}
			}
		}
	};
};

export default getState;
