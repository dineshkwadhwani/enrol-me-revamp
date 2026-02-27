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