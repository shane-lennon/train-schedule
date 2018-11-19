var config = {
    apiKey: "AIzaSyAArySaHQZ5MpNato7IVVXK4Bct6Eb8SmI",
    authDomain: "train-schedule-a142d.firebaseapp.com",
    databaseURL: "https://train-schedule-a142d.firebaseio.com",
    projectId: "train-schedule-a142d",
    storageBucket: "train-schedule-a142d.appspot.com",
    messagingSenderId: "71292104976"
  };

  firebase.initializeApp(config);

  var database = firebase.database();

  $("#form-submit").click(function(event){
      event.preventDefault();

      var name = $("#train-name").val().trim();
      var destination = $("#train-destination").val().trim();
      var frequency = $("#frequency").val().trim();
      var time = $("#first-train-time").val().trim();

      database.ref().push(
          {
              name: name,
              destination: destination,
              frequency: frequency,
              time: time
          }
      );

      $("#train-name").val('');
      $("#train-destination").val('');
      $("#frequency").val('');
      $("#first-train-time").val('');
  });

  database.ref().on("child_added", function(element) {
    var startTimeConverted = moment(element.val().time, "hh:mm");
    var timeDiff = moment().diff(moment(startTimeConverted), "minutes");
    var timeRemain = timeDiff % element.val().frequency;
    var minToArrival = element.val().frequency - timeRemain;
    var nextTrain = moment().add(minToArrival, "minutes");


    var tableRecord = $("<tr>");
    tableRecord.append($("<td>" + element.val().name + "</td>"));
    tableRecord.append($("<td>" + element.val().destination + "</td>"));
    tableRecord.append($("<td class='text-center'>" + element.val().frequency + "</td>"));
    tableRecord.append($("<td class='text-center'>" + moment(nextTrain).format("LT") + "</td>"));
    tableRecord.append($("<td class='text-center'>" + minToArrival + "</td>"));

    $("#table").append(tableRecord);
    });