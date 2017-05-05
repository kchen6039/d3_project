$(document).ready(function () {

  var audioCtx = new (window.AudioContext || window.webkitAudioContext)();
 
  var audioElement = document.getElementById('audioElement');
 
  var audioSrc = audioCtx.createMediaElementSource(audioElement);
  var analyser1 = audioCtx.createAnalyser();
  var analyser2 = audioCtx.createAnalyser();
 
  audioSrc.connect(analyser1);
  audioSrc.connect(analyser2);
  audioSrc.connect(audioCtx.destination);
  
  var dataArray = new Uint8Array(200);

  //var dataArray = new Uint8Array(200); // Uint8Array should be the same length as the fftSize 
  
  var svgHeight = '300';
  var svgWidth = '1200';
  var barPadding = '1';

  function createSvg(parent, height, width) {
    return d3.select(parent).append('svg').attr('height', height).attr('width', width);
  }

  var svg1 = createSvg('body', svgHeight, svgWidth);
  var svg2 = createSvg('body', svgHeight, svgWidth);
  
  svg1.selectAll('rect')
     .data(dataArray)
     .enter()
     .append('rect')
     .attr('x', function (d, i) {
        return i * (svgWidth / dataArray.length);
     })
     .attr('width', svgWidth / dataArray.length - barPadding);
	 
  svg2.selectAll('rect')
     .data(dataArray)
     .enter()
     .append('rect')
     .attr('x', function (d, i) {
        return i * (svgWidth / dataArray.length);
     })
	 .attr('y', 500)
     .attr('width', svgWidth / dataArray.length - barPadding);

  // Continuously loop and update chart with frequency data.
  function renderChart1() {
     var drawVisual = requestAnimationFrame(renderChart1);
     console.log(audioCtx.currentTime);
	 analyser1.getByteTimeDomainData(dataArray); 
	 console.log(dataArray);

     // Update d3 chart with new data.
     svg1.selectAll('rect')
		.data(dataArray)
        .attr('y', function(d) {
           return svgHeight - d;
        })
        .attr('height', function(d) {
           return d;
        })
        .attr('fill', function(d) {
           return 'rgb(0, 0, ' + d + ')';
        });
  }
  
  function renderChart2() {
     var drawVisual = requestAnimationFrame(renderChart2);
     console.log(audioCtx.currentTime);
	 analyser2.getByteFrequencyData(dataArray);
	 console.log(dataArray);

     // Update d3 chart with new data.
		
	 svg2.selectAll('rect')
		.data(dataArray)
        .attr('y', function(d) {
           return svgHeight*2+20 - d;
        })
        .attr('height', function(d) {
           return d;
        })
        .attr('fill', function(d) {
           return 'rgb(0, 0, ' + d + ')';
        });
		
	  renderChart2();
  }

  // Run the loop
  renderChart1();

});
