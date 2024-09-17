"use strict";
var _a, _b, _c, _d;
// Function to handle the download button click
(_a = document.getElementById('download-resume')) === null || _a === void 0 ? void 0 : _a.addEventListener('click', () => {
    const resumeElement = document.getElementById('resume-output');
    if (resumeElement) {
        const opt = {
            margin: 0.5,
            filename: 'my_resume.pdf',
            image: { type: 'jpeg', quality: 2.0 },
            html2canvas: { scale: 2, useCORS: true },
            jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
        };
        html2pdf().from(resumeElement).set(opt).save();
    }
});
// Function to handle the form submission
(_b = document.getElementById('resume-form')) === null || _b === void 0 ? void 0 : _b.addEventListener('submit', (event) => {
    event.preventDefault();
    // Collect form data
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
        alert('Please fill in all required fields.');
        return;
    }
    // Display resume data
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
    // Show the generated resume and the buttons
    document.getElementById('resume-output').style.display = 'block';
    document.getElementById('download-resume').style.display = 'inline-block';
    document.getElementById('edit-button').style.display = 'inline-block';
    document.getElementById('share-resume').style.display = 'inline-block';
    // Hide the form
    document.getElementById('form-container').style.display = 'none';
    disableForm();
    // Generate shareable link
    const baseURL = window.location.href.split('?')[0]; // Get current page URL without query parameters
    const shareableURL = `${baseURL}?username=${encodeURIComponent(name)}`;
    const shareableLink = document.getElementById('resume-url');
    shareableLink.value = shareableURL;
    // Show the shareable link section
    document.getElementById('shareableLinkSection').style.display = 'block';
});
// Disable the form inputs after resume generation
function disableForm() {
    const inputs = document.querySelectorAll('#resume-form input');
    inputs.forEach(input => input.setAttribute('disabled', 'true'));
}
// Add event listener for the edit button
(_c = document.getElementById('edit-button')) === null || _c === void 0 ? void 0 : _c.addEventListener('click', () => {
    document.getElementById('form-container').style.display = 'block';
    document.getElementById('resume-output').style.display = 'none';
    const inputs = document.querySelectorAll('#resume-form input');
    inputs.forEach(input => input.removeAttribute('disabled'));
});
// Function to handle the share resume
function shareResume() {
    const resumeLink = document.getElementById('resume-url').value; // Get shareable link
    navigator.clipboard.writeText(resumeLink).then(() => {
        alert('Resume link copied to clipboard!');
    }).catch((error) => {
        console.error('Error copying resume link:', error);
    });
}
// Event listener for the share resume button
(_d = document.getElementById('share-resume')) === null || _d === void 0 ? void 0 : _d.addEventListener('click', shareResume);
