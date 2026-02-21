
document.querySelectorAll('.view-btn').forEach(btn => {
  btn.addEventListener('click', e => {
    e.preventDefault();
    const modalId = btn.getAttribute('href').replace('#', '');
    const modal = document.getElementById(modalId);
    modal.style.display = 'flex'; 
  });
});

//For Sub Dropdown Menu
document.querySelectorAll('.submenu-toggle').forEach(item => {
  item.addEventListener('click', function (e) {
    e.preventDefault();
    e.stopPropagation();
    this.parentElement.classList.toggle('show');
  });
});
const openSearch = document.getElementById("openSearch");
const searchForm = document.getElementById("searchForm");
const searchInput = document.getElementById("searchInput");




// ============contact-popup-start==============//

function showPopup() {
  document.getElementById("popup").style.display = "flex";
}
function closePopup() {
  document.getElementById("popup").style.display = "none";
}
// ============contact-popup-end==============//

// ============form stars============
const stars = document.querySelectorAll('#starRating i');
const ratingInput = document.getElementById('ratingValue');

stars.forEach((star, index) => {
  star.addEventListener('click', () => {
    let rating = index + 1;
    ratingInput.value = rating;

    stars.forEach((s, i) => {
      if (i < rating) {
        s.classList.remove('fa-star-o');
        s.classList.add('fa-star');
      } else {
        s.classList.remove('fa-star');
        s.classList.add('fa-star-o');
      }
    });
  });
});


// for down cat recp alert
function showAlert() {
  const visibleModal = document.querySelector('.modal.show');
  const alert = visibleModal.querySelector('.alert');
  if (alert) {
    alert.classList.remove("d-none");
  }
}
const allModals = document.querySelectorAll('.modal');

allModals.forEach(modal => {
  modal.addEventListener('hidden.bs.modal', function () {
    const alert = modal.querySelector('.alert');
    if (alert) {
      alert.classList.add("d-none");
    }
  });
});


// Like button
document.querySelectorAll('.like-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const icon = btn.querySelector('i');
    const counter = btn.querySelector('small');
    const parent = btn.closest('.modal-actions');
    const unlikeBtn = parent.querySelector('.unlike-btn');

    if (btn.dataset.liked === "false") {
      icon.classList.replace('fa-regular', 'fa-solid');
      counter.textContent = parseInt(counter.textContent) + 1;
      btn.dataset.liked = "true";

      // Reset unlike
      if (unlikeBtn.dataset.unliked === "true") {
        unlikeBtn.dataset.unliked = "false";
        unlikeBtn.querySelector('i').classList.replace('fa-solid', 'fa-regular');
        unlikeBtn.querySelector('small').textContent =
          parseInt(unlikeBtn.querySelector('small').textContent) - 1;
      }

    } else {
      icon.classList.replace('fa-solid', 'fa-regular');
      counter.textContent = parseInt(counter.textContent) - 1;
      btn.dataset.liked = "false";
    }
  });
});

// Unlike button
document.querySelectorAll('.unlike-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const icon = btn.querySelector('i');
    const counter = btn.querySelector('small');
    const parent = btn.closest('.modal-actions');
    const likeBtn = parent.querySelector('.like-btn');

    if (btn.dataset.unliked === "false") {
      icon.classList.replace('fa-regular', 'fa-solid');
      counter.textContent = parseInt(counter.textContent) + 1;
      btn.dataset.unliked = "true";

      // Reset like
      if (likeBtn.dataset.liked === "true") {
        likeBtn.dataset.liked = "false";
        likeBtn.querySelector('i').classList.replace('fa-solid', 'fa-regular');
        likeBtn.querySelector('small').textContent =
          parseInt(likeBtn.querySelector('small').textContent) - 1;
      }

    } else {
      icon.classList.replace('fa-solid', 'fa-regular');
      counter.textContent = parseInt(counter.textContent) - 1;
      btn.dataset.unliked = "false";
    }
  });
});
// ========sharebtn=======//
document.querySelectorAll('.share-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    if (navigator.share) {
      navigator.share({
        title: 'Recipe',
        text: 'Check out this recipe!',
        url: window.location.href
      });
    } else {
      alert('Sharing not supported on this browser');
    }
  });
});

// =========CONTACT FORM================
function handleFormSubmit(event) {
    event.preventDefault(); 
    console.log("Form submission started...");

    try {
        // IDs se data lena
        const name = document.getElementById('userName').value;
        const email = document.getElementById('userEmail').value;
        const message = document.getElementById('userMessage').value;

        // Data Object
        const formData = {
            name: name,
            email: email,
            message: message,
            time: new Date().toLocaleString()
        };

        //  Save Local Storage
        let messages = JSON.parse(localStorage.getItem('myMessages')) || [];
        messages.push(formData);
        localStorage.setItem('myMessages', JSON.stringify(messages));
        console.log("Data saved to Local Storage:", formData);

        // Form Clear 
        document.getElementById('contactForm').reset();

        // show Popup 
        const popup = document.getElementById('popup');
        if (popup) {
            popup.style.display = 'flex'; // CSS override
            console.log("Popup should be visible now.");
            
           
        } else {
            console.error("Popup element not found!");
        }

    } catch (error) {
        console.error("Something went wrong:", error);
    }

    return false;
}

function closePopup() {
    document.getElementById('popup').style.display = 'none';

   
}

    //  ==========reviw-graph==========//

document.addEventListener("DOMContentLoaded", function () {
  const ctx = document.getElementById('reviewsChart');

  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ['1 Star', '2 Star', '3 Star', '4 Star', '5 Star'],
      datasets: [{
        label: 'User Reviews',
        data: [5, 8, 15, 30, 42],
        backgroundColor: [
          '#ff4d4d',
          '#ff944d',
          '#ffd11a',
          '#9acd32',
          '#2ecc71'
        ],
        borderRadius: 8,
        barPercentage: 0.6,
        categoryPercentage: 0.8
      }]
    },
    options: {
      indexAxis: 'x',
      responsive: true,
      plugins: {
        legend: { display: false },
        tooltip: { enabled: true }
      },
      scales: {
        y: {
          beginAtZero: true,
          ticks: { stepSize: 5 }
        },
        x: {
          grid: { display: false }
        }
      }
    }
  });
});
  


// ==========form feedback============//
document.getElementById("submitReview").addEventListener("click", function () {

  let name = document.getElementById("userName").value;
  let feedback = document.getElementById("userFeedback").value;
  let rating = document.getElementById("ratingValue").value || 5;

  if (name === "" || feedback === "") {
    alert("Please fill all fields");
    return;
  }

  let starsHTML = "";
  for (let i = 1; i <= 5; i++) {
    starsHTML += i <= rating
      ? '<i class="fa fa-star"></i>'
      : '<i class="fa fa-star-o"></i>';
  }

  let newFeedback = `
        <div class="feedback-card">
            <img class="feeds-image" src="../website/assets/js/no dp.jpg">
            <div class="feedback-text">
                <div class="feedback-stars">
                    ${starsHTML}
                </div>
                <h6>${name}</h6>
                <p>${feedback}</p>
            </div>
        </div>
    `;

  document.querySelector(".feedback-container").insertAdjacentHTML("afterbegin", newFeedback);

  // Clear form
  document.getElementById("reviewForm").reset();
  document.getElementById("ratingValue").value = "";
});




