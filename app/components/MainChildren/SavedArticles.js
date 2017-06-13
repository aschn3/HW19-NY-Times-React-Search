var React = require('react');


var Results = require('./SearchChildren/Results');
var DeleteItem = require('./SearchChildren/ResultsChildren/DeleteItem');
var Notification = require('./SearchChildren/Notification');


var helpers = require('../utils/helpers');

var SavedArticles = React.createClass({

	getInitialState: function(){
		return {
			results: [],
			modalIsOpen: false,
			type: "",
			message: ""
		}
	},

	componentWillMount: function() {
		
		helpers.getSaved()
			.then(function(data){
				
				if (data === false) {
					
					this.message('Error','Unable to find articles. Please try again.');
				} else {
					
					this.setState({
						results: data
					});
				}
			}.bind(this))	
	},

  openModal: function() {
    this.setState({modalIsOpen: true});
  },

  closeModal: function() {
    this.setState({modalIsOpen: false});
  },

  message: function(type,text) {
  	
  	this.setState({
  		type: type,
			message: text
		});
		
		this.openModal();
  },

  deleted: function(status) {
  	if (status === 'error') {
  		
			this.message('Error','Article was unable to be deleted. Please try again.');
  	}
		return
  },

	
	render: function(){

		var deleted = this.deleted;

		return(
			<div>
				<Results fa="fa fa-download" text="Saved Articles">
		  		{this.state.results.map(function(result) {
			  		return (
			  			<DeleteItem 
			  				key={result._id}
			  				id={result._id}
			  				title={result.title}
			  				url={result.url}
			  				date={result.date}
			  				deleted={deleted}
			  			/>
			  		)
			  	})}
			  </Results>
			  <Notification
			  	modalIsOpen={this.state.modalIsOpen}
			  	openModal={this.openModal}
			  	closeModal={this.closeModal}
			  	type={this.state.type}
			  	message={this.state.message} />
			</div>
		)
	}
});


module.exports = SavedArticles;