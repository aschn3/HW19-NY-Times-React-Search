var React = require('react');


var helpers = require('../../../utils/helpers');

var ListItem = React.createClass({

  getInitialState: function(){
    return {
      show: true
    }
  },

  
  handleClick: function(event){
    
    helpers.deleteSaved(this.props.id)
      .then(function(res){
        
        if (res.status === 'deleted') {
          
          this.setState({show: false});
        } else {
          
          this.props.deleted('error');
        }        
      }.bind(this));
  },

	
	render: function(){

		return(
      <div>
        {this.state.show === true ?
          <li className="list-group-item">
            <h3>
            	<em>{this.props.title}</em>
            	<div className="btn-group pull-right">
            		<button className="btn btn-primary" data-toggle="modal" onClick={this.handleClick}>Delete</button>
            		<a className="btn btn-default" href={this.props.url} target="_blank">
            			View Article
            		</a>
            	</div>
            </h3>
            <p>Date Published: {this.props.date}</p>
          </li>
         : null}
      </div>
      
		)
	}
});


module.exports = ListItem;