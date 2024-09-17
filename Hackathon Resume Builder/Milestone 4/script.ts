// Function to handle the form submission
document.getElementById('resume-form')?.addEventListener('submit', (event) => {
  event.preventDefault(); // Prevent the default form submission

  const name = (document.getElementById('name') as HTMLInputElement).value;
  const fatherName = (document.getElementById('fatherName') as HTMLInputElement).value;
  const email = (document.getElementById('email') as HTMLInputElement).value;
  const contact = (document.getElementById('contact') as HTMLInputElement).value;
  const address = (document.getElementById('address') as HTMLInputElement).value;
  const school = (document.getElementById('school') as HTMLInputElement).value;
  const degree = (document.getElementById('degree') as HTMLInputElement).value;
  const islamicQualification = (document.getElementById('islamicQualification') as HTMLInputElement).value;
  const year = (document.getElementById('year') as HTMLInputElement).value;
  const skills = (document.getElementById('skills') as HTMLInputElement).value.split(',');
  const jobTitle = (document.getElementById('jobTitle') as HTMLInputElement).value;
  const company = (document.getElementById('company') as HTMLInputElement).value;
  const experience = (document.getElementById('experience') as HTMLInputElement).value;
  const profilePicInput = document.getElementById('profilePicInput') as HTMLInputElement;
  const profilePic = profilePicInput.files ? profilePicInput.files[0] : null;

  // Validate form inputs
  if (!name || !fatherName || !email || !contact || !address || !school || !degree || !islamicQualification || !year || !skills.length || !jobTitle || !company || !experience) {
    document.getElementById('error-message')!.textContent = 'Please fill in all fields.';
    return;
  }

  // Display the resume data
  (document.getElementById('resume-name') as HTMLHeadingElement).textContent = name;
  (document.getElementById('resume-fatherName') as HTMLSpanElement).textContent = fatherName;
  (document.getElementById('resume-email') as HTMLSpanElement).textContent = email;
  (document.getElementById('resume-contact') as HTMLSpanElement).textContent = contact;
  (document.getElementById('resume-address') as HTMLSpanElement).textContent = address;
  (document.getElementById('resume-school') as HTMLSpanElement).textContent = school;
  (document.getElementById('resume-degree') as HTMLSpanElement).textContent = degree;
  (document.getElementById('resume-islamicQualification') as HTMLSpanElement).textContent = islamicQualification;
  (document.getElementById('resume-year') as HTMLSpanElement).textContent = year;
  (document.getElementById('resume-jobTitle') as HTMLSpanElement).textContent = jobTitle;
  (document.getElementById('resume-company') as HTMLSpanElement).textContent = company;
  (document.getElementById('resume-experience') as HTMLSpanElement).textContent = experience;

  const skillsList = document.getElementById('resume-skills') as HTMLUListElement;
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
      const img = document.getElementById('resume-profile-pic') as HTMLImageElement;
      img.src = e.target?.result as string;
    };
    reader.readAsDataURL(profilePic);
  }

  // Show the generated resume
  document.getElementById('resume-output')!.style.display = 'block';

  // Hide the form after generating the resume
  document.getElementById('form-container')!.style.display = 'none';

  // Show the edit button
  document.getElementById('edit-button')!.style.display = 'inline-block';

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

// Add event listener for the edit button
document.getElementById('edit-button')?.addEventListener('click', () => {
  // Show the form and hide the resume output
  document.getElementById('form-container')!.style.display = 'block';
  document.getElementById('resume-output')!.style.display = 'none';

  // Enable form inputs for editing
  const inputs = document.querySelectorAll('#resume-form input');
  inputs.forEach(input => {
    input.removeAttribute('disabled');
  });

  // Clear the error message
  document.getElementById('error-message')!.textContent = '';
});
