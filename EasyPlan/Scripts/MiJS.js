$(document).ready(function () {
    $("li.nav-item").click(function (e) {
        e.preventDefault();
        $(".nav-item").removeClass("active");
        $(this).addClass("active");
    });
});

//Login

$(function () {
    var textfield = $("input[name=user]");
    $('button[type="submit"]').click(function (e) {
        e.preventDefault();
        //little validation just to check username
        if (textfield.val() != "") {
            //$("body").scrollTo("#output");
            $("#output").addClass("alert alert-success animated fadeInUp").html("Welcome back " + "<span style='text-transform:uppercase'>" + textfield.val() + "</span>");
            $("#output").removeClass(' alert-danger');
            $("input").css({
                "height": "0",
                "padding": "0",
                "margin": "0",
                "opacity": "0"
            });
            //change button text 
            $('button[type="submit"]').html("continue")
                .removeClass("btn-info")
                .addClass("btn-default").click(function () {
                    $("input").css({
                        "height": "auto",
                        "padding": "10px",
                        "opacity": "1"
                    }).val("");
                });

            //show avatar
            $(".avatar").css({
                "background-image": "url('http://api.randomuser.me/0.3.2/portraits/women/35.jpg')"
            });
        } else {
            //remove success mesage replaced with error message
            $("#output").removeClass(' alert alert-success');
            $("#output").addClass("alert alert-danger animated fadeInUp").html("sorry enter a username ");
        }
        //console.log(textfield.val());

    });
});


//tabla
$(document).ready(function () {
    $('#example').DataTable();
});


//Layout2

document.addEventListener("DOMContentLoaded", function (event) {

    const showNavbar = (toggleId, navId, bodyId, headerId) => {
        const toggle = document.getElementById(toggleId),
            nav = document.getElementById(navId),
            bodypd = document.getElementById(bodyId),
            headerpd = document.getElementById(headerId)

        // Validate that all variables exist
        if (toggle && nav && bodypd && headerpd) {
            toggle.addEventListener('click', () => {
                // show navbar
                nav.classList.toggle('show')
                // change icon
                toggle.classList.toggle('bx-x')
                // add padding to body
                bodypd.classList.toggle('body-pd')
                // add padding to header
                headerpd.classList.toggle('body-pd')
            })
        }
    }

    showNavbar('header-toggle', 'nav-bar', 'body-pd', 'header')

    /*===== LINK ACTIVE =====*/
    const linkColor = document.querySelectorAll('.nav_link')

    function colorLink() {
        if (linkColor) {
            linkColor.forEach(l => l.classList.remove('active'))
            this.classList.add('active')
        }
    }
    linkColor.forEach(l => l.addEventListener('click', colorLink))

    // Your code to run since DOM is loaded and ready
});