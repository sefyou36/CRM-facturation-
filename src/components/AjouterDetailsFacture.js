import React, { Component } from 'react';
import { getFromLocalStorage } from '../utils/localStorageUtils';
import ArticleList from './ArticleList';
import AddClientModal from './AjouterClientModal';
import FactureList from './FactureList';
import '../../src/index.css';
import '../../styleSheet/Modal.css';

class AjouterDetailsFacture extends Component {
  constructor(props) {
    super(props);
    this.state = {
      invoiceId: '',
      clientName: '',
      date: '',
      clients: getFromLocalStorage('clients') || [],
      articles: JSON.parse(localStorage.getItem('articlesItems')) || [],
      showAddClientModal: false,
      isInvoiceButtonDisabled: true,
      factures: getFromLocalStorage('factures') || [],
    };
  }

  componentDidMount() {
    const invoiceId = this.generateInvoiceId(false); // Générer l'ID sans incrémenter le compteur
    this.setState({ invoiceId });
  }

  handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'clientName' && value === 'add-client') {
      this.toggleAddClientModal();
    } else {
      this.setState({ [name]: value });
    }
  };

  handleAddArticle = (article) => {
    const updatedArticles = [...this.state.articles, article];
    this.setState({ articles: updatedArticles });
    localStorage.setItem('articlesItems', JSON.stringify(updatedArticles));
    this.setState({ isInvoiceButtonDisabled: updatedArticles.length === 0 });
  };

  handleArticleListChange = () => {
    const articles = JSON.parse(localStorage.getItem('articlesItems')) || [];
    this.setState({ isInvoiceButtonDisabled: articles.length === 0 });
  };

  toggleAddClientModal = () => {
    this.setState((prevState) => ({ showAddClientModal: !prevState.showAddClientModal }));
  };

  handleClientAdded = (newClient) => {
    const updatedClients = [...this.state.clients, newClient];
    this.setState({
      clients: updatedClients,
      clientName: newClient.clientName,
      showAddClientModal: false,
    });
    localStorage.setItem('clients', JSON.stringify(updatedClients));
  };

  generateInvoiceId = (increment = true) => {
    const invoiceCounter = getFromLocalStorage('invoiceCounter') || 0;
    const newCounter = increment ? invoiceCounter + 1 : invoiceCounter;
    if (increment) {
      localStorage.setItem('invoiceCounter', newCounter);
    }
    const date = new Date().toISOString().split('T')[0]; // Format YYYY-MM-DD
    return `INV-${date}-${newCounter}`;
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { invoiceId, clientName, date, articles } = this.state;

    if (invoiceId && clientName && date && articles.length > 0) {
      const amountHT = articles.reduce((total, article) => total + article.amount, 0);
      const tva = amountHT * 0.2;
      const amountTTC = amountHT + tva;
      const invoice = { id: invoiceId, clientName, date, amountHT, tva, amountTTC, articles };

      let factures = getFromLocalStorage('factures') || [];
      factures = [...factures, invoice];
      localStorage.setItem('factures', JSON.stringify(factures));

      // Générer un nouvel ID de facture pour la prochaine facture après avoir incrémenté le compteur
      const newInvoiceId = this.generateInvoiceId();

      this.setState({ 
        factures,
        invoiceId: newInvoiceId,
        clientName: '',
        date: '',
        articles: [],
        isInvoiceButtonDisabled: true,
      });

      localStorage.removeItem('articlesItems');
    }
  };

  render() {
    const { invoiceId, clientName, date, clients, articles, showAddClientModal, isInvoiceButtonDisabled } = this.state;

    return (
      <div className="container" id="parent">
        <h2 id="pageTitle">Ajouter Détails de Facture</h2>
        <form onSubmit={this.handleSubmit} className="details-form">
          <div className="form-group">
            <input
              type="text"
              name="invoiceId"
              value={invoiceId}
              onChange={this.handleChange}
              placeholder="ID de la facture"
              className="form-control input-left-align"
              disabled // Désactiver l'input pour empêcher la modification manuelle
            />
          </div>
          <div className="form-group">
            <select
              name="clientName"
              value={clientName}
              onChange={this.handleChange}
              className="form-control input-left-align"
            >
              <option value="">Sélectionner un client</option>
              {clients.map((client) => (
                <option key={client.id} value={client.clientName}>
                  {client.clientName}
                </option>
              ))}
              <option value="add-client" className="addClient">
                + Ajouter un client
              </option>
            </select>
          </div>
          <div className="form-group">
            <input
              type="date"
              name="date"
              value={date}
              onChange={this.handleChange}
              className="form-control input-left-align"
            />
          </div>
          <button type="submit" className="btn buttonAdd" disabled={isInvoiceButtonDisabled}>
            Ajouter Facture
          </button>
        </form>

        <ArticleList articles={articles} onAddArticle={this.handleAddArticle} onArticleListChange={this.handleArticleListChange} />
        {showAddClientModal && (
          <AddClientModal
            isOpen={showAddClientModal}
            onRequestClose={this.toggleAddClientModal}
            onClientAdded={this.handleClientAdded}
          />
        )}
        <FactureList factures={this.state.factures} />
      </div>
    );
  }
}

export default AjouterDetailsFacture;
