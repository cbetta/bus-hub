$(document).ready(function(){
  $.get({
    url: '/config.json',
    success: inits,
    dataType: 'json'
  });
  setInterval(showTime, 1000);
});

var config = null;

var inits = function(data) {
  config = data;
  loadArrivals();
  setInterval(loadArrivals, 10000);
}

loadArrivals = function() {
  for (var stop_id of config.stops) {
    var url = "/stop/"+stop_id;
    $.get({
      url: url,
      success: showArrivals(stop_id),
      dataType: 'json'
    });
  }
}

var showArrivals = function(stop_id) {
  var stopId = stop_id;
  return function(data) {
    $('.arrival[data-station='+stopId+']').remove();
    for (var arrival of data) {
      showArrival(stopId, arrival);
    }
    sort();
    updateStatus();
  }
}

var showArrival = function(stop_id, data) {
  var el = $('.arrival.template').clone();
  el.removeClass('template');
  var minutes = Math.floor(data.timeToStation/60);
  el.attr('data-estimation', minutes);
  el.attr('data-station', stop_id);
  el.children('.route').text(data.lineName);
  el.children('.destination').text(data.destinationName);
  el.children('.estimation').children('span').text(minutes);
  $('#schedule').append(el);
}

var sort = function() {
  var schedule = $('#schedule');

  schedule.find('.arrival').sort(function(a, b) {
      return +a.dataset.estimation - +b.dataset.estimation;
  })
  .appendTo(schedule);
}

var updateStatus = function(){
  var time = new Date().toTimeString().split(" ")[0];
  $('.status span').text(time);
}

var showTime = function() {
  var time = new Date().toTimeString().split(" ")[0];
  $('.time').text(time);
}
