document.addEventListener('DOMContentLoaded', () => {
  // Show alert on all load buttons
  const loadButtons = document.querySelectorAll('.load-btn');
  loadButtons.forEach(button => {
    button.addEventListener('click', () => {
      alert("Admins are reviewing new rants, please wait.");
    });
  });

  // Optional: log form submission (not saving anymore)
  const form = document.getElementById('rantForm');
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('name').value;
    const date = document.getElementById('date').value;
    const rant = document.getElementById('rant').value;

    console.log("Name:", name);
    console.log("Date:", date);
    console.log("Rant:", rant);

    alert("✅ Your rant has been submitted and will be reviewed by the admin. Thank you!\n You're not alone; things will get better soon. Take a deep breath.");
    form.reset();
  });
});