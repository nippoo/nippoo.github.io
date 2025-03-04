$(document).ready(function(){

  $.getJSON("https://api.tfl.gov.uk/line/mode/tube,overground,dlr,elizabeth-line/status", function(json) {

    var table = $('<table></table>')

    for(i=0; i<json.length; i++){
      line_name = json[i]["name"]
      status = '<span class="status">' + json[i]["lineStatuses"][0]["statusSeverityDescription"] + '</span>'
      if (json[i]["lineStatuses"][0]["reason"]){
        status += '<br><span class="desc">' + json[i]["lineStatuses"][0]["reason"] + '</span>'
      }
      table.append('<tr><td class="tubeline ' + line_name + '">' + line_name + '</td><td>' + status + '</td></tr>' );
    }
    $('#tubestatus').html(table);
  });

  function getBusTimes(stopID){
    $.getJSON("https://api.tfl.gov.uk/StopPoint/" + stopID + "/arrivals", function(json) {

      var newdiv = $('<div class="bustable"></div>');

      newdiv.append('<h4>' + json[0]["stationName"] + ' towards ' + json[0]["towards"] + '</h4>');

      var table = $('<table></table>').appendTo(newdiv);

      table.append('<th class="busnumber">Number</th><th class="towards">Destination</th><th class="timeuntil">Time</th>');

      json = json.sort(function(a, b) {
        var x = a["timeToStation"]; var y = b["timeToStation"];
        return ((x < y) ? -1 : ((x > y) ? 1 : 0));
      });

      for(i=0; i<json.length; i++){
        bus_number = json[i]["lineName"]
        towards = json[i]["destinationName"]
        timetil = Math.floor(json[i]["timeToStation"] / 60)
        table.append('<tr><td class="busnumber">' + bus_number + '</td><td class="towards">' + towards + '</td><td class="timeuntil">' + timetil + '</td></tr>' );
      }

      $('#bustimes').append(newdiv);
    });
  };

  // function getOccupancy(){
  //   $.getJSON("https://wifi.huntershome.org:8443/api/login", {
  //     username: unifi_u,
  //     password: unifi_p,
  //     strict: true
  //       },  function(json) {
  //       $('#dashboard').append(json)
  // })
  // }

  // getOccupancy();
  getBusTimes("490007530S");
  getBusTimes("490009155S");
  getBusTimes("490004174E");
  getBusTimes("490004991N");

    var d = new Date();
    $('#footer').append("<p id='lastupdated'>Last updated at " + d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds() + "</p>");

  });