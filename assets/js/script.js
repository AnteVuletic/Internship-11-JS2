let dropdown = document.querySelectorAll(".dropdown__list");
let contentWrapper = document.querySelector(".main__offers");
let counterHTML = document.createElement("span");
let filteredCount = document.querySelector("#bonus");
let filterList = [];

counterHTML.classList.add("favourites");
let content = [
    {
        id: 1,
        img: "./assets/images/offer.jpg",
        description:"TALL",
        paragraph:"Wrangler small logo crew neck t-shirt in white",
        price:"£16.63",
        color: "white",
        favorited: false
    },
    {
        id: 2,
        img: "./assets/images/offer.jpg",
        description: "TALL",
        paragraph:"Wrangler logo chest stripe rugby polo in blue/white",
        price:"£50.63",
        color: "blue",
        favorited: false
    },
    {
        id: 3,
        img: "./assets/images/offer.jpg",
        description: "TALL",
        paragraph: "Wrangler kobel retro large logo ringer t-shirt in white",
        price:"£20.97",
        color: "white",
        favorited: false
    },
    {
        id: 4,
        img: "./assets/images/offer.jpg",
        description: "TALL",
        paragraph: "Lyle & Scott polo burgundy",
        price: "£44.12",
        color: "green",
        favorited: false
    },
    {
        id: 5,
        img: "./assets/images/offer.jpg",
        description: "TALL",
        paragraph: "COLLUSION Unisex Long sleeve t-shirt with graphic print in neon green",
        price: "£12.29",
        color: "green",
        favorited: false
    },
    {
        id: 6,
        img: "./assets/images/offer.jpg",
        description: "TALL",
        paragraph: "ASOS DESIGN Disney oversized t-shirt with rainbow",
        price: "£22.42",
        color: "blue",
        favorited: false
    },
    {
        id: 7,
        img: "./assets/images/offer.jpg",
        description: "TALL",
        paragraph: "COLLUSION Unisex oversized t-shirt with back print",
        price: "£10.12",
        color: "blue",
        favorited: false
    },
    {
        id: 8,
        img: "./assets/images/offer.jpg",
        description: "TALL",
        paragraph: "ASOS DESIGN Mickey reloxed t-shirt with retro print",
        price: "£18.08",
        color: "green",
        favorited: false
    }
];
let renderedItems = content;
BuildFilterItem(dropdown,[{type:"Grey",count:1014},{type:"Navy",count: 1014},{type:"Blue",count:1014},{type:"Green",count:1014}]);
AddContent(contentWrapper);
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
            event.target.classList.remove("item__heart-full--show");
            content[content.findIndex((object) => {return object.id === Number(event.target.id)})].favorited = false;
        }else{
            event.target.classList.add("item__heart-full--show");
            content[content.findIndex((object) => {return object.id === Number(event.target.id)})].favorited = true;
        }
        RenderCount();
        return;
    }
    for(let item of event.composedPath()){
        if(item.classList){
            if(item.classList.value === "offers__item"){
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
dropdown[1].addEventListener("click",(event)=>{
    if(event.target.classList.value.includes("dropdown__list__item")){
        if(event.target.classList.value.includes("dropdown__list__item--clicked")){
            event.target.classList.remove("dropdown__list__item--clicked");
            let indexFound = filterList.indexOf(event.target.innerText.toLowerCase())
            filterList.splice(indexFound,1);
        }
        else{
            event.target.classList.add("dropdown__list__item--clicked");
            filterList.push(event.target.innerText.toLowerCase());
        }
    }
    filteredCount.innerText = filterList.length + " selected";
    if(filterList.length === 0){
        renderedItems = content;
        AddContent(contentWrapper);
    }else{
        renderedItems = content.filter((item)=>{
            for(let filter of filterList){
                if(filter.includes(item.color))
                    return true
            }
            return false;
        });
        AddContent(contentWrapper);
    }
});
function RenderCount(){
    counterHTML.innerText = "Favourties: " + renderedItems.filter((item)=>{return item.favorited}).length;
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

function AddContent(contentWrapper){
    contentWrapper.innerHTML = "";
    renderedItems.map((item,index)=>{
        if(item.favorited){
            renderedItems[index].html =   
            `<div class="offers__item">
            <img class="item__img" src=${item.img} alt="Offer" />
            <img class="item__heart-shape" src="./assets/images/heart-shape.png" alt="Hearth Shape">
            <img id=${item.id} class="item__heart-full item__heart-full--show" src="./assets/images/heart-full.png" alt="Hearth Full">
            <p class="item__img-description">${item.description}</p>
            <p class="item__paragraph">
            ${item.paragraph}
            </p>
            <span class="item__price">${item.price}</span>
            </div>`;
        }else{
            renderedItems[index].html =   
            `<div class="offers__item">
            <img class="item__img" src=${item.img} alt="Offer" />
            <img class="item__heart-shape" src="./assets/images/heart-shape.png" alt="Hearth Shape">
            <img id=${item.id} class="item__heart-full" src="./assets/images/heart-full.png" alt="Hearth Full">
            <p class="item__img-description">${item.description}</p>
            <p class="item__paragraph">
            ${item.paragraph}
            </p>
            <span class="item__price">${item.price}</span>
            </div>`;
        }
    });
    renderedItems.forEach((item)=>{
        contentWrapper.innerHTML += item.html;
    });
    RenderCount(renderedItems);
}