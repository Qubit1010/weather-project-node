const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const message1 = document.querySelector('#message-one')
const message2 = document.querySelector('#message-two')

weatherForm.addEventListener('submit', (e) => {
  e.preventDefault()
  const location = search.value
  console.log(location)

  message1.textContent = "loading..."
  
  const books = async (address) => {
    try {
      const response = await fetch(`http://localhost:3000/weather?address=${address}`);
      const data = await response.json();
      // const books =  data.results
      // const filteredBooks = books.slice(0, 5)
      message2.textContent = data.location
      message1.textContent = data.forecast
      console.log(data);
    } catch (error) {
      message1.textContent = error
      console.log(error);
    }
  };

  books(location)
})