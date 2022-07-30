/**======= MODEL =======*/


Model = {
    onDisplay: 0,
    adminMenu: false,
    avengers: [
        {
            id: "ironman",
            title: "Iron Man",
            imageSRC: "https://cdn.pixabay.com/photo/2020/11/28/03/19/iron-man-5783522_1280.png",
            clicks: 0
        },
        {
            id: "groot",
            title: "I am Groot",
            imageSRC: "https://images.unsplash.com/photo-1560343776-97e7d202ff0e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=435&q=80",
            clicks: 0
        },
        {
            id: "captainamerica",
            title: "Captain America",
            imageSRC: "https://cdn.pixabay.com/photo/2021/11/12/14/33/captain-america-6789190_1280.jpg",
            clicks: 0
        },
    ]
}


/**======= VIEWS =======*/



Views = {
    MainView: {
        render: function (avenger) {
            const image = document.querySelector("#main__img")
            const title = document.querySelector("#main__title")
            const clicks = document.querySelector("#num__clicks")
            image.src = avenger.imageSRC
            title.textContent = avenger.title
            clicks.textContent = avenger.clicks
        },
    },
    ListView: {
        render: function (avengers) {
            const form = document.querySelector("form")
            form.style.display = "none"

            avengers.map(avenger => {
                this.insertAvenger(avenger)
            })

            this.initializeEventListeners();
        },
        insertAvenger: function(avenger){
            const list_view = document.querySelector("#list__view")
            const list_item = document.createElement("li")
            list_item.classList.add("list_items")
            list_item.innerHTML = `<img id="${avenger.id}" src="${avenger.imageSRC}" />`
            list_view.append(list_item)
            list_item.addEventListener("click", function (e) {
                let index = Controllers.MainController.getAvengerIndex(e.target.id)
                Controllers.MainController.showAvenger(index)
            })
        },
        initializeEventListeners: function () {
            const list_items = document.querySelectorAll(".list_items")
            const adminBtn = document.querySelector("#admin__button")
            Array.from(list_items, li => {
                li.addEventListener("click", function (e) {
                    let index = Controllers.MainController.getAvengerIndex(e.target.id)
                    Controllers.MainController.showAvenger(index)
                })
            })
            adminBtn.addEventListener("click", function(){
                Controllers.AdminController.toggleAdmin()
            })
        }
    },
    AdminView: {
        render: function(menu){
            const form = document.querySelector("form")
            if(menu)
                form.style.display = "block";
            else    
                form.style.display = "none";

            this.initializeEventListeners()
        },
        initializeEventListeners: function(){
            const submit = document.querySelector("#submit")
            submit.addEventListener("click", function(e){
                e.preventDefault()
                const name = document.getElementById("avenger__name").value
                const image = document.getElementById("image__url").value
                const newAvenger = {}
                newAvenger.id = name.split(" ").join("").toLowerCase()
                newAvenger.title = name;
                newAvenger.imageSRC = image
                newAvenger.clicks = 0
                Controllers.AdminController.insert(newAvenger)
            })
        }
    }
}



/**======= CONTROLLERS ======= */



Controllers = {
    adminMenu: Model.adminMenu,
    MainController: {
        init: function () {
            this.showAvenger(Model.onDisplay)
            Views.ListView.render(Model.avengers);
        },
        showAvenger: function (onDisplay) {
            Model.onDisplay = onDisplay
            const item = Model.avengers[Model.onDisplay];
            Views.MainView.render(item);
        },
        getAvengerIndex: function (id) {
            return Model.avengers.indexOf(Model.avengers.filter(avenger => avenger.id == id)[0])
        },
        incrementClicks: function (onDisplay) {
            Model.avengers[onDisplay].clicks++;
            this.showAvenger(onDisplay)
        }
    },
    AdminController: {
        toggleAdmin: function(){
            this.adminMenu =! this.adminMenu
            Views.AdminView.render(this.adminMenu)
            this.setAdminMenu()
        },
        getAdminMenu: function(){
            this.adminMenu = Model.adminMenu
        },
        setAdminMenu: function(){
            Model.adminMenu = this.adminMenu
        },
        insert: function(avenger){
            Model.avengers.push(avenger)
            Views.ListView.insertAvenger(avenger)
        }
    },
    
}
Controllers.MainController.init()