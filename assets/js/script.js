let dropdown = document.querySelectorAll(".dropdown__list");
let contentWrapper = document.querySelector(".main__offers");
let favouritesCounter = 0;
let counterHTML = document.createElement("span");
counterHTML.classList.add("favourites")
let content = [
    {
        img: "./assets/images/offer.jpg",
        description:"TALL",
        paragraph:"Wrangler small logo crew neck t-shirt in white",
        price:"£16.63"
    },
    {
        img: "./assets/images/offer.jpg",
        description: "TALL",
        paragraph:"Wrangler logo chest stripe rugby polo in blue/white",
        price:"£50.63"
    },
    {
        img: "./assets/images/offer.jpg",
        description: "TALL",
        paragraph: "Wrangler kobel retro large logo ringer t-shirt in white",
        price:"£20.97"
    },
    {
        img: "./assets/images/offer.jpg",
        description: "TALL",
        paragraph: "Lyle & Scott polo burgundy",
        price: "£44.12"
    },
    {
        img: "./assets/images/offer.jpg",
        description: "TALL",
        paragraph: "COLLUSION Unisex Long sleeve t-shirt with graphic print in neon green",
        price: "£12.29"
    },
    {
        img: "./assets/images/offer.jpg",
        description: "TALL",
        paragraph: "ASOS DESIGN Disney oversized t-shirt with rainbow",
        price: "£22.42"
    },
    {
        img: "./assets/images/offer.jpg",
        description: "TALL",
        paragraph: "COLLUSION Unisex oversized t-shirt with back print",
        price: "£10.12"
    },
    {
        img: "./assets/images/offer.jpg",
        description: "TALL",
        paragraph: "ASOS DESIGN Mickey reloxed t-shirt with retro print",
        price: "£18.08"
    }
];
BuildFilterItem(dropdown,[{type:"Grey",count:1014},{type:"Navy",count: 1014},{type:"Blue",count:1014},{type:"Green",count:1014}]);
AddContent(contentWrapper,content);
RenderCount();
contentWrapper.addEventListener('mouseover',(event)=>{
    let prevItem = contentWrapper.querySelector(".item__img-description--show");
    if(prevItem)
        prevItem.classList.remove("item__img-description--show");
    if(event.target.classList == "item__img"){
        event.composedPath()[1].querySelector(".item__img-description").classList.add("item__img-description--show");
    }
    return event;
},true);
contentWrapper.addEventListener('click',(event)=>{
    if(event.target.classList.value.includes("item__heart-full")){
        if(event.target.classList.value.includes("item__heart-full--show")){
            favouritesCounter--;
            event.target.classList.remove("item__heart-full--show");
        }else{
            event.target.classList.add("item__heart-full--show");
            favouritesCounter++;
        }
        RenderCount();
        return;
    }
    for(let item of event.composedPath()){
        if(item.classList){
            if(item.classList.value === "offers__item"){
                console.log(item.childNodes)
                let htmlMarkup = `<html><head><title>${item.childNodes[7].innerText}</title></head>
                <body>
                <img src="${item.childNodes[1].src}" alt=""
                    style="
                    display: block;
                    margin: 0 auto;
                    border-radius: 5px;
                    "/>
                <p style="
                    text-align: center;
                    font-size: 17;
                    font-family: sans-sarif;
                    padding: 10px;
                    font-weight: bold;
                ">${item.childNodes[9].innerText}</p>
                <span 
                    style="
                        display: block; 
                        background-color: silver; 
                        padding: 5px; 
                        color: white;
                        font-size: 20px; 
                        font-weight: bolder; 
                        margin: 0 auto; 
                        text-align: center;
                        font-family: sans-sarif;
                        border-radius: 5px;">${item.childNodes[11].innerText}</span>
                </body></head>`;
                let newWindow = window.open("","win","width = 450,height=650");
                newWindow.document.open("text/html","replace");
                newWindow.document.write(htmlMarkup);
                newWindow.document.close();
            }
        }
    }
});
function RenderCount(){
    counterHTML.innerText = "Favourties: " + favouritesCounter;
    contentWrapper.insertBefore(counterHTML,contentWrapper.childNodes[0]);
}
function BuildFilterItem(wrapper,items){ 
    items.sort((itemOne,itemTwo)=>{
        if(itemOne.type > itemTwo.type)
            return 1;
        else if(itemTwo.type > itemOne.type)
            return -1;
        return 0;
    });
    items.map((item,index)=>{
        items[index].html = `<li class="dropdown__list__item">
                        ${item.type} <span class="list__item__count">${item.count}</span>
                       </li>`;
    });
    items.forEach((item)=>{
        wrapper[1].innerHTML += item.html;
    });
}

function AddContent(contentWrapper,itemInfo){
    itemInfo.map((item,index)=>{
        itemInfo[index].html =   
            `<div class="offers__item">
            <img class="item__img" src=${item.img} alt="Offer" />
            <img class="item__heart-shape" src="./assets/images/heart-shape.png" alt="Hearth Shape">
            <img class="item__heart-full" src="./assets/images/heart-full.png" alt="Hearth Full">
            <p class="item__img-description">${item.description}</p>
            <p class="item__paragraph">
                ${item.paragraph}
            </p>
            <span class="item__price">${item.price}</span>
            </div>`
    });
    itemInfo.forEach((item)=>{
        contentWrapper.innerHTML += item.html;
    });
}