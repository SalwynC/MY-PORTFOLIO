$(document).ready(function() {
    // Initialize AOS (Animate On Scroll)
    AOS.init({
        duration: 1000, // Animation duration
        once: true // Whether animation should happen only once
    });

    // Smooth scrolling for internal links
    $('a.nav-link, .btn').on('click', function(event) {
        event.preventDefault();
        var target = $(this).attr('href');
        var targetElement = $(target); // Get the target element
        
        if (targetElement.length) { // Check if the element exists
            $('html, body').animate({
                scrollTop: targetElement.offset().top - 70 // Adjust for navbar height
            }, 800);
        }
    });

    // Dark/Light Mode Toggle
    $('#theme-toggle').on('click', function() {
        $('body').toggleClass('dark-mode'); // Toggle dark mode class
        // Change button text based on current mode
        if ($('body').hasClass('dark-mode')) {
            $(this).text('☀️'); // Change to sun emoji for light mode
        } else {
            $(this).text('🌙'); // Change to moon emoji for dark mode
        }
    });

    // Highlight active section in navbar
    $(window).on('scroll', function() {
        var scrollPos = $(document).scrollTop();
        $('.nav-link').each(function() {
            var currLink = $(this);
            var refElement = $(currLink.attr("href"));
            if (refElement.length && refElement.position().top <= scrollPos && refElement.position().top + refElement.height() > scrollPos) {
                $('.navbar-nav .nav-link').removeClass("active");
                currLink.addClass("active");
            } else {
                currLink.removeClass("active");
            }
        });
    });

    // Contact Form Submission
    var form = document.getElementById("my-form");
    
    async function handleSubmit(event) {
        event.preventDefault(); // Prevent the default form submission
        var status = document.getElementById("my-form-status");
        var data = new FormData(event.target);
        
        try {
            const response = await fetch(event.target.action, {
                method: form.method,
                body: data,
                headers: {
                    'Accept': 'application/json'
                }
            });
            if (response.ok) {
                status.innerHTML = "Thanks for your submission!";
                form.reset();
            } else {
                const data = await response.json();
                if (data.errors) {
                    status.innerHTML = data.errors.map(error => error.message).join(", ");
                } else {
                    status.innerHTML = "Oops! There was a problem submitting your form.";
                }
            }
        } catch (error) {
            status.innerHTML = "Oops! There was a problem submitting your form.";
        }
    }
    
    form.addEventListener("submit", handleSubmit);
});
