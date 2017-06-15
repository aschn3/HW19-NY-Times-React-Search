var React = require('react');

var Jumbotron = React.createClass({

	
	render: function(){

		return(
			<div className="jumbotron">
				<h2 className="text-center"><strong>New York Times Article Search with ReactJS</strong></h2>
				<h3 className="text-center">Search for and save articles.</h3>
			</div>
		)
	}
});


module.exports = Jumbotron;