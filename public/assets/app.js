// var questions = ["Star Wars is Awesome", "Peace by totalitarianism is the only way to secure peace", "add quest", "add quest", "Return of the Jedi is better than Empire", "All the problems with the Jedi was Yodas fault", "Jar Jar Binks was a sith lord", "The death star was awesome we need a new Death Star", "I'm looking forward to Star Wars Episode 8", "A wookie is a weird bear thing", "I grew up and with the ewoks and loved them", "Star Wars is much better than Star Trek"];
var questions = ["Peace is a lie, there is only Passion", "Through Passion I gain Strength", "Through Strength I gain Power", "Through power I gain Vicory", "Through Victory, my chains are broken, THE FORCE shall set me free", "There is no Emotion there is Peace", " There is no ignorance there is only Knowledge", "There is no Passion there is Serenity", "There is no Chaos there is Harmony", "There is no Death there is THE FORCE", "There is no dark side, nor a light side there is only THE FORCE", "There is no good without evil but evil must not be allowed to flourish"];

console.log(questions);
var name;



function putQuestions() {
    $("#questionsDiv").empty();
    var count = 1;
    for (var i = 0; i < questions.length; i++) {
        var newDiv = $("<div>");
        newDiv.attr("data-value", "id" + count);

        var newh4 = $("<h4>");
        var newSelect = $("<select>");
        newSelect.attr("value", count);
        newSelect.attr("id", "drop" + count);
        var ans0 = $("<option>");


        var ans1 = $("<option>");

        ans1.attr("value", 1);

        ans1.html("<strong>" + "strongly agree" + "</strong>");

        var ans2 = $("<option>");
        // ans2.attr("value", ("question" + count + "ans2"));
        ans2.attr("value", 2);
        ans2.html("2");

        var ans3 = $("<option>");
        ans3.attr("value", 3);
        ans3.html("3");

        var ans4 = $("<option>");
        ans4.attr("value", 4);
        ans4.html("4");

        var ans5 = $("<option>");
        ans5.attr("value", 5);
        ans5.html("<strong>" + "strongly disagree" + "</strong>");

        newh4.html(questions[i]);
        newDiv.prepend(newh4);
        newSelect.append(ans0, ans1, ans2, ans3, ans4, ans5);
        // newbutton.append(newUl);
        newDiv.append(newSelect);
        $("#questionsDiv").append(newDiv);
        count++;
        console.log(ans1[0].value);

    }
}
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


function runQuery() {
    var currentURL = window.location.origin;

    var totalsArray = [];

    $.ajax({
            url: currentURL + "/api/friends",
            method: "GET"
        })
        .done(function(data) {
            console.log(data.length + "length of data from ajax call");
            var end = data.length - 1;

            // console.log(newestData[2].scores + 'newdata');
            // console.log(end + "this is the end");
            // console.log(data[1].scores[1]);

            // console.log(parseInt(data[3].scores));
            // console.log(data[0].photo)
            var myNumber = data[end].scores;

            var total = 0;
            var myCount = 0;
            var difference = 0;

            // n < data.length for comparing added friends but just 10 for inital star wars charachters
            for (var n = 0; n < 11; n++) {



                for (var i = 0; i < questions.length; i++) {
                    difference = Math.abs(parseInt(data[end].scores[i]) - parseInt(data[myCount].scores[i]));


                    total = total + difference;


                } //ends i for loop
                console.log(total);




                totalsArray.push(total);


                total = 0;
                difference = 0;
                myCount++;



            } // ends n for loop
            var compareArray = totalsArray.pop();
            console.log(totalsArray);


            // function getMaxOfArray(numArray) {
            //   return Math.max.apply(null, numArray);
            //  console.log(parseInt(bestMatch) + " this is my best match");
            // }
            // getMaxOfArray(totalsArray);

            var min = totalsArray.reduce(function(a, b) {
                return Math.min(a, b);
            });
            console.log(min);

            for (var a = 0; a < totalsArray.length; a++) {
                if (totalsArray[a] === min) {
                    console.log(a);
                    var mypic = a;
                    $("#modalHead").html(name);
                    $("#myfriendspic").attr("src", data[mypic].photo);
                    $("#mypmodal").html("You're best friend is now " + data[mypic].name);
                    $("#sound").attr("src", data[mypic].sound);
                }

            }



        }) //ends done function

} // ends run query


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

putQuestions();
var answers = [];

$("#submit").on("click", function() {



    var formFilled = true;
    // console.log(formFilled);
    event.preventDefault();



    var choice1 = $('#drop1 option:selected').val()
    answers.push(parseInt(choice1));

    var choice2 = $('#drop2 option:selected').val()
    answers.push(parseInt(choice2));

    var choice3 = $('#drop3 option:selected').val()
    answers.push(parseInt(choice3));

    var choice4 = $('#drop4 option:selected').val()
    answers.push(parseInt(choice4));

    var choice5 = $('#drop5 option:selected').val()
    answers.push(parseInt(choice5));

    var choice6 = $('#drop6 option:selected').val()
    answers.push(parseInt(choice6));

    var choice7 = $('#drop7 option:selected').val()
    answers.push(parseInt(choice7));

    var choice8 = $('#drop8 option:selected').val()
    answers.push(parseInt(choice8));

    var choice9 = $('#drop9 option:selected').val()
    answers.push(parseInt(choice9));

    var choice10 = $('#drop10 option:selected').val()
    answers.push(parseInt(choice10));

    var choice11 = $('#drop11 option:selected').val()
    answers.push(parseInt(choice11));

    var choice12 = $('#drop12 option:selected').val()
    answers.push(parseInt(choice12));


    if ($("#name").val().trim() === '') {
        formFilled = false;
        $("#mypmodal2").html("Please fill in your name");
        console.log(formFilled);
        $("#myModal2").modal();

    } else {

        if ($("#pic").val().trim() === '') {
            formFilled = false;
            $("#mypmodal2").html("Please add a link to a picture");
            $("#myModal2").modal();
        } else {

            var missedArray = [];
            for (var i = 0; i < questions.length; i++) {
                if (isNaN(answers[i])) {
                    var number = i + 1;
                    missedArray.push(number);

                    $("#myModal2").modal();

                    formFilled = false;
                    console.log(formFilled);
                }
            }
            $("#mypmodal2").html("Please fill out question# " + " " + missedArray);

            // console.log(answers);
            ////////////////////////////////////////////////////////////////////////////////////////////////////    
            if (formFilled === true) {
                var newFriend = {

                    name: $("#name").val().trim(),
                    photo: $("#pic").val().trim(),
                    scores: [choice1, choice2, choice3, choice4, choice5, choice6, choice7, choice8, choice9, choice10, choice11, choice12 ]

                }

                // $("#myfriendspic").attr("src", " ")



                name = $("#name").val().trim();

                $('select').val("");
                $('input').val("");

                var currentUrl = window.location.origin;

                $.post(currentUrl + "/api/friends", newFriend, function(data) {
                    console.log(data);
                }); // ends post

                count = 1;



                runQuery();
                $("#myModal").modal();



            } //form filled true
        }
    }
    answers = [];





});

// $("#modalButton").on('click', function(){

//     var newA = $("<a>");
//     newA.attr("href", "/home")
//     $("#modalButton").append(newA);


// })
