console.log('javascript file has loaded')



const weatherForm = document.querySelector('form')
const searchLocation  = document.querySelector('input')
const message1 = document.querySelector('#message-1')
const message2 = document.querySelector('#message-2')


weatherForm.addEventListener('submit' ,(e) =>{
    e.preventDefault()

    const location = searchLocation.value

    message1.textContent = 'data loading plz wait ... '
    message2.textContent =''
    
    fetch('http://localhost:3000/weather?address='+location).then((response)=>{
        response.json().then((data) => {
            if(data.error){
                message2.textContent = data.error
            } else {
                message1.textContent = data.location
                message2.textContent = data.forecast
            }
        })
    })
})