let allColleges = [];
let filteredColleges = [];
let displayedCount = 0;
const increment = 10;
const collegeListContainer = document.querySelector('.college-cards-container');
const loadMoreButton = document.getElementById('loadMoreButton');
const loadingSpinner = document.getElementById('loadingSpinner');
const collegeCountSpan = document.getElementById('collegeCount');

document.addEventListener('DOMContentLoaded', () => {
    // This check ensures this code only runs on the filter page
    if (window.location.pathname.includes('filter.html')) {
        // Redirect to signin if not logged in
        if (localStorage.getItem('isLoggedIn') !== 'true') {
            alert('You must be logged in to view this page.');
            window.location.href = 'signin.html';
            return;
        }

        fetchColleges();

        // Add event listeners for filters
        document.getElementById('searchInput').addEventListener('input', filterColleges);
        document.getElementById('stateFilter').addEventListener('change', filterColleges);
        document.getElementById('typeFilter').addEventListener('change', filterColleges);
        document.getElementById('ratingFilter').addEventListener('change', filterColleges);
        document.getElementById('feeRange').addEventListener('input', updateFeeValue);
        document.getElementById('feeRange').addEventListener('change', filterColleges);
        loadMoreButton.addEventListener('click', displayColleges);
    }
});

function fetchColleges() {
    loadingSpinner.style.display = 'block';
    fetch('http://localhost:3800/colleges')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            loadingSpinner.style.display = 'none';
            allColleges = data;
            filteredColleges = [...allColleges];
            updateCollegeCount();
            displayColleges(true);
        })
        .catch(error => {
            loadingSpinner.style.display = 'none';
            console.error('Error fetching colleges:', error);
            collegeListContainer.innerHTML = '<p class="error-message">Failed to load colleges. Please try again later.</p>';
        });
}

function updateCollegeCount() {
    collegeCountSpan.textContent = `${filteredColleges.length} results`;
}

function displayColleges(reset = false) {
    if (reset) {
        collegeListContainer.innerHTML = '';
        displayedCount = 0;
    }

    const collegesToDisplay = filteredColleges.slice(displayedCount, displayedCount + increment);
    if (collegesToDisplay.length === 0) {
        if (displayedCount === 0) {
             collegeListContainer.innerHTML = '<p class="no-results-message">No colleges found matching your criteria.</p>';
        }
        loadMoreButton.style.display = 'none';
        return;
    }

    collegesToDisplay.forEach(college => {
        const collegeCard = document.createElement('div');
        collegeCard.classList.add('college-card');
        collegeCard.innerHTML = `
            <h3>${college['College Name']}</h3>
            <p><strong>Location:</strong> ${college['City']}, ${college['State']}</p>
            <p><strong>Rating:</strong> ${college['Rating'] ? '⭐'.repeat(Math.round(parseFloat(college['Rating']))) : 'N/A'}</p>
            <p><strong>Fees:</strong> ${college['Average Fees'] || 'N/A'}</p>
            <button class="details-btn">View Details</button>
            <div class="details" style="display: none;">
                <p><strong>Campus Size:</strong> ${college['Campus Size'] || 'N/A'}</p>
                <p><strong>Established:</strong> ${college['Established Year'] || 'N/A'}</p>
                <p><strong>College Type:</strong> ${college['College Type'] || 'N/A'}</p>
            </div>
        `;
        collegeListContainer.appendChild(collegeCard);

        const detailsButton = collegeCard.querySelector('.details-btn');
        const detailsDiv = collegeCard.querySelector('.details');
        detailsButton.addEventListener('click', () => {
            const isVisible = detailsDiv.style.display === 'block';
            detailsDiv.style.display = isVisible ? 'none' : 'block';
            detailsButton.textContent = isVisible ? 'View Details' : 'Hide Details';
        });
    });

    displayedCount += increment;

    if (displayedCount >= filteredColleges.length) {
        loadMoreButton.style.display = 'none';
    } else {
        loadMoreButton.style.display = 'block';
    }
}

function filterColleges() {
    const searchInput = document.getElementById('searchInput').value.toLowerCase();
    const stateFilter = document.getElementById('stateFilter').value.toLowerCase();
    const typeFilter = document.getElementById('typeFilter').value.toLowerCase();
    const feeRange = parseInt(document.getElementById('feeRange').value, 10);
    const ratingFilter = parseFloat(document.getElementById('ratingFilter').value);

    filteredColleges = allColleges.filter(college => {
        const collegeName = (college['College Name'] || '').toLowerCase();
        const collegeState = (college['State'] || '').toLowerCase();
        const collegeType = (college['College Type'] || '').toLowerCase();
        const collegeFee = parseInt(college['Average Fees'] || '0', 10);
        const collegeRating = parseFloat(college['Rating'] || '0');

        const matchesSearch = collegeName.includes(searchInput);
        const matchesState = !stateFilter || collegeState.includes(stateFilter);
        const matchesType = !typeFilter || collegeType.includes(typeFilter);
        const matchesFee = collegeFee <= feeRange;
        const matchesRating = !ratingFilter || (collegeRating >= ratingFilter && collegeRating < (ratingFilter + 1));

        return matchesSearch && matchesState && matchesType && matchesFee && matchesRating;
    });

    updateCollegeCount();
    displayColleges(true);
}

function updateFeeValue() {
    const feeValue = document.getElementById('feeValue');
    const feeRange = document.getElementById('feeRange').value;
    feeValue.textContent = `₹0 - ₹${new Intl.NumberFormat('en-IN').format(feeRange)}`;
}