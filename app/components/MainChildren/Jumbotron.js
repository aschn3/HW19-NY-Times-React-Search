var React = require('react');

var Jumbotron = React.createClass({

	
	render: function(){

		return(
			<div className="jumbotron">
				<h2 className="text-center"><strong>(ReactJS) New York Times Article Scrubber</strong></h2>
				<h3 className="text-center">Search for and save articles of interest.</h3>
			</div>
		)
	}
});


module.exports = Jumbotron;