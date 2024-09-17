// Declare html2pdf to avoid TypeScript errors
declare const html2pdf: any;

// Function to handle the download button click
document.getElementById('download-resume')?.addEventListener('click', () => {
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
document.getElementById('resume-form')?.addEventListener('submit', (event) => {
  event.preventDefault();

  // Collect form data
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
    alert('Please fill in all required fields.');
    return;
  }

  // Display resume data
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

  // Show the generated resume and the buttons
  document.getElementById('resume-output')!.style.display = 'block';
  document.getElementById('download-resume')!.style.display = 'inline-block';
  document.getElementById('edit-button')!.style.display = 'inline-block';
  document.getElementById('share-resume')!.style.display = 'inline-block';

  // Hide the form
  document.getElementById('form-container')!.style.display = 'none';

  disableForm();
  
  // Generate shareable link
  const baseURL = window.location.href.split('?')[0]; // Get current page URL without query parameters
  const shareableURL = `${baseURL}?username=${encodeURIComponent(name)}`;
  const shareableLink = document.getElementById('resume-url') as HTMLInputElement;
  shareableLink.value = shareableURL;
  
  // Show the shareable link section
  document.getElementById('shareableLinkSection')!.style.display = 'block';
});

// Disable the form inputs after resume generation
function disableForm() {
  const inputs = document.querySelectorAll('#resume-form input');
  inputs.forEach(input => input.setAttribute('disabled', 'true'));
}

// Add event listener for the edit button
document.getElementById('edit-button')?.addEventListener('click', () => {
  document.getElementById('form-container')!.style.display = 'block';
  document.getElementById('resume-output')!.style.display = 'none';
  const inputs = document.querySelectorAll('#resume-form input');
  inputs.forEach(input => input.removeAttribute('disabled'));
});

// Function to handle the share resume
function shareResume() {
  const resumeLink = (document.getElementById('resume-url') as HTMLInputElement).value; // Get shareable link
  navigator.clipboard.writeText(resumeLink).then(() => {
    alert('Resume link copied to clipboard!');
  }).catch((error) => {
    console.error('Error copying resume link:', error);
  });
}

// Event listener for the share resume button
document.getElementById('share-resume')?.addEventListener('click', shareResume);
