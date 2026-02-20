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
    initApplyNow();
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
                if (loginModal) loginModal.classList.add("active");
            } else {
                if (profileMenu) profileMenu.classList.toggle("active");
            }
        });
    }

    document.addEventListener("click", function () {
        if (profileMenu) profileMenu.classList.remove("active");
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
                if (loginModal) loginModal.classList.remove("active");

                // ✅ FIXED REDIRECTS FOR ROOT STRUCTURE
                const intent = localStorage.getItem("loginIntent");

                if(intent === "apply"){
                    localStorage.removeItem("loginIntent");
                    location.href = "applicationform.html";
                }
                else if(intent === "dashboard"){
                    location.href = "dashboard.html";
                }
                else if(intent === "search"){
                    location.href = "searchresults.html";
                }
            }
        });
    }

    if (logoutBtn) {
        logoutBtn.addEventListener("click", function () {
            localStorage.setItem("isLoggedIn", "false");
            location.href = "../index.html";  // works from html pages
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

        location.href = "html/searchresults.html?" + params.toString();
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
    let interval;

    function getVisibleCount(){
        if(window.innerWidth >= 1200) return 3;
        if(window.innerWidth >= 768) return 2;
        return 1;
    }

    function updateCarousel(){

        const visible = getVisibleCount();
        const itemWidth = track.children[0].offsetWidth;
        const maxIndex = total - visible;

        if(index > maxIndex){
            index = 0;
        }

        track.style.transform = `translateX(-${index * itemWidth}px)`;
    }

    function slide(){
        index++;
        updateCarousel();
    }

    function startAuto(){
        clearInterval(interval);
        interval = setInterval(slide, 3000);
    }

    window.addEventListener("resize", function(){
        index = 0;
        updateCarousel();
    });

    startAuto();
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


/* ================= PROFILE PAGE ================= */

document.addEventListener("DOMContentLoaded", function(){
    initProfile();
});

function initProfile(){

    const editBtn = document.getElementById("editProfileBtn");
    const form = document.getElementById("profileForm");
    const successBox = document.getElementById("profileSuccess");

    if(!editBtn || !form) return;

    let editMode = false;

    editBtn.addEventListener("click", function(){

        if(!editMode){
            enableEdit();
        } else {
            saveProfile();
        }
    });

    function enableEdit(){

        editMode = true;

        const fields = form.querySelectorAll("input, select, textarea");

        fields.forEach(field=>{
            field.removeAttribute("readonly");
            field.removeAttribute("disabled");
            field.classList.add("editable");
        });

        editBtn.src = "../images/icon_save.png";
    }

    function disableEdit(){

        editMode = false;

        const fields = form.querySelectorAll("input, select, textarea");

        fields.forEach(field=>{
            field.setAttribute("readonly", true);
            field.setAttribute("disabled", true);
            field.classList.remove("editable");
            field.classList.remove("required-error");
        });

        editBtn.src = "../images/icon_edit.png";
    }

    function validateProfile(){

    let valid = true;
    let firstErrorField = null;

    function setError(field, message){

        field.classList.add("required-error");

        const errorDiv = document.getElementById(field.id + "Error");
        if(errorDiv){
            errorDiv.innerText = message;
            errorDiv.style.display = "block";
        }

        if(!firstErrorField){
            firstErrorField = field;
        }

        valid = false;
    }

    function clearError(field){

        field.classList.remove("required-error");

        const errorDiv = document.getElementById(field.id + "Error");
        if(errorDiv){
            errorDiv.innerText = "";
            errorDiv.style.display = "none";
        }
    }

    const name = document.getElementById("firstName");
    const lastName = document.getElementById("lastName");
    const phone = document.getElementById("phone");
    const email = document.getElementById("email");
    const address1 = document.getElementById("address1");
    const city = document.getElementById("city");
    const pin = document.getElementById("pin");

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[6-9]\d{9}$/;
    const pinRegex = /^\d{6}$/;

    const requiredFields = [
        {field:name, message:"First name is required"},
        {field:lastName, message:"Last name is required"},
        {field:address1, message:"Address Line 1 is required"},
        {field:city, message:"City is required"},
        {field:pin, message:"Pin code is required"},
        {field:phone, message:"Phone number is required"},
        {field:email, message:"Email is required"}
    ];

    requiredFields.forEach(item=>{
        if(!item.field.value.trim()){
            setError(item.field, item.message);
        } else {
            clearError(item.field);
        }
    });

    if(phone.value.trim() && !phoneRegex.test(phone.value.trim())){
        setError(phone, "Enter valid 10-digit Indian mobile number");
    }

    if(email.value.trim() && !emailRegex.test(email.value.trim())){
        setError(email, "Enter valid email address");
    }

    if(pin.value.trim() && !pinRegex.test(pin.value.trim())){
        setError(pin, "Pin must be 6 digits");
    }

    // ✅ Focus first invalid field
    if(firstErrorField){
        firstErrorField.focus();
        firstErrorField.scrollIntoView({behavior:"smooth", block:"center"});
    }

    return valid;
}



    function saveProfile(){

        if(!validateProfile()){
            return;
        }

        disableEdit();

        if(successBox){
            successBox.style.display = "block";
            successBox.innerText = "Profile updated successfully";

            setTimeout(()=>{
                successBox.style.display = "none";
            },3000);
        }
    }

    disableEdit();
}

/* ================= APPLICATION FORM ================= */

document.addEventListener("DOMContentLoaded", function(){
    initApplicationForm();
});

function initApplicationForm(){

    const submitBtn = document.getElementById("submitApplicationBtn");
    const form = document.getElementById("applicationForm");
    const successBox = document.getElementById("applicationSuccess");

    if(!submitBtn || !form) return;

    submitBtn.addEventListener("click", function(){

        if(validateApplication()){
            successBox.style.display = "block";
            successBox.innerText = 
            "Your application has been submitted. See its status in My Applications.";

            setTimeout(()=>{
                location.href = "myapplications.html";
            },2500);
        }
    });
}

function validateApplication(){

    let valid = true;
    let firstError = null;

    function setError(field, message){

        field.classList.add("required-error");

        const errorDiv = document.getElementById(field.id + "Error");
        if(errorDiv){
            errorDiv.innerText = message;
            errorDiv.style.display = "block";
        }

        if(!firstError){
            firstError = field;
        }

        valid = false;
    }

    function clearError(field){

        field.classList.remove("required-error");

        const errorDiv = document.getElementById(field.id + "Error");
        if(errorDiv){
            errorDiv.innerText = "";
            errorDiv.style.display = "none";
        }
    }

    const fields = [
        {id:"appFirstName", msg:"First name is required"},
        {id:"appMiddleName", msg:"Middle name is required"},
        {id:"appLastName", msg:"Last name is required"},
        {id:"appMobile", msg:"Mobile number is required"},
        {id:"appCity", msg:"City is required"},
        {id:"appEmail", msg:"Email is required"}
    ];

    const phoneRegex = /^[6-9]\d{9}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    fields.forEach(item=>{
        const field = document.getElementById(item.id);

        if(!field.value.trim()){
            setError(field, item.msg);
        } else {
            clearError(field);
        }
    });

    const mobile = document.getElementById("appMobile");
    const email = document.getElementById("appEmail");

    if(mobile.value.trim() && !phoneRegex.test(mobile.value.trim())){
        setError(mobile, "Enter valid 10-digit Indian mobile number");
    }

    if(email.value.trim() && !emailRegex.test(email.value.trim())){
        setError(email, "Enter valid email address");
    }

    if(firstError){
        firstError.focus();
        firstError.scrollIntoView({behavior:"smooth", block:"center"});
    }

    return valid;
}

/* ================= APPLY NOW ================= */

function initApplyNow(){

    const applyBtn = document.getElementById("applyNowBtn");
    if(!applyBtn) return;

    applyBtn.addEventListener("click", function(){

        // If user not logged in → open login modal
        if(!isLoggedIn){

            localStorage.setItem("loginIntent","apply");

            const loginModal = document.getElementById("loginModal");
            if(loginModal){
                loginModal.classList.add("active");
            }

            return;
        }

        // If logged in → go to application form
        location.href = "applicationform.html";
    });
}

