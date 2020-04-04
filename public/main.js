function onOff(){
    document
        .querySelector("#modal")
        .classList
        .toggle("hide")

    document
        .querySelector("body")
        .classList
        .toggle("hidescroll")
    
    document
        .querySelector("#modal")
        .classList
        .toggle("addscroll")
}

function checkFields(event) {
    const valuesTocheck = [
        "title",
        "category",
        "image",
        "description",
        "link",
    ]

    const isEmpty = valuesTocheck.find(function(value){

        const checkIfisString = typeof event.target[value].value === "string"
        const checkIfIsEmpty = !event.target[value].value.trim()

        if (checkIfisString && checkIfIsEmpty){
            return true
        }

    })

    if (isEmpty) {
        event.preventDefault()
        alert("favor, preencha todos os campos")
    }

}