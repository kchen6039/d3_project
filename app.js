$(document).ready(function () {

	
		var svgHeight = '300';
		var svgWidth = '1200';
		var barPadding = '1';

		function createSvg(parent, height, width) {
			return d3.select(parent)
					 .append('svg')
					 .attr('height', height)
					 .attr('width', width);
		}

		var svg = createSvg('body', svgHeight, svgWidth);

		var frequencyData = new Uint8Array(200);
		
		// Create our initial D3 chart.
		svg.selectAll('rect')
		   .data(frequencyData)
		   .enter()
		   .append('rect')
		   .attr('x', function (d, i) {
			  return i * (svgWidth / frequencyData.length);
		   })
		   .attr('width', svgWidth / frequencyData.length - barPadding);
		   
		   
		   
		   var audioCtx = new (window.AudioContext || window.webkitAudioContext)();
		   var audioElement = document.getElementById('audioElement');
		   var audioSrc = audioCtx.createMediaElementSource(audioElement);
		   var analyser = audioCtx.createAnalyser();

		   // Bind our analyser to the media element source.
		   audioSrc.connect(analyser);
		   audioSrc.connect(audioCtx.destination);
		   
		   
		   
		   // Continuously loop and update chart with frequency data.
function renderChart() {
   requestAnimationFrame(renderChart);

   // Copy frequency data to frequencyData array.
   analyser.getByteFrequencyData(frequencyData);

   console.log(frequencyData)
   // Update d3 chart with new data.
   svg.selectAll('rect')
      .data(frequencyData)
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

// Run the loop
renderChart();
		   
		   
		   
		   
		  
		  
		 
		    

		    

			

		

			
		  
});