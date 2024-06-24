import React, { Component } from 'react';
import AjouterDetailsFacture from './AjouterDetailsFacture';
import ArticleList from './ArticleList';
import '../../styleSheet/createfacture.css'

class CreerFacture extends Component {
  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      invoiceDetails: {},
    };
  }

  handleAddArticle = (article) => {
    this.setState((prevState) => ({
      articles: [...prevState.articles, article]
    }));
  };

  handleCreateInvoice = (details) => {
    this.setState({ invoiceDetails: details });
    // Save to localStorage or handle as needed
  };
  

  render() {
    const { articles } = this.state;
    return (
      <div>
        <AjouterDetailsFacture onCreateInvoice={this.handleCreateInvoice} articles={articles} />
      </div>
    );
  }
}

export default CreerFacture;
