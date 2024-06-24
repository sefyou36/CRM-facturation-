import React, { Component } from 'react';
import DetailsFacture from './DetailsFacture';
import { getFromLocalStorage } from '../utils/localStorageUtils';
import '../../styleSheet/factureList.css';
import '../../styleSheet/Modal.css';

class FactureList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      factures: getFromLocalStorage('factures') || [],
      selectedFacture: null,
    };
  }

  componentDidUpdate(prevProps) {
    if (this.props.factures !== prevProps.factures) {
      this.setState({ factures: this.props.factures });
    }
  }

  handleViewDetails = (facture) => {
    this.setState({ selectedFacture: facture });
  };

  closeDetailsModal = () => {
    this.setState({ selectedFacture: null });
  };

  render() {
    const { factures, selectedFacture } = this.state;

    return (
      <div>
        <h2>Liste des Factures</h2>
        <table>
          <thead>
            <tr>
              <th>ID Facture</th>
              <th>Client</th>
              <th>Montant HT</th>
              <th>TVA</th>
              <th>Montant TTC</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {factures.map((facture) => (
              <tr key={facture.id}>
                <td>{facture.id}</td>
                <td>{facture.clientName}</td>
                <td>{facture.amountHT.toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' })}</td>
                <td>{facture.tva.toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' })}</td>
                <td>{facture.amountTTC.toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' })}</td>
                <td>
                  <button onClick={() => this.handleViewDetails(facture)}>Voir Détails</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {selectedFacture && (
          <DetailsFacture facture={selectedFacture} onClose={this.closeDetailsModal} />
        )}
      </div>
    );
  }
}

export default FactureList;
