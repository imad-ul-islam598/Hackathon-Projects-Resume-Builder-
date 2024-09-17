"use strict";
var _a;
// Function to handle the form submission
(_a = document.getElementById('resume-form')) === null || _a === void 0 ? void 0 : _a.addEventListener('submit', (event) => {
    event.preventDefault(); // Prevent the default form submission
    const name = document.getElementById('name').value;
    const fatherName = document.getElementById('fatherName').value;
    const email = document.getElementById('email').value;
    const contact = document.getElementById('contact').value;
    const address = document.getElementById('address').value;
    const school = document.getElementById('school').value;
    const degree = document.getElementById('degree').value;
    const islamicQualification = document.getElementById('islamicQualification').value;
    const year = document.getElementById('year').value;
    const skills = document.getElementById('skills').value.split(',');
    const jobTitle = document.getElementById('jobTitle').value;
    const company = document.getElementById('company').value;
    const experience = document.getElementById('experience').value;
    const profilePicInput = document.getElementById('profilePicInput');
    const profilePic = profilePicInput.files ? profilePicInput.files[0] : null;
    // Validate form inputs
    if (!name || !fatherName || !email || !contact || !address || !school || !degree || !islamicQualification || !year || !skills.length || !jobTitle || !company || !experience) {
        document.getElementById('error-message').textContent = 'Please fill in all fields.';
        return;
    }
    // Display the resume data
    document.getElementById('resume-name').textContent = name;
    document.getElementById('resume-fatherName').textContent = fatherName;
    document.getElementById('resume-email').textContent = email;
    document.getElementById('resume-contact').textContent = contact;
    document.getElementById('resume-address').textContent = address;
    document.getElementById('resume-school').textContent = school;
    document.getElementById('resume-degree').textContent = degree;
    document.getElementById('resume-islamicQualification').textContent = islamicQualification;
    document.getElementById('resume-year').textContent = year;
    document.getElementById('resume-jobTitle').textContent = jobTitle;
    document.getElementById('resume-company').textContent = company;
    document.getElementById('resume-experience').textContent = experience;
    const skillsList = document.getElementById('resume-skills');
    skillsList.innerHTML = '';
    skills.forEach(skill => {
        const li = document.createElement('li');
        li.textContent = skill.trim();
        skillsList.appendChild(li);
    });
    // Show profile picture if uploaded
    if (profilePic) {
        const reader = new FileReader();
        reader.onload = (e) => {
            var _a;
            const img = document.getElementById('resume-profile-pic');
            img.src = (_a = e.target) === null || _a === void 0 ? void 0 : _a.result;
        };
        reader.readAsDataURL(profilePic);
    }
    // Show the generated resume
    document.getElementById('resume-output').style.display = 'block';
    // Hide the form after generating the resume
    document.getElementById('form-container').style.display = 'none';
    // Disable further edits by disabling form inputs
    disableForm();
});
// Function to disable form inputs after the resume is generated
function disableForm() {
    const inputs = document.querySelectorAll('#resume-form input');
    inputs.forEach(input => {
        input.setAttribute('disabled', 'true');
    });
}
