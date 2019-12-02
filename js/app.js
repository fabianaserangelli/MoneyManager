var totalAmount = 0
var amountFood = 0

var token = localStorage.getItem('token');
if (token) {
  token = token.replace(/^"(.*)"$/, '$1'); // Remove quotes from token start/end.
}


$(document).ready(function () {

  console.log(amountFood)
  //cargar todo
  loadExpenses()

    new Chart($('#pie-chart'), {
    type: 'pie',
    data: {
      labels: ["Africa", "Asia", "Europe", "Latin America", "Food"],
      datasets: [{
        label: "Population (millions)",
        backgroundColor: ["#3e95cd", "#8e5ea2","#3cba9f","#e8c3b9","#c45850"],
        data: [2478,5267,734,784,parseFloat(amountFood)]
      }]
    },
    options: {
      title: {
        display: true,
        text: 'Expenses'
      }
    }
});

  var flag1 = true  //Expense
  var flag2 = false //Income
  
  $name1 = $('input[name="item-name-1"')
  $amount1 = $('input[name="amount-1"') 
  $type1 = $('select[name="type-1"')
  $date1 = $('input[name="date-1"')

  $name2 = $('input[name="item-name-2"')
  $amount2 = $('input[name="amount-2"') 
  $type2 = $('select[name="type-2"')
  $date2 = $('input[name="date-2"')

  // $modal = $('#modal')
  // $graphbtn = $('#graph-btn')
  // $close = $('#close')

  var formatDate = function(d) {

    //2019-07-09

    var d = d.split('-') // Value comes yyyy-mm-dd…
    
    var dt = new Date(d[0],d[1],d[2]) // Note: The month is off by +1 - for JS Date object, 
    
    var formattedDate = ''
    
    var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'] // Now we can get the month like this:
    
    if(dt.getMonth()-1 != -1)
    {
      formattedDate += months[ dt.getMonth()-1 ] // Months are 0-11 for getDate
    }
    else
    {
      formattedDate += 'December'
    }

    var formattedDay

    
    switch( d[2].substring(1) ) {
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
})

$('#close').click(function() {
  $('#modal').css("display", "none");
})

// window.click(function() {
//   if(event.target == $('#modal')) {
//     $('#modal').css("display", "none");
//   }
// })

function loadExpenses() {
  console.log("Entre")
  $.ajax({
    //url: 'http://localhost:3000/todos',
     url: 'https://miniwebserverrx.herokuapp.com/expenses',
    headers: {
        'Content-Type':'application/json',
        'Authorization': 'Bearer ' + token
    },
    method: 'GET',
    dataType: 'json',
    success: function(data){
      console.log(data)

      for( let i = 0; i < data.length; i++) {
        // aqui va su código para agregar los elementos de la lista
        //console.log(data[i].description)
        // algo asi:
        //addExpense(data[i]._id, data[i].description, data[i].completed)
        // no tienen que usar la funcion de addTodo, es un ejemplo

        if(data[i].Nature == true)
        {
          $("table tr:first").after('<tr><td>'+data[i].Type+'</td><td>'+data[i].Description+'</td><td>'+data[i].Date+'</td><td class="amount2">+ $'+data[i].Amount+'</td></tr>')
          if (totalAmount < 0) {
            $('#total-balance').text('Total balance: - $' + Math.abs(totalAmount))
          } else {
            $('#total-balance').text('Total balance: $' + totalAmount)
          }
        }
        else
        {
          $("table tr:first").after('<tr><td>'+data[i].Type+'</td><td>'+data[i].Description+'</td><td>'+data[i].Date+'</td><td class="amount1">- $'+Math.abs(data[i].Amount)+'</td></tr>')
          if(data[i].Type == 'Food') {
            amountFood += data[i].Amount
          }
          if (totalAmount < 0) {
            $('#total-balance').text('Total balance: - $' + Math.abs(totalAmount))
          } else {
            $('#total-balance').text('Total balance: $' + totalAmount)
          }
        }

        totalAmount = parseFloat(totalAmount) - parseFloat(data[i].Amount)

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
      //url: 'http://localhost:3000/todos',
       url: 'https://miniwebserverrx.herokuapp.com/expenses',
      headers: {
          'Content-Type':'application/json',
          'Authorization': 'Bearer ' + token
      },
      method: 'POST',
      dataType: 'json',
      data: json_to_send,
      success: function(data){
        console.log(data)
        
      },
      error: function(error_msg) {
        alert((error_msg['responseText']));
      }
    });
    
}
