var questions = ["Star Wars is Awesome", "Return of the Jedi is better than Empire", "All the problems with the Jedi was Yodas fault", "Jar Jar Binks was a sith lord", "The death star was awesome we need a new Death Star", "I'm looking forward to Star Wars Episode 8", "A wookie is a weird bear thing", "I grew up and with the ewoks and loved them", "Star Wars is much better than Star Trek"];
console.log(questions);



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

            var end = data.length-1;

            // console.log(newestData[2].scores + 'newdata');
            // console.log(end + "this is the end");
            // console.log(data[1].scores[1]);

            // console.log(parseInt(data[3].scores));
            // console.log(data[0].photo)
            var myNumber = data[end].scores;
            
            var total = 0;
            var myCount = 0;
            var difference = 0;


            for(var n = 0; n < data.length; n++){



            for(var i = 0; i < questions.length; i++){
                difference = Math.abs(parseInt(data[end].scores[i]) - parseInt(data[myCount].scores[i]));


                total = total + difference;
                

            }//ends i for loop
            console.log(total); 




            totalsArray.push(total);
            

            total =0;
            difference = 0;    
            myCount++;
      


}  // ends n for loop
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

    for(var a = 0; a < totalsArray.length; a++){
        if(totalsArray[a] === min){
            console.log(a);
            var mypic = a;
            $("#myfriendspic").attr("src", data[mypic].photo);
            $("#mypmodal").html("You're best friend is now " + data[mypic].name);
        }

    }   



        })//ends done function

}


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

putQuestions();
var answers = [];

$("#submit").on("click", function() {
    var formFilled = true;
    console.log(formFilled);
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


    
    for(var i =0; i < questions.length; i++){
        if(isNaN(answers[i])){
            var number = i + 1;
            $("#mypmodal2").html("Please fill out question# " + " " + number);
            $("#myfriendspic2").attr("src", "data:image/jpeg;base64,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");
           $("#myModal2").modal();

        formFilled = false;
        console.log(formFilled);
        }
    }
     
    // console.log(answers);
if(formFilled === true){
    var newFriend = {

        name: $("#name").val().trim(),
        photo: $("#pic").val().trim(),
        scores: [choice1, choice2, choice3, choice4, choice5, choice6, choice7, choice8, choice9,]

    }

// $("#myfriendspic").attr("src", " ")

    $('select').val("");
    $('input').val("");
 
    var currentUrl = window.location.origin;

    $.post(currentUrl + "/api/friends", newFriend, function(data) {
        console.log(data);
    });

    count = 1;


    

    runQuery();
    $("#myModal").modal();

}
   answers = [];
});
