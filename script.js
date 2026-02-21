const jobsContainer = document.getElementById("jobsContainer");

async function searchJobs() {
  const keyword = document.getElementById("searchInput").value.trim();

  if (!keyword) {
    jobsContainer.innerHTML = "Please enter a search term.";
    return;
  }

  jobsContainer.innerHTML = "Loading...";

  try {
    const response = await fetch(
      `https://remotive.com/api/remote-jobs?search=${encodeURIComponent(keyword)}`
    );

    const data = await response.json();
    displayJobs(data.jobs);
  } catch (error) {
    console.error("Error fetching jobs:", error);
    jobsContainer.innerHTML = "An error occurred while fetching jobs.";
  }
}

function displayJobs(jobs) {
  jobsContainer.innerHTML = "";

  if (!jobs || jobs.length === 0) {
    jobsContainer.innerHTML = "No Jobs Found.";
    return;
  }

  jobs.forEach(job => {
    const div = document.createElement("div");
    div.classList.add("job-card");

    div.innerHTML = `
    <h3>${job.title}</h3>
    <p><strong>Company:</strong> ${job.company_name}</p>
    <p><strong>Location:</strong> ${job.candidate_required_location}</p>
    <a href="${job.url}" target="_blank">View Job</a>
    `;

    jobsContainer.appendChild(div);
});
}
