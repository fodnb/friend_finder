// var questions = ["Star Wars is Awesome", "Peace by totalitarianism is the only way to secure peace", "add quest", "add quest", "Return of the Jedi is better than Empire", "All the problems with the Jedi was Yodas fault", "Jar Jar Binks was a sith lord", "The death star was awesome we need a new Death Star", "I'm looking forward to Star Wars Episode 8", "A wookie is a weird bear thing", "I grew up and with the ewoks and loved them", "Star Wars is much better than Star Trek"];

//Statements from a star wars force site showing the difference between the light/dark and middle grounds.  
var questions = ["Peace is a lie, there is only Passion", "Through Passion I gain Strength", "Through Strength I gain Power", "Through power I gain Vicory", "Through Victory, my chains are broken, THE FORCE shall set me free", "There is no Emotion there is Peace", " There is no ignorance there is only Knowledge", "There is no Passion there is Serenity", "There is no Chaos there is Harmony", "There is no Death there is THE FORCE", "There is no dark side, nor a light side there is only THE FORCE", "There is no good without evil but evil must not be allowed to flourish"];
var name; // this will hold the value of the name a client enters

// function that takes the questions out of the array and populates the page with the questions and select/options
// and gives them values to calculate the score
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

// This is where I'm running my ajax call against my api from the friends.js file
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

            var myNumber = data[end].scores;

            var total = 0;
            var myCount = 0;
            var difference = 0;

            // n < data.length for comparing added friends but just 10 for inital star wars charachters 
            // in the walkthrough on the site it was a one and done fill out and get a match
            // so I took that and since I'm making this friend finder app a star wars match maker I'm only allowing 
            // the app to determine your match from the initial stored results.  I could take out the limit of 11 
            // to give the client any match in the api but I don't feel that suits my purpose
            for (var n = 0; n < 11; n++) {

                // I'm using this for loop to calculate the clients differences from each of the api/comparisons allowed
                // We're calculating the difference from question to question not total points vs total points
                for (var i = 0; i < questions.length; i++) {
                    difference = Math.abs(parseInt(data[end].scores[i]) - parseInt(data[myCount].scores[i]));
                    total = total + difference;
                } //ends i for loop
                totalsArray.push(total); // this is where the totals are stored to compatre

                // this is resoring these values back to 0 before going back into the n for loop
                total = 0;
                difference = 0;
                myCount++;



            } // ends n for loop
            var compareArray = totalsArray.pop();



            // this function will give the min value in the function so I can compare

            var min = totalsArray.reduce(function(a, b) {
                return Math.min(a, b);
            });
            console.log(min);


            //comparing the min value against the values in the array and gives you your match that had
            // the minimum value so the === is comparing against the min difference found above
            for (var a = 0; a < totalsArray.length; a++) {
                if (totalsArray[a] === min) {
                    console.log(a);
                    var mypic = a;
                    $("#modalHead").html(name);
                    $("#myfriendspic").attr("src", data[mypic].photo);
                    $("#mypmodal").html("Seek out " + data[mypic].name + " to start building your Alliance");
                    $("#sound").attr("src", data[mypic].sound);

                }

            }



        }) //ends done function

} // ends run query


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// running our function and adding questions to the page
putQuestions();

// initializing our click callback event to grab our answers from the form
// we validate that all areas have been filled out

$("#submit").on("click", function() {

    //lowers the main volume when button is clicked so you can hear more clearly the secondary audio
    $("#myaudiosurvey").prop("volume", .2);


    // if form filled === true at the end we calculate the totals otherwise we have a modal appear
    //saying to fix the form entries
    // if form is filled correctly it calulates the totals and matches you with your new BFF
    var formFilled = true;
    var answers = []; // clearing answers each time your hit click
    var missedArray = []; // clearing missed array each time you hit click
    event.preventDefault();
    // grabbing the values from the questions 
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

    // the following 2 if statements and the for loop are checking if everything is filled out and returning false
    // if something is empty    
    if ($("#name").val().trim() === '') {
        formFilled = false;
        console.log(formFilled);
        missedArray.push("name");
    }

    if ($("#pic").val().trim() === '') {
        formFilled = false;
        missedArray.push("picture link");
    }


    for (var i = 0; i < questions.length; i++) {
        if (isNaN(answers[i])) {
            var number = i + 1;
            missedArray.push(number);
            formFilled = false;
            console.log(formFilled);
        }
    }

    if (formFilled === false) {
        $("#mypmodal2").html("Please fill out the following: " + " " + missedArray);
        $("#myModal2").modal({ backdrop: false });

    }

    ////////////////////////////////////////////////////////////////////////////////////////////////////    

    // if form is filled out correctly then we get a new friend and post the results to our api

    if (formFilled === true) {
        var newFriend = {

            name: $("#name").val().trim(),
            photo: $("#pic").val().trim(),
            scores: [choice1, choice2, choice3, choice4, choice5, choice6, choice7, choice8, choice9, choice10, choice11, choice12]

        }

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
        answers = [];


    } //form filled true


}); // end click event


//added these to return the audio back to 100% after the modals are closed

$("#friendmodalButton").on("click", function() {

    $("#myaudiosurvey").prop("volume", 1);


});



$("#modalButton").on("click", function() {
    $("#myaudiosurvey").prop("volume", 1);

});
