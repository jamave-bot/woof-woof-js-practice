//grabs the necessary nodes
const dogBar = document.getElementById('dog-bar');
const dogInfo = document.getElementById('dog-info')

//fetches the array of puppy objects
//for each element, takes the name attribute and puts it in a span tag
//and appends it to the dogBar node
fetch('http://localhost:3000/pups')
    .then(res => res.json())
    .then((pupsArr) =>{
        pupsArr.forEach(pup => {
            let span = document.createElement('span');
            span.innerText= pup.name;

            span.addEventListener('click', ()=>{
                dogInfo.innerHTML = `
                <img src= ${pup.image}>
                <h2> ${pup.name} </h2>
                <button>${pup.isGoodDog ? 'Good Dog!': 'Bad Dog!' } </button>
                `

                let button = dogInfo.querySelector('button');
                button.addEventListener('click', ()=>{
                    if (pup.isGoodDog){
                        fetch(`http://localhost:3000/pups/${pup.id}`, {
                            method: "PATCH",
                            headers: {
                                "Content-Type": "application/json",
                            },
                            body: JSON.stringify({
                                'isGoodDog' : false
                            }),
                            })
                            .then((r) => r.json())
                            .then((newPupObj) => {
                                pup.isGoodDog = newPupObj.isGoodDog;
                                button.textContent = 'Bad Dog!'
                            });
                    } else{
                        fetch(`http://localhost:3000/pups/${pup.id}`, {
                            method: "PATCH",
                            headers: {
                                "Content-Type": "application/json",
                            },
                            body: JSON.stringify({
                                'isGoodDog' : true
                            }),
                            })
                            .then((r) => r.json())
                            .then((newPupObj) => {
                                pup.isGoodDog = newPupObj.isGoodDog;
                                button.textContent = 'Good Dog!'
                            })
                    }
                })
            })


            dogBar.append(span)
        });



    } )