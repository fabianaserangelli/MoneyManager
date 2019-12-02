var totalAmount = 0
var amountFood = 0
var amountElectronics = 0
var amountTrip = 0
var amountTransport = 0
var amountBeauty = 0
var amountClothing = 0
var amountEducation = 0
var amountBooks = 0
var amountMedicine = 0
var amountParty = 0
var amountHobbies = 0
var amountOther = 0

var token = localStorage.getItem('token');
if (token) {
  token = token.replace(/^"(.*)"$/, '$1');
}

$(document).ready(function () {

  loadExpenses()

  var flag1 = true  // Expense
  var flag2 = false // Income
  
  $name1 = $('input[name="item-name-1"')
  $amount1 = $('input[name="amount-1"') 
  $type1 = $('select[name="type-1"')
  $date1 = $('input[name="date-1"')

  $name2 = $('input[name="item-name-2"')
  $amount2 = $('input[name="amount-2"') 
  $type2 = $('select[name="type-2"')
  $date2 = $('input[name="date-2"')

  var formatDate = function(d) {

    var d = d.split('-') // Value comes yyyy-mm-dd…
    var dt = new Date(d[0],d[1],d[2]) // Note: The month is off by +1 - for JS Date object, 
    var formattedDate = ''
    var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'] // Now we can get the month like this:
    if(dt.getMonth()-1 != -1) {
      formattedDate += months[ dt.getMonth()-1 ] // Months are 0-11 for getDate
    } else {
      formattedDate += 'December'
    }

    var formattedDay

    switch(d[2].substring(1)) {
      case '1':
        formattedDay = parseInt(d[2]) + "st, " + parseInt(d[0]) // 1st, 21st, etc
        break
      case '2':
        formattedDay = parseInt(d[2]) + "nd, " + parseInt(d[0]) // 2nd
        break
      case '3':
        formattedDay = parseInt(d[2]) + "rd, " + parseInt(d[0]) // etc...
        break
      default:
        formattedDay = parseInt(d[2]) + "th, " + parseInt(d[0])
    }
    formattedDate += ' ' + formattedDay
    return formattedDate

  }

  $('#radio1').click(function() {

    $('#button').show()
    $('#ei-2').hide().slideUp("slow")
    $('#form-box-2').hide().slideUp("slow")
    $('#ei-1').slideDown()
    $('#form-box-1').slideDown()

    flag1 = true
    flag2 = false

  })

  $('#radio2').click(function() {

    $('#button').show()
    $('#ei-1').hide().slideUp("slow")
    $('#form-box-1').hide().slideUp("slow")
    $('#ei-2').slideDown()
    $('#form-box-2').slideDown()

    flag2 = true
    flag1 = false

  })

  $('#button').click(function() {
    
    var form_validated = true
      
    if(form_validated && flag1) {
      addExpense(false,$type1.val(), $name1.val(), formatDate($date1.val()), $amount1.val())
      $("table tr:first").after('<tr><td>'+$type1.val()+'</td><td>'+$name1.val()+'</td><td>'+formatDate($date1.val())+'</td><td class="amount1">- $'+$amount1.val()+'</td></tr>')
      totalAmount = parseFloat(totalAmount) - parseFloat($amount1.val())
      if (totalAmount < 0) {
        $('#total-balance').text('Total balance: - $' + Math.abs(totalAmount))
      } else {
        $('#total-balance').text('Total balance: $' + totalAmount)
      }
      $date1.val(null)
      $amount1.val(null)
      $name1.val(null)
      $("#if-empty").remove()
    }

    if(form_validated && flag2) {
      addExpense(true,$type2.val(), $name2.val(), formatDate($date2.val()), $amount2.val())
      $("table tr:first").after('<tr><td>'+$type2.val()+'</td><td>'+$name2.val()+'</td><td>'+formatDate($date2.val())+'</td><td class="amount2">+ $'+$amount2.val()+'</td></tr>') 
      totalAmount = parseFloat(totalAmount) + parseFloat($amount2.val())
      if (totalAmount < 0) {
        $('#total-balance').text('Total balance: - $' + Math.abs(totalAmount))
      } else {
        $('#total-balance').text('Total balance: $' + totalAmount)
      }
      $date2.val(null)
      $amount2.val(null)
      $name2.val(null)
      $("#if-empty").remove()
    }
  })

})

$('#graph-btn').click(function() {

  $('#modal').css("display", "block");

  new Chart($('#pie-chart'), {
    type: 'pie',
    data: {
      labels: ["Food", "Electronics", "Trip", "Transport", "Beauty", "Clothing", 
      "Education", "Books", "Medicine", "Party", "Hobbies", "Other"],
      datasets: [{
        label: "Population (millions)",
        backgroundColor: ["#FF8C8C", "#FFBAEE", "#C9A0F3", "#8CB6D4", 
        "#B2F188", "#BEFEFB", "#F5E4AD", "#FFBC80", "#6565E2", "#A826A8", 
        "#E6313C", "#C4C442"],
        data: [Math.abs(amountFood), Math.abs(amountElectronics), Math.abs(amountTrip), Math.abs(amountTransport), 
        Math.abs(amountBeauty), Math.abs(amountClothing), Math.abs(amountEducation), 
        Math.abs(amountBooks), Math.abs(amountMedicine), Math.abs(amountParty), 
        Math.abs(amountHobbies), Math.abs(amountOther)]
      }]
    },
    options: {
      title: {
        display: true,
        text: 'Expenses'
      }
    }
   });

})

$('#close').click(function() {
  $('#modal').css("display", "none");
})

function loadExpenses() {
  $.ajax({
    url: 'https://miniwebserverrx.herokuapp.com/expenses',
    headers: {
        'Content-Type':'application/json',
        'Authorization': 'Bearer ' + token
    },
    method: 'GET',
    dataType: 'json',
    success: function(data) {
      for( let i = 0; i < data.length; i++) {
        if(data[i].Nature == true) {
          $("table tr:first").after('<tr><td>'+data[i].Type+'</td><td>'+data[i].Description+'</td><td>'+data[i].Date+'</td><td class="amount2">+ $'+data[i].Amount+'</td></tr>')
          totalAmount = parseFloat(totalAmount) + parseFloat(data[i].Amount)
          if (totalAmount < 0) {
            $('#total-balance').text('Total balance: - $' + Math.abs(totalAmount))
          } else {
            $('#total-balance').text('Total balance: $' + totalAmount)
          }
        } else {
          $("table tr:first").after('<tr><td>'+data[i].Type+'</td><td>'+data[i].Description+'</td><td>'+data[i].Date+'</td><td class="amount1">- $'+Math.abs(data[i].Amount)+'</td></tr>')
          totalAmount = parseFloat(totalAmount) + -Math.abs(parseFloat(data[i].Amount))
          if(data[i].Type == 'Food') {
            amountFood += data[i].Amount
          }
          if(data[i].Type == 'Electronics') {
            amountElectronics += data[i].Amount
          }
          if(data[i].Type == 'Trip') {
            amountTrip += data[i].Amount
          }
          if(data[i].Type == 'Transport') {
            amountTransport += data[i].Amount
          }
          if(data[i].Type == 'Beauty') {
            amountBeauty += data[i].Amount
          }
          if(data[i].Type == 'Clothing') {
            amountClothing += data[i].Amount
          }
          if(data[i].Type == 'Education') {
            amountEducation += data[i].Amount
          }
          if(data[i].Type == 'Books') {
            amountBooks += data[i].Amount
          }
          if(data[i].Type == 'Medicine') {
            amountMedicine += data[i].Amount
          }
          if(data[i].Type == 'Party') {
            amountParty += data[i].Amount
          }
          if(data[i].Type == 'Hobbies') {
            amountHobbies += data[i].Amount
          }
          if(data[i].Type == 'Other') {
            amountOther += data[i].Amount
          }

          if (totalAmount < 0) {
            $('#total-balance').text('Total balance: - $' + Math.abs(totalAmount))
          } else {
            $('#total-balance').text('Total balance: $' + totalAmount)
          }

        }

      }
    },
    error: function(error_msg) {
      alert((error_msg['responseText']));
    }
  });
}


function addExpense(Nature,Type, Description, Date1, Amount) 
{
  json_to_send = {

      "Nature": Nature,
      "Type": Type,
      "Description":Description,
      "Date":JSON.stringify( Date1 ),
      "Amount":Amount
    };
    json_to_send = JSON.stringify(json_to_send);
    $.ajax({
      url: 'https://miniwebserverrx.herokuapp.com/expenses',
      headers: {
          'Content-Type':'application/json',
          'Authorization': 'Bearer ' + token
      },
      method: 'POST',
      dataType: 'json',
      data: json_to_send,
      success: function(data){
       location.reload()
      },
      error: function(error_msg) {
        alert((error_msg['responseText']));
      }
    });
    
}