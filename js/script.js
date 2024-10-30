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
        $('body').toggleClass('dark-mode');
        // Change button text based on current mode
        $(this).text($(this).text() === '🌙' ? '☀️' : '🌙'); 
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
    $('#contact-form').on('submit', function(event) {
        event.preventDefault(); // Prevent default form submission

        // Get form values
        var name = $('#name').val();
        var email = $('#email').val();
        var message = $('#message').val();

        // Send email using EmailJS
        emailjs.send("YOUR_SERVICE_ID", "YOUR_TEMPLATE_ID", {
            name: name,
            email: email,
            message: message
        })
        .then(function(response) {
            console.log('SUCCESS!', response.status, response.text);
            alert('Your message has been sent successfully!');
            $('#contact-form').trigger('reset'); // Reset the form
        }, function(error) {
            console.log('FAILED...', error);
            alert('There was an error sending your message. Please try again later.');
        });
    });

    // Show the contact modal when the button is clicked
    $('#contactButton').on('click', function() {
        $('#contactModal').modal('show');
    });

    // Handle sending the message
    $('#sendMessage').on('click', function() {
        alert('Your message has been sent!');
        $('#contactModal').modal('hide');
        $('#contact-form')[0].reset(); // Reset the form
    });

    // Optional: Handle click event for the contact button
    $('#contactButton').on('click', function() {
        alert('Please fill in your details, and I will get back to you shortly!'); 
    });
});
