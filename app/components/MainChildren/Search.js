var React = require('react');

var Query = require('./SearchChildren/Query');
var Results = require('./SearchChildren/Results');
var SaveItem = require('./SearchChildren/ResultsChildren/SaveItem');
var Notification = require('./SearchChildren/Notification');


var helpers = require('../utils/helpers');

var Search = React.createClass({

	
	getInitialState: function(){
		return {
			search: "",
			start: "",
			end: "",
			same: false,
			results: [],
			modalIsOpen: false,
			type: "",
			message: ""
		}
	},

	
	handleChange: function(event){

  	
  	var newState = {};
  	newState[event.target.id] = event.target.value;
  	
  	newState['same'] = false;
  	this.setState(newState);

	},

	
	handleClick: function(event){

		if (this.state.same === false) {
			
			this.setState({same: true});

			
			var terms = {
				search: this.state.search.trim(),
				start: this.state.start,
				end: this.state.end
			}

			
			if (terms.search === "" || terms.start === "" || terms.end === "") {
				
				this.message('Error','Please fill in all inputs.');
				return
			} else if (terms.start < 1851 || terms.start > 2016 || terms.end < 1951 || terms.end > 2016) {
				
				this.message('Error','Please specify start and end date between 1851 and 2016.');
				return
			}

			
			helpers.getArticles(terms)
				.then(function(data){
					if (data === false) {
						
						this.message('Error','No results found. Please refine inputs.');
					} else {
						
						this.setState({
							results: data
						});
					}
				}.bind(this))		
		}
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

  saved: function(status) {
  	if (status === 'saved') {
  		
			this.message('Successfully Saved','Click "Saved Articles" in navigation to review.');
  	} else {
  		
			this.message('Error','Article was already saved.');
  	}
		return
  },

	
	render: function(){

		var saved = this.saved;

		return(
			<div>			

			  <Query handleChange={this.handleChange} handleClick={this.handleClick} />
			  {this.state.results.length !== 0 ? 
			  	<Results fa="fa fa-newspaper-o" text="Results">
			  		{this.state.results.map(function(result) {
				  		return (
				  			<SaveItem 
				  				key={result._id}
				  				title={result.headline.main}
				  				url={result.web_url}
				  				date={result.pub_date}
				  				saved={saved}
				  			/>
				  		)
				  	})}
				  </Results> : null}
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


module.exports = Search;