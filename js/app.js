var totalAmount = 0

$(document).ready(function () {

  var flag1 = true
  var flag2 = false
  
  $name1 = $('input[name="item-name-1"')
  $amount1 = $('input[name="amount-1"') 
  $type1 = $('select[name="type-1"')
  $date1 = $('input[name="date-1"')

  $name2 = $('input[name="item-name-2"')
  $amount2 = $('input[name="amount-2"') 
  $type2 = $('select[name="type-2"')
  $date2 = $('input[name="date-2"')
  
  var formatDate = function(d) {

    //2019-07-09

    var d = d.split('-') // Value comes yyyy-mm-dd…
    
    var dt = new Date(d[0],d[1],d[2]) // Note: The month is off by +1 - for JS Date object, 
    
    var formattedDate = ''
    
    var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'] // Now we can get the month like this:
    
    formattedDate += months[ dt.getMonth()-1 ] // Months are 0-11 for getDate

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