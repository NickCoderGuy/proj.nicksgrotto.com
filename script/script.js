document.getElementById("cryptoSubmit").addEventListener("click", function(event) {
  event.preventDefault();
  const value = document.getElementById("cryptoInput").value;
  if (value === "")
    return;

  const url = "https://api.coinpaprika.com/v1/coins/" + value;

  fetch(url)
    .then(function(response) {
      return response.json();
    }).then(function(json) {
      let results = "";

      results += '<h2>Coin is ' + json.name + "</h2>";
      results += '<p>Symbol is ' + json.symbol + "</p>";
      results += '<p>Description: ' + json.description + "</p>";
    
      document.getElementById("cryptoResults").innerHTML = results;

    });   

  const url2 = "https://api.coinpaprika.com/v1/coins/" + value + "/ohlcv/latest/";

  fetch(url2)
	.then(function(response) {
	 return response.json();
	}).then(function(json) {

      var chart = new CanvasJS.Chart("chartContainer",
      {
	
      theme: "dark1", 
      title:{
      text: json.coin.open + " Todays price",
      fontColor: "white",
      fontFamily: "'Monoton', sans-serif"
      },
       data: [
      {
        type: "line",

        dataPoints: [
        { x: new Date(2021, 00, 01), y: json.open },
        { x: new Date(2021, 01, 02), y: json.high },
        { x: new Date(2021, 02, 03), y: json.low },
        { x: new Date(2021, 03 ,04), y: json.close }
        ]
      }
      ]
    });

    chart.render();
  });
  
});

