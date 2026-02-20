let isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
let loginIntent = null;

document.addEventListener("DOMContentLoaded", function () {
    initLogin();
    initLocation();
    initCategorySelection();   // ADD THIS
    initSearch();
    initCarousel();
    initPayments();
    initPrintReceipt();
    initPaymentConfirmation();
    initNotifications();
});

/* ================= LOGIN ================= */

function initLogin() {

    const profileIcon = document.getElementById("profileIcon");
    const profileMenu = document.getElementById("profileMenu");
    const loginModal = document.getElementById("loginModal");
    const loginBtn = document.getElementById("loginBtn");
    const mobileInput = document.getElementById("mobileInput");
    const nameInput = document.getElementById("nameInput");
    const otpInput = document.getElementById("otpInput");
    const loginError = document.getElementById("loginError");
    const logoutBtn = document.getElementById("logoutBtn");

    if (profileIcon) {
        profileIcon.addEventListener("click", function (e) {
            e.stopPropagation();

            if (!isLoggedIn) {
                loginIntent = "dashboard";
                loginModal.classList.add("active");
            } else {
                profileMenu.classList.toggle("active");
            }
        });
    }

    document.addEventListener("click", function () {
        if(profileMenu) profileMenu.classList.remove("active");
    });

    if (loginBtn) {

        let step = 1;

        loginBtn.addEventListener("click", function () {

            if (step === 1) {

                const mobile = mobileInput.value.trim();

                if (!/^[6-9]\d{9}$/.test(mobile)) {
                    loginError.innerText = "Enter valid Indian mobile number";
                    loginError.style.display = "block";
                    return;
                }

                loginError.style.display = "none";

                if (mobile !== "9999999999") {
                    nameInput.style.display = "block";
                }

                otpInput.style.display = "block";
                loginBtn.innerText = "Verify OTP";
                step = 2;

            } else {

                if (otpInput.value.trim().length < 4) {
                    loginError.innerText = "Enter valid OTP";
                    loginError.style.display = "block";
                    return;
                }

                isLoggedIn = true;
                localStorage.setItem("isLoggedIn", "true");
                loginModal.classList.remove("active");

                if (loginIntent === "dashboard") {
                    location.href = "dashboard.html";
                }
                if (loginIntent === "search") {
                    location.href = "searchresults.html";
                }
            }
        });
    }

    if (logoutBtn) {
        logoutBtn.addEventListener("click", function () {
            localStorage.setItem("isLoggedIn", "false");
            location.href = "index.html";
        });
    }
}

/* ================= CATEGORY SELECT ================= */

function initCategorySelection(){

    const categories = document.querySelectorAll(".category");
    const hiddenField = document.getElementById("selectedCategoryField");

    if(!categories || !hiddenField) return;

    categories.forEach(cat=>{
        cat.addEventListener("click", function(){

            categories.forEach(c => c.classList.remove("active-category"));

            cat.classList.add("active-category");

            hiddenField.value = cat.dataset.category;
        });
    });
}

/* ================= SEARCH ================= */

function initSearch() {

    const searchBtn = document.getElementById("searchBtn");
    const searchInput = document.getElementById("searchInput");
    const searchError = document.getElementById("searchError");
    const selectedCategoryField = document.getElementById("selectedCategoryField");
    const selectedLocation = document.getElementById("selectedLocation");
    const subCategory = document.getElementById("subCategory");
    const areaSelect = document.getElementById("areaSelect");

    if (!searchBtn) return;

    searchBtn.addEventListener("click", function () {

        if (!selectedCategoryField.value) {
            searchError.innerText = "Please select category";
            searchError.style.display = "block";
            return;
        }

        searchError.style.display = "none";

        if (!isLoggedIn) {
            loginIntent = "search";
            document.getElementById("loginModal").classList.add("active");
            return;
        }

        const params = new URLSearchParams({
            location: selectedLocation.innerText,
            category: selectedCategoryField.value,
            subCategory: subCategory.value,
            area: areaSelect.value,
            search: searchInput.value
        });

        location.href = "searchresults.html?" + params.toString();
    });
}

/* ================= LOCATION ================= */

function initLocation() {

    const toggle = document.getElementById("locationToggle");
    const dropdown = document.getElementById("locationDropdown");
    const selected = document.getElementById("selectedLocation");

    if (!toggle) return;

    toggle.addEventListener("click", function (e) {
        e.stopPropagation();
        dropdown.classList.toggle("active");
    });

    dropdown.querySelectorAll("div").forEach(item => {
        item.addEventListener("click", function () {
            selected.innerText = item.dataset.city;
            dropdown.classList.remove("active");
        });
    });

    document.addEventListener("click", function () {
        dropdown.classList.remove("active");
    });
}

/* ================= RESPONSIVE CAROUSEL ================= */

function initCarousel(){

    const track = document.getElementById("carouselTrack");
    if(!track) return;

    const items = track.children;
    const total = items.length;
    let index = 0;

    function getVisibleCount(){
        if(window.innerWidth >= 1200) return 3;
        if(window.innerWidth >= 768) return 2;
        return 1;
    }

    function slide(){

        const visible = getVisibleCount();
        const maxIndex = total - visible;

        index++;

        if(index > maxIndex){
            index = 0;
        }

        track.style.transform = `translateX(-${index * (100 / visible)}%)`;
    }

    setInterval(slide, 3000);

    window.addEventListener("resize", function(){
        index = 0;
        track.style.transform = "translateX(0)";
    });



}

/* ================= PAYMENTS SORT ================= */

function initPayments(){

    const sortBtn = document.getElementById("sortPayments");
    const container = document.getElementById("paymentContainer");

    if(!sortBtn || !container) return;

    if(!sortBtn.dataset.order){
        sortBtn.dataset.order = "desc";
    }

    sortBtn.addEventListener("click", function(){

        const order = sortBtn.dataset.order;
        const tiles = Array.from(container.querySelectorAll(".payment-tile"));

        if(order === "desc"){
            tiles.sort((a,b)=> new Date(a.dataset.date) - new Date(b.dataset.date));
            sortBtn.dataset.order = "asc";
            sortBtn.src = "../images/icon_sortup.png";
        } else {
            tiles.sort((a,b)=> new Date(b.dataset.date) - new Date(a.dataset.date));
            sortBtn.dataset.order = "desc";
            sortBtn.src = "../images/icon_sortdown.png";
        }

        container.innerHTML = "";
        tiles.forEach(tile => container.appendChild(tile));
    });
}

/* ================= PRINT RECEIPT ================= */

function initPrintReceipt(){
    const printBtn = document.getElementById("printReceipt");
    if(!printBtn) return;

    printBtn.addEventListener("click", function(){
        window.print();
    });
}

/* ================= CONFIRM PAYMENT ================= */

function initPaymentConfirmation(){
    const confirmBtn = document.getElementById("confirmPayment");
    if(!confirmBtn) return;

    confirmBtn.addEventListener("click", function(){
        alert("Payment Successful (Simulation)");
        location.href = "mypayments.html";
    });
}

/* ================= NOTIFICATIONS ================= */

function initNotifications(){

    const toggle = document.getElementById("actionsToggle");
    const menu = document.getElementById("actionsMenu");
    const container = document.getElementById("notificationContainer");

    if(!toggle || !menu || !container) return;

    let dateOrder = "desc";
    let senderOrder = "asc";

    toggle.addEventListener("click", function(e){
        e.stopPropagation();
        menu.style.display = menu.style.display === "block" ? "none" : "block";
    });

    document.addEventListener("click", function(){
        menu.style.display = "none";
    });

    container.addEventListener("click", function(e){
        if(e.target.classList.contains("delete-btn")){
            e.target.closest(".notification-tile").remove();
        }
    });

    menu.querySelectorAll(".action-item").forEach(item=>{
        item.addEventListener("click", function(){

            const action = item.dataset.action;
            let tiles = Array.from(container.querySelectorAll(".notification-tile"));

            if(action === "deleteAll"){
                container.innerHTML = "";
                menu.style.display = "none";
                return;
            }

            if(action === "sortDate"){
                if(dateOrder === "desc"){
                    tiles.sort((a,b)=> new Date(a.dataset.date) - new Date(b.dataset.date));
                    dateOrder = "asc";
                } else {
                    tiles.sort((a,b)=> new Date(b.dataset.date) - new Date(a.dataset.date));
                    dateOrder = "desc";
                }
            }

            if(action === "sortSender"){
                if(senderOrder === "asc"){
                    tiles.sort((a,b)=> b.dataset.sender.localeCompare(a.dataset.sender));
                    senderOrder = "desc";
                } else {
                    tiles.sort((a,b)=> a.dataset.sender.localeCompare(b.dataset.sender));
                    senderOrder = "asc";
                }
            }

            container.innerHTML = "";
            tiles.forEach(t => container.appendChild(t));
            menu.style.display = "none";
        });
    });
}
