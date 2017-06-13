var React = require('react');

var Nav = require('./MainChildren/Nav');
var Jumbotron = require('./MainChildren/Jumbotron');

var helpers = require('./utils/helpers');

var Main = React.createClass({

		render: function(){

		return(
			<div className="main-container">
				<div className="container">

					<Nav />
					<Jumbotron />
						
					{this.props.children}

				</div>
			</div>
		)
	}
});


module.exports = Main;