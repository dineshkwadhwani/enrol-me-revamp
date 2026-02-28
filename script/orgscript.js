document.addEventListener("DOMContentLoaded", function(){

/* =========================================================
   ORG HEADER PROFILE TOGGLE
   ========================================================= */

const profileIcon = document.getElementById("profileIcon");
const profileMenu = document.getElementById("profileMenu");

if(profileIcon && profileMenu){

    profileIcon.addEventListener("click", function(e){
        e.stopPropagation();
        profileMenu.classList.toggle("active");
    });

    document.addEventListener("click", function(){
        profileMenu.classList.remove("active");
    });
}

/* =========================================================
   ORG LOGOUT
   ========================================================= */

const orgLogoutBtn = document.getElementById("orgLogoutBtn");

if(orgLogoutBtn){
    orgLogoutBtn.addEventListener("click", function(){
        localStorage.removeItem("orgLoggedIn");
        location.href = "../index.html";
    });
}

/* =========================================================
   ORGANIZATION LOGIN FLOW
   ========================================================= */

const orgUserId = document.getElementById("orgUserId");
const orgOtp = document.getElementById("orgOtp");
const orgLoginBtn = document.getElementById("orgLoginBtn");
const orgLoginError = document.getElementById("orgLoginError");
const otpGroup = document.getElementById("otpGroup");

if(orgLoginBtn){

    let step = 1;

    orgLoginBtn.addEventListener("click", function(){

        if(!orgLoginError) return;

        orgLoginError.innerText = "";

        /* STEP 1: USER ID VALIDATION */
        if(step === 1){

            if(!orgUserId) return;

            const user = orgUserId.value.trim();

            if(user === ""){
                orgLoginError.innerText = "Enter User ID";
                orgUserId.focus();
                return;
            }

            /* Dummy validation */
            if(user !== "orgadmin"){
                orgLoginError.innerText = "Invalid User";
                orgUserId.focus();
                return;
            }

            if(otpGroup){
                otpGroup.style.display = "block";
            }

            orgLoginBtn.innerText = "Verify OTP";
            step = 2;
        }
        else{

            /* STEP 2: OTP VALIDATION */
            if(!orgOtp) return;

            const otp = orgOtp.value.trim();

            if(otp === ""){
                orgLoginError.innerText = "Enter OTP";
                orgOtp.focus();
                return;
            }

            /* Login Success */
            localStorage.setItem("orgLoggedIn","true");
            location.href = "orgdashboard.html";
        }
    });
}

/* =========================================================
   ORGANIZATION REGISTRATION
   ========================================================= */

const orgRegisterBtn = document.getElementById("orgRegisterBtn");
const orgRegisterError = document.getElementById("orgRegisterError");

if(orgRegisterBtn){

    orgRegisterBtn.addEventListener("click", function(){

        if(!orgRegisterError) return;

        orgRegisterError.innerText = "";

        const category = document.getElementById("orgCategory");
        const orgName = document.getElementById("orgName");
        const userId = document.getElementById("orgUserIdReg");
        const email = document.getElementById("orgEmail");
        const phone = document.getElementById("orgPhone");
        const city = document.getElementById("orgCity");
        const area = document.getElementById("orgArea");
        const contactName = document.getElementById("orgContactName");
        const contactMobile = document.getElementById("orgContactMobile");
        const branchType = document.querySelector('input[name="branchType"]:checked');
        const terms = document.getElementById("orgTerms");

        if(category && category.value === ""){
            orgRegisterError.innerText = "Select Category";
            category.focus();
            return;
        }

        if(orgName && orgName.value.trim() === ""){
            orgRegisterError.innerText = "Enter Organization Name";
            orgName.focus();
            return;
        }

        if(userId && userId.value.trim() === ""){
            orgRegisterError.innerText = "Enter Organization User ID";
            userId.focus();
            return;
        }

        if(email){
            const emailVal = email.value.trim();
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

            if(emailVal === ""){
                orgRegisterError.innerText = "Enter Email";
                email.focus();
                return;
            }

            if(!emailRegex.test(emailVal)){
                orgRegisterError.innerText = "Enter Valid Email";
                email.focus();
                return;
            }
        }

        if(phone && phone.value.trim() === ""){
            orgRegisterError.innerText = "Enter Organization Phone";
            phone.focus();
            return;
        }

        if(city && city.value === ""){
            orgRegisterError.innerText = "Select City";
            city.focus();
            return;
        }

        if(area && area.value.trim() === ""){
            orgRegisterError.innerText = "Enter Area";
            area.focus();
            return;
        }

        if(contactName && contactName.value.trim() === ""){
            orgRegisterError.innerText = "Enter Contact Person Name";
            contactName.focus();
            return;
        }

        if(contactMobile && contactMobile.value.trim() === ""){
            orgRegisterError.innerText = "Enter Contact Person Mobile";
            contactMobile.focus();
            return;
        }

        if(!branchType){
            orgRegisterError.innerText = "Select Branch Type";
            return;
        }

        if(terms && !terms.checked){
            orgRegisterError.innerText = "You must accept Terms & Conditions";
            return;
        }

        alert("Registration Successful");

        location.href = "orglogin.html";
    });
}

});

document.addEventListener("DOMContentLoaded", function(){

/* ================= PROFILE TOGGLE ================= */

const profileIcon = document.getElementById("profileIcon");
const profileMenu = document.getElementById("profileMenu");

if(profileIcon && profileMenu){
    profileIcon.addEventListener("click", function(e){
        e.stopPropagation();
        profileMenu.classList.toggle("active");
    });

    document.addEventListener("click", function(){
        profileMenu.classList.remove("active");
    });
}

/* ================= LOGOUT ================= */

const orgLogoutBtn = document.getElementById("orgLogoutBtn");

if(orgLogoutBtn){
    orgLogoutBtn.addEventListener("click", function(){
        localStorage.removeItem("orgLoggedIn");
        location.href = "../index.html";
    });
}

/* ================= BANK ACCOUNT PAGE ================= */

const bankEditBtn = document.getElementById("bankEditBtn");

if(bankEditBtn){

    const fields = ["bankName","accountNumber","ifscCode","accountHolder","bankEmail","accountType","transferMode"];
    const successMsg = document.getElementById("bankSuccess");

    // Populate
    document.getElementById("bankName").value = "HDFC Bank";
    document.getElementById("accountNumber").value = "50100128396124";
    document.getElementById("ifscCode").value = "HDFC0000103";
    document.getElementById("accountHolder").value = "Kiran Wadhwani";
    document.getElementById("bankEmail").value = "kiran.d.wadhwani@gmail.com";
    document.getElementById("accountType").value = "Savings S/B";
    document.getElementById("transferMode").value = "NEFT";

    let editMode = false;

    bankEditBtn.addEventListener("click", function(){

        if(!editMode){
            fields.forEach(id => document.getElementById(id).disabled=false);
            bankEditBtn.src="../images/icon_save.png";
            successMsg.style.display="none";
            editMode=true;
        }
        else{
            if(!validateBank()) return;

            fields.forEach(id => document.getElementById(id).disabled=true);
            bankEditBtn.src="../images/icon_edit.png";
            successMsg.innerText="Bank details saved successfully.";
            successMsg.style.display="block";
            editMode=false;
        }
    });

    function validateBank(){

        let valid=true;

        function setError(id,msg){
            document.getElementById(id+"Error").innerText=msg;
            document.getElementById(id+"Error").style.display="block";
            valid=false;
        }

        function clearError(id){
            document.getElementById(id+"Error").style.display="none";
        }

        fields.forEach(id=>clearError(id));

        const ifscRegex=/^[A-Z]{4}0[A-Z0-9]{6}$/;
        const emailRegex=/^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        fields.forEach(id=>{
            const val=document.getElementById(id).value.trim();
            if(val==="") setError(id,"Required");
        });

        const ifsc=document.getElementById("ifscCode").value.trim();
        if(ifsc && !ifscRegex.test(ifsc)){
            setError("ifscCode","Invalid IFSC Code");
        }

        const email=document.getElementById("bankEmail").value.trim();
        if(email && !emailRegex.test(email)){
            setError("bankEmail","Invalid Email");
        }

        return valid;
    }
}

});

// =========================================================
// ✅ MY USERS PAGE LOGIC
// =========================================================

document.addEventListener("DOMContentLoaded", function(){

    const userForm = document.getElementById("orgUserForm");

    if(userForm){

        const params = new URLSearchParams(window.location.search);
        const mode = params.get("mode");

        if(mode === "edit"){

            // Dummy preload (replace later with real data source)
            document.getElementById("fullName").value = "Rahul Mehta";
            document.getElementById("email").value = "rahul@school.com";
            document.getElementById("phone").value = "9876543210";
            document.getElementById("role").value = "Administrator";
            document.getElementById("status").value = "Active";
        }

        const saveBtn = document.getElementById("orgUserSaveBtn");

        if(saveBtn){
            saveBtn.addEventListener("click", function(){

                const fullName = document.getElementById("fullName").value.trim();
                const email = document.getElementById("email").value.trim();

                if(fullName === "" || email === ""){
                    alert("Name and Email are required");
                    return;
                }

                alert("User saved successfully");
                location.href = "myusers.html";
            });
        }
    }

});

/* =========================================================
   ORG MY PROGRAMS LOGIC
   ========================================================= */

document.addEventListener("DOMContentLoaded", function(){

    /* ================= EDIT BUTTON ================= */

    document.querySelectorAll(".btn-edit").forEach(btn => {
        btn.addEventListener("click", function(){
            const tile = this.closest(".org-program-tile");
            const programId = tile.dataset.id;
            location.href = "manageprogram.html?mode=edit&id=" + programId;
        });
    });


    /* ================= ACTIVATE / DEACTIVATE ================= */

    document.querySelectorAll(".btn-deactivate, .btn-activate").forEach(btn => {

        btn.addEventListener("click", function(){

            const tile = this.closest(".org-program-tile");
            const isActive = tile.classList.contains("active");

            if(isActive){

                if(!confirm("Deactivate this program?")) return;

                tile.classList.remove("active");
                tile.classList.add("inactive");

                this.textContent = "Activate";
                this.classList.remove("btn-deactivate");
                this.classList.add("btn-activate");

            } else {

                if(!confirm("Activate this program?")) return;

                tile.classList.remove("inactive");
                tile.classList.add("active");

                this.textContent = "Deactivate";
                this.classList.remove("btn-activate");
                this.classList.add("btn-deactivate");
            }
        });

    });


    /* ================= COPY LINK ================= */

    document.querySelectorAll(".btn-copy").forEach(btn => {

        btn.addEventListener("click", function(){

            const tile = this.closest(".org-program-tile");
            const programId = tile.dataset.id;

            const link =
              `https://www.enrol-me.com/EnrolMe/searchresult.html?progCity=Pune&progCategory=2&progKeyWord=&programId=${programId}&progSubCategory=89`;

            navigator.clipboard.writeText(link);
            alert("Program link copied to clipboard");
        });

    });


    /* ================= MANAGE PROGRAM PREFILL ================= */

    const programForm = document.getElementById("programForm");

    if(programForm){

        const params = new URLSearchParams(window.location.search);

        if(params.get("mode") === "edit"){
            document.getElementById("progName").value = "CBSE Admission 2026";
            document.getElementById("startDate").value = "2026-01-01";
            document.getElementById("endDate").value = "2026-03-31";
            document.getElementById("status").value = "Active";
            document.getElementById("students").value = "42";
        }

        document.getElementById("saveProgramBtn")?.addEventListener("click", function(){
            alert("Program saved successfully");
            location.href="orgmyprograms.html";
        });
    }

});

/* ================= MANAGE PROGRAM VALIDATION ================= */

const saveProgramBtn = document.getElementById("saveProgramBtn");
const programForm = document.getElementById("programForm");

if(saveProgramBtn && programForm){

    saveProgramBtn.addEventListener("click", function(){

        let valid = true;

        function validateField(id){
            const field = document.getElementById(id);
            const error = document.getElementById(id+"Error");

            if(field && field.value.trim() === ""){
                field.classList.add("required-error");
                if(error) error.style.display="block";
                valid = false;
            } else {
                field.classList.remove("required-error");
                if(error) error.style.display="none";
            }
        }

        const requiredFields = [
            "session",
            "subCategory",
            "applicationForm",
            "programName",
            "capacity",
            "fromDate",
            "toDate",
            "lastDate",
            "feeUnit"
        ];

        requiredFields.forEach(id => validateField(id));

        if(!valid){
            alert("Please fill all mandatory fields");
            return;
        }

        alert("Program saved successfully");
        location.href="orgmyprograms.html";
    });
}

/* =========================================================
   APPLICATION FORM LOGIC
   ========================================================= */

document.addEventListener("DOMContentLoaded", function(){

    /* ===== LIST PAGE ACTIVATE / DEACTIVATE ===== */

    document.querySelectorAll(".btn-toggle-form").forEach(btn=>{
        btn.addEventListener("click", function(){

            const tile = this.closest(".org-program-tile");
            const active = tile.classList.contains("active");

            if(active){
                if(!confirm("Deactivate this form?")) return;
                tile.classList.remove("active");
                tile.classList.add("inactive");
                this.textContent="Activate";
            } else {
                if(!confirm("Activate this form?")) return;
                tile.classList.remove("inactive");
                tile.classList.add("active");
                this.textContent="Deactivate";
            }
        });
    });

    /* ===== EDIT NAVIGATION ===== */

    document.querySelectorAll(".btn-edit-form").forEach(btn=>{
        btn.addEventListener("click", function(){
            location.href="manageapplicationform.html?mode=edit";
        });
    });

    /* ===== BUILDER PAGE ===== */

    const addFieldBtn = document.getElementById("addFieldBtn");
    const availableFields = document.getElementById("availableFields");
    const selectedFieldsList = document.getElementById("selectedFieldsList");

    if(addFieldBtn){

        addFieldBtn.addEventListener("click", function(){

            const value = availableFields.value;

            if(value==="") return;

            const exists = Array.from(selectedFieldsList.children)
                .some(li => li.textContent.includes(value));

            if(exists){
                alert("Field already added");
                return;
            }

            const li = document.createElement("li");
            li.textContent=value;
            selectedFieldsList.appendChild(li);
        });
    }

    /* ===== SAVE VALIDATION ===== */

    const saveBtn = document.getElementById("saveApplicationFormBtn");

    if(saveBtn){
        saveBtn.addEventListener("click", function(){

            const name = document.getElementById("formName");
            const error = document.getElementById("formNameError");

            if(name.value.trim()===""){
                name.classList.add("required-error");
                error.style.display="block";
                return;
            }

            alert("Application Form Saved Successfully");
            location.href="orgapplicationforms.html";
        });
    }

});

document.addEventListener("DOMContentLoaded", function(){

const addBtn = document.getElementById("addFieldBtn");
const tableBody = document.querySelector("#selectedFieldsTable tbody");

if(addBtn){

addBtn.addEventListener("click", function(){

    const fieldName = document.getElementById("fieldNameSelect").value;
    const detailsSelect = document.getElementById("fieldDetailsSelect");
    const orderInput = document.getElementById("fieldOrder");

    if(fieldName===""){
        alert("Select Field Name");
        return;
    }

    let order = parseInt(orderInput.value);
    if(!order || order < 1){
        alert("Enter valid display order");
        return;
    }

    const selectedDetails = Array.from(detailsSelect.selectedOptions)
        .map(option => option.value)
        .join(", ");

    const rows = Array.from(tableBody.rows);
    const totalRows = rows.length;

    if(order > totalRows + 1){
        order = totalRows + 1;
    }

    // Shift existing rows
    rows.forEach(row=>{
        const currentOrder = parseInt(row.cells[2].innerText);
        if(currentOrder >= order){
            row.cells[2].innerText = currentOrder + 1;
        }
    });

    // Insert new row
    const newRow = tableBody.insertRow();
    newRow.innerHTML = `
        <td>${fieldName}</td>
        <td>${selectedDetails}</td>
        <td>${order}</td>
        <td><button onclick="this.closest('tr').remove()">Delete</button></td>
    `;

});

}

/* SAVE VALIDATION */

document.getElementById("saveApplicationFormBtn")
?.addEventListener("click", function(){

    const formName = document.getElementById("formName");
    const error = document.getElementById("formNameError");

    if(formName.value.trim()===""){
        formName.classList.add("required-error");
        error.style.display="block";
        return;
    }

    alert("Application Form Saved Successfully");
    location.href="orgapplicationforms.html";
});

});


document.addEventListener("DOMContentLoaded", function(){

const tiles = document.querySelectorAll(".gallery-tile");

tiles.forEach(tile=>{

    const img = tile.querySelector(".gallery-image");
    const deleteBtn = tile.querySelector(".delete-btn");
    const uploadBtn = tile.querySelector(".upload-btn");
    const fileInput = tile.querySelector(".file-input");
    const actions = tile.querySelector(".gallery-actions");

    function updateButtons(){
        if(!img.src || img.style.display==="none"){
            img.style.display="none";
            actions.innerHTML = `
                <button class="gallery-btn upload-btn">Upload Image</button>
            `;
            actions.querySelector(".upload-btn").addEventListener("click", ()=>{
                fileInput.click();
            });
        }
    }

    deleteBtn?.addEventListener("click", function(){
        img.src="";
        img.style.display="none";
        updateButtons();
    });

    uploadBtn?.addEventListener("click", function(){
        fileInput.click();
    });

    fileInput.addEventListener("change", function(){
        const file = this.files[0];
        if(file){
            const reader = new FileReader();
            reader.onload = function(e){
                img.src = e.target.result;
                img.style.display="block";
                location.reload();
            }
            reader.readAsDataURL(file);
        }
    });

});
});



/* =========================================================
   ORG APPLICANTS – STRICT 2 BUTTON LOGIC
   ========================================================= */


document.addEventListener("DOMContentLoaded", function(){

const container = document.getElementById("applicantContainer");
const toggle = document.getElementById("applicantActionsToggle");
const menu = document.getElementById("applicantActionsMenu");

if(!container) return;

/* ===== ACTION MENU TOGGLE ===== */

toggle?.addEventListener("click", function(e){
    e.stopPropagation();
    menu.style.display = menu.style.display==="block" ? "none":"block";
});

document.addEventListener("click", function(){
    if(menu) menu.style.display="none";
});

/* ===== STRICT 2 BUTTON ENGINE ===== */

function renderButtons(tile){

    const status = tile.dataset.status;
    const actionContainer = tile.querySelector(".program-actions");

    let btn1 = {};
    let btn2 = {};

    switch(status){

        case "Pending":
            btn1 = {text:"Select", to:"Selected", type:"light"};
            btn2 = {text:"Reject", to:"Rejected", type:"primary"};
            break;

        case "Selected":
            btn1 = {text:"Reject", to:"Rejected", type:"primary"};
            btn2 = {text:"Admit", to:"Admitted", type:"light"};
            break;

        case "Rejected":
            btn1 = {text:"Select", to:"Selected", type:"light"};
            btn2 = {text:"Admit", to:"Admitted", type:"light"};
            break;

        case "Admitted":
            btn1 = {text:"Select", to:"Selected", type:"light"};
            btn2 = {text:"Discontinue", to:"Discontinue", type:"primary"};
            break;

        case "Discontinued":
            btn1 = {text:"Select", to:"Selected", type:"light"};
            btn2 = {text:"Admit", to:"Admitted", type:"light"};
            break;
    }

    actionContainer.innerHTML = `
        <button class="program-btn ${btn1.type}" data-set="${btn1.to}">
            ${btn1.text}
        </button>
        <button class="program-btn ${btn2.type}" data-set="${btn2.to}">
            ${btn2.text}
        </button>
    `;
}

function updateStatus(tile,newStatus){
    tile.dataset.status = newStatus;
    tile.querySelector(".status-label").innerText = "Status: " + newStatus;
    renderButtons(tile);
}

/* Initial Render */
container.querySelectorAll(".applicant-tile").forEach(renderButtons);

/* Per Tile Click */
container.addEventListener("click", function(e){
    const btn = e.target.closest("button[data-set]");
    if(!btn) return;
    const tile = btn.closest(".applicant-tile");
    updateStatus(tile, btn.dataset.set);
});

/* ===== BULK ACTIONS ===== */

menu?.querySelectorAll("div").forEach(item=>{
    item.addEventListener("click", function(){

        const action = item.dataset.action;

        if(action==="selectAll"){
            container.querySelectorAll(".applicant-checkbox")
            .forEach(cb=>cb.checked=true);
        }

        if(action==="deselectAll"){
            container.querySelectorAll(".applicant-checkbox")
            .forEach(cb=>cb.checked=false);
        }

        if(action==="approveSelected"){
            bulkUpdate("Selected");
        }

        if(action==="rejectSelected"){
            bulkUpdate("Rejected");
        }

        if(action==="admitSelected"){
            bulkUpdate("Admitted");
        }

        menu.style.display="none";
    });
});

function bulkUpdate(status){
    container.querySelectorAll(".applicant-tile").forEach(tile=>{
        const cb = tile.querySelector(".applicant-checkbox");
        if(cb.checked){
            updateStatus(tile,status);
        }
    });
}

/* ===== FILTERS ===== */

const sessionFilter = document.getElementById("sessionFilter");
const programFilter = document.getElementById("programFilter");
const statusFilter = document.getElementById("statusFilter");
const searchInput = document.getElementById("applicantSearch");

function applyFilters(){

    const session = sessionFilter.value;
    const program = programFilter.value;
    const status = statusFilter.value;
    const search = searchInput.value.toLowerCase();

    container.querySelectorAll(".applicant-tile").forEach(tile=>{

        const matchSession = session==="all" || tile.dataset.session===session;
        const matchProgram = program==="all" || tile.dataset.program===program;
        const matchStatus = status==="all" || tile.dataset.status===status;
        const matchSearch = tile.innerText.toLowerCase().includes(search);

        tile.style.display =
            (matchSession && matchProgram && matchStatus && matchSearch)
            ? "block" : "none";
    });
}

[sessionFilter, programFilter, statusFilter]
.forEach(el=> el?.addEventListener("change", applyFilters));

searchInput?.addEventListener("keyup", applyFilters);

});

/* =========================================================
   APPLY OFFLINE PAGE LOGIC – CLEAN VERSION
   ========================================================= */

document.addEventListener("DOMContentLoaded", function(){

const mobileInput = document.getElementById("offlineMobile");
if(!mobileInput) return;

const verifyBtn = document.getElementById("verifyOfflineBtn");
const saveBtn = document.getElementById("offlineSaveBtn");

/* ===== MOCK DATABASE ===== */

const mockUsers = {
    "9876543210":{
        firstName:"Aarav",
        lastName:"Sharma",
        email:"aarav@email.com",
        city:"Pune"
    },
    "9999999999":{
        firstName:"Meera",
        lastName:"Patel",
        email:"meera@email.com",
        city:"Mumbai"
    }
};

/* ===== CLEAR ERRORS ===== */

function clearErrors(){
    document.querySelectorAll(".field-error-message")
        .forEach(el => el.innerText = "");
    document.querySelectorAll(".required-error")
        .forEach(el => el.classList.remove("required-error"));
}

/* ===== SHOW ERROR ===== */

function showError(id,msg){
    const el = document.getElementById(id);
    if(el) el.innerText = msg;
}

/* ===== VALIDATE FORM ===== */

function validateOfflineForm(){

    clearErrors();
    let valid = true;

    function validate(id,errorId,msg){
        const field = document.getElementById(id);
        if(!field || field.value.trim()===""){
            field.classList.add("required-error");
            showError(errorId,msg);
            valid=false;
        }
    }

    validate("offlineMobile","mobileError","Mobile required");
    validate("offlineFirstName","firstNameError","First name required");
    validate("offlineLastName","lastNameError","Last name required");
    validate("offlineEmail","emailError","Email required");
    validate("offlineCity","cityError","Select city");
    validate("offlineProgram","programError","Select program");

    return valid;
}

/* ===== VERIFY USER ===== */

verifyBtn?.addEventListener("click", function(){

    clearErrors();

    const mobile = mobileInput.value.trim();

    if(mobile.length !== 10){
        showError("mobileError","Enter valid 10 digit mobile number");
        mobileInput.classList.add("required-error");
        return;
    }

    if(mockUsers[mobile]){
        const user = mockUsers[mobile];
        document.getElementById("offlineFirstName").value = user.firstName;
        document.getElementById("offlineLastName").value = user.lastName;
        document.getElementById("offlineEmail").value = user.email;
        document.getElementById("offlineCity").value = user.city;
        alert("User found and populated.");
    }else{
        alert("Provided Mobile Number is not registered with us, add details to proceed.");
    }
});

/* ===== SAVE ===== */

saveBtn?.addEventListener("click", function(){

    if(!validateOfflineForm()) return;

    alert("Offline application saved successfully.");
    window.location.href = "orgdashboard.html";
});

});

/* =========================================================
   RECORD PAYMENT PAGE LOGIC
   ========================================================= */

document.addEventListener("DOMContentLoaded", function(){

const getBtn = document.getElementById("getParticipantsBtn");
if(!getBtn) return;

const section = document.getElementById("participantSection");
const container = document.getElementById("participantContainer");
const searchInput = document.getElementById("participantSearch");

/* Dummy Data */
const participants = [
    {name:"Aarav Sharma"},
    {name:"Meera Patel"},
    {name:"Rohan Verma"},
    {name:"Kavya Iyer"},
    {name:"Siddharth Rao"},
    {name:"Ananya Deshmukh"},
    {name:"Vihaan Kapoor"},
    {name:"Ishita Singh"},
    {name:"Aditya Nair"},
    {name:"Sneha Kulkarni"}
];

getBtn.addEventListener("click", function(){

    const session = document.getElementById("paymentSession").value;
    const program = document.getElementById("paymentProgram").value;

    if(session==="" || program===""){
        alert("Select session and program");
        return;
    }

    section.style.display="block";
    renderParticipants(participants);
});

function renderParticipants(data){

    container.innerHTML="";

    data.forEach(p=>{
        const div = document.createElement("div");
        div.className="participant-tile";
        div.innerHTML=`
            <span>${p.name}</span>
            <button class="program-btn primary pay-btn">
                Pay
            </button>
        `;
        container.appendChild(div);
    });

    container.querySelectorAll(".pay-btn").forEach(btn=>{
        btn.addEventListener("click", function(){
            window.location.href="recordpaymentdetails.html";
        });
    });
}

/* Search */

searchInput.addEventListener("keyup", function(){
    const value = this.value.toLowerCase();
    const filtered = participants.filter(p =>
        p.name.toLowerCase().includes(value)
    );
    renderParticipants(filtered);
});

});


/* =========================================================
   RECORD PAYMENT DETAILS VALIDATION
   ========================================================= */

document.addEventListener("DOMContentLoaded", function(){

const saveBtn = document.getElementById("savePaymentBtn");
if(!saveBtn) return;

saveBtn.addEventListener("click", function(){

    clearErrors();
    let valid = true;

    function validate(id,errorId,msg){
        const field = document.getElementById(id);
        if(!field || field.value.trim()===""){
            field.classList.add("required-error");
            document.getElementById(errorId).innerText=msg;
            valid=false;
        }
    }

    function clearErrors(){
        document.querySelectorAll(".field-error-message")
            .forEach(e=>e.innerText="");
        document.querySelectorAll(".required-error")
            .forEach(e=>e.classList.remove("required-error"));
    }

    validate("paymentDate","paymentDateError","Select Payment Date");
    validate("paymentAmount","paymentAmountError","Enter Fee Amount");
    validate("paymentRemarks","paymentRemarksError","Enter Remarks");

    if(!valid) return;

    alert("Payment recorded successfully");
    window.location.href="recordpayment.html";
});

});

/* =========================================================
   BROADCAST MESSAGE LOGIC
   ========================================================= */

document.addEventListener("DOMContentLoaded", function(){

    const toggle = document.getElementById("broadcastActionsToggle");
    const menu = document.getElementById("broadcastActionsMenu");
    const container = document.getElementById("broadcastContainer");
    const searchInput = document.getElementById("broadcastSearch");

    /* ===== ACTION MENU ===== */

    if(toggle && menu){

        toggle.addEventListener("click", function(e){
            e.stopPropagation();
            menu.style.display =
                menu.style.display === "block" ? "none" : "block";
        });

        document.addEventListener("click", function(){
            menu.style.display = "none";
        });

        menu.querySelectorAll("div").forEach(item=>{
            item.addEventListener("click", function(){

                if(item.dataset.action === "new"){
                    window.location.href = "orgnewmessage.html";
                }

                if(item.dataset.action === "sort"){
                    const tiles = Array.from(container.children);
                    tiles.reverse();
                    container.innerHTML = "";
                    tiles.forEach(t=>container.appendChild(t));
                }

                menu.style.display = "none";
            });
        });
    }

    /* ===== SEARCH ===== */

    if(searchInput && container){

        searchInput.addEventListener("keyup", function(){

            const value = this.value.toLowerCase();

            container.querySelectorAll(".broadcast-tile")
            .forEach(tile=>{

                tile.style.display =
                    tile.innerText.toLowerCase().includes(value)
                    ? "block"
                    : "none";
            });
        });
    }

});

/* =========================================================
   ORG NEW MESSAGE PAGE LOGIC
   ========================================================= */

document.addEventListener("DOMContentLoaded", function(){

    const predefined = document.getElementById("predefinedMessage");
    const textarea = document.getElementById("messageContent");
    const counter = document.getElementById("messageCharCount");
    const sendBtn = document.getElementById("sendMessageBtn");

    if(!predefined) return;

    /* ===== PREDEFINED MESSAGE HANDLING ===== */

    const predefinedMessages = {
        reminder: "Reminder: Please complete your fee payment.",
        admission: "Admissions are now open. Apply today!"
    };

    predefined.addEventListener("change", function(){

        const value = this.value;

        if(value === "custom"){
            textarea.value = "";
            textarea.disabled = false;
        }
        else if(predefinedMessages[value]){
            textarea.value = predefinedMessages[value];
            textarea.disabled = true;
        }
        else{
            textarea.value = "";
            textarea.disabled = true;
        }

        counter.innerText = textarea.value.length + " / 165";
    });

    textarea.addEventListener("input", function(){
        counter.innerText = this.value.length + " / 165";
    });

    /* ===== SEND VALIDATION ===== */

    sendBtn?.addEventListener("click", function(){

        const type = document.getElementById("messageType").value;
        const session = document.getElementById("messageSession").value;
        const program = document.getElementById("messageProgram").value;
        const message = textarea.value.trim();

        let error = "";

        if(type === "") error = "Select Message Type";
        else if(session === "") error = "Select Session";
        else if(program === "") error = "Select Program";
        else if(message === "") error = "Message cannot be empty";

        if(error !== ""){
            alert(error);
            return;
        }

        alert("Message Broadcasted Successfully");
        window.location.href = "orgbroadcastmessages.html";
    });

});