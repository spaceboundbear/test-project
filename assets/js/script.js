//--------------------- Saving Patient Form ---------------//

var firstName = $("#first-name");
var lastName = $("#last-name");
var birthYear = $("#age");
var address = $("#address-input");
var idNum = $("#response-id");
var gender = $('#gender')
var bp = $("#blood-pressure");
var symptomsNumbers = [];
var notes = $("#notes");
var submitForm = $(".form-submit");
var patientInfo = [];

submitForm.on("click", function submitInfo(event) {
  event.preventDefault();

  var patient = {
    firstName: firstName.val(),
    lastName: lastName.val().trim(),
    address: address.val().trim(),
    responder: idNum.val().trim(),
    //birthDay: birthDay.val().trim(),
    //birthMonth: birthMonth.val().trim(),
    birthYear: birthYear.val().trim(),
    notes: notes.val().trim(),
    bloodPressure: bp.val().trim(),
    gender: gender.val()
  };

  localStorage.setItem("patientinfo", JSON.stringify(patient));
});

if (window.location.href.match("existingpatient.html") != null) {
  var sPatient = JSON.parse(localStorage.getItem("patientinfo"));
  console.log("works");
  loadPatientList();
}

function loadPatientList() {
  var sPatient = JSON.parse(localStorage.getItem("patientinfo"));
  $('.nameEl').text(sPatient.firstName.toUpperCase() + ' ' + sPatient.lastName.toUpperCase())
  $('.address-text').text('Address: ' + sPatient.address)
  $('.age-text').text('Age: ' + sPatient.birthYear)
  $('.bp-text').text('Blood Pressure ' + sPatient.bloodPressure)
  $('.notes-text').text('Notes: ' + sPatient.notes)
  $('.id-text').text('Responder ID#: ' + sPatient.responder)
  $('.gender-val').text('Gender: ' + sPatient.gender)
}

//var symptoms =
//'https://sandbox-healthservice.priaid.ch/symptoms?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6Im1mLm1pY2hhZWxmaXNjaGVyQGdtYWlsLmNvbSIsInJvbGUiOiJVc2VyIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvc2lkIjoiOTYyOCIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvdmVyc2lvbiI6IjIwMCIsImh0dHA6Ly9leGFtcGxlLm9yZy9jbGFpbXMvbGltaXQiOiI5OTk5OTk5OTkiLCJodHRwOi8vZXhhbXBsZS5vcmcvY2xhaW1zL21lbWJlcnNoaXAiOiJQcmVtaXVtIiwiaHR0cDovL2V4YW1wbGUub3JnL2NsYWltcy9sYW5ndWFnZSI6ImVuLWdiIiwiaHR0cDovL3NjaGVtYXMubWljcm9zb2Z0LmNvbS93cy8yMDA4LzA2L2lkZW50aXR5L2NsYWltcy9leHBpcmF0aW9uIjoiMjA5OS0xMi0zMSIsImh0dHA6Ly9leGFtcGxlLm9yZy9jbGFpbXMvbWVtYmVyc2hpcHN0YXJ0IjoiMjAyMS0wOC0zMSIsImlzcyI6Imh0dHBzOi8vc2FuZGJveC1hdXRoc2VydmljZS5wcmlhaWQuY2giLCJhdWQiOiJodHRwczovL2hlYWx0aHNlcnZpY2UucHJpYWlkLmNoIiwiZXhwIjoxNjMxMjM0ODI3LCJuYmYiOjE2MzEyMjc2Mjd9.qTYJ1YWtwdhly_qdprtPPkkRQ3Bx7nY_NkeI2UMVa9I&format=json&language=en-gb';

/* var diagnosis =
  'https://sandbox-healthservice.priaid.ch/diagnosis?symptoms=' +
  //symptomsNumbers +
  '&gender=Male' +
  //gender +
  '&year_of_birth=1983' +
  // birthYear +
  '&token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6Im1mLm1pY2hhZWxmaXNjaGVyQGdtYWlsLmNvbSIsInJvbGUiOiJVc2VyIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvc2lkIjoiOTYyOCIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvdmVyc2lvbiI6IjIwMCIsImh0dHA6Ly9leGFtcGxlLm9yZy9jbGFpbXMvbGltaXQiOiI5OTk5OTk5OTkiLCJodHRwOi8vZXhhbXBsZS5vcmcvY2xhaW1zL21lbWJlcnNoaXAiOiJQcmVtaXVtIiwiaHR0cDovL2V4YW1wbGUub3JnL2NsYWltcy9sYW5ndWFnZSI6ImVuLWdiIiwiaHR0cDovL3NjaGVtYXMubWljcm9zb2Z0LmNvbS93cy8yMDA4LzA2L2lkZW50aXR5L2NsYWltcy9leHBpcmF0aW9uIjoiMjA5OS0xMi0zMSIsImh0dHA6Ly9leGFtcGxlLm9yZy9jbGFpbXMvbWVtYmVyc2hpcHN0YXJ0IjoiMjAyMS0wOC0zMSIsImlzcyI6Imh0dHBzOi8vc2FuZGJveC1hdXRoc2VydmljZS5wcmlhaWQuY2giLCJhdWQiOiJodHRwczovL2hlYWx0aHNlcnZpY2UucHJpYWlkLmNoIiwiZXhwIjoxNjMxMjM1MTIzLCJuYmYiOjE2MzEyMjc5MjN9.Zkr14yldTVoyKfLdt8cWe7qzXueW2-mFgOI3eF3Cs3Q&format=json&language=en-gb';

  */

//console.log(symptoms);
//console.log(diagnosis);

/* fetch(symptoms)
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    console.log(data);
  });

/*fetch(diagnosis)
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    console.log(data);
  });
  */
