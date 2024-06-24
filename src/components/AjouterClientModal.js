// AjouterClientModal.js
import React, { Component } from 'react';
import Modal from 'react-modal';
import { saveToLocalStorage, getFromLocalStorage } from '../utils/localStorageUtils';
import './AjouterClientModal.css';

Modal.setAppElement('#root');

class AjouterClientModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      clientName: '',
      address: '',
      phone: '',
      email: '',
      clients: getFromLocalStorage('clients') || [],
      errorMessage: ''
    };
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  addClient = () => {
    const { clientName, address, phone, email, clients } = this.state;

    // Vérification des champs vides
    if (!clientName || !address || !phone || !email) {
      this.setState({ errorMessage: 'Tous les champs doivent être remplis' });
      return;
    }

    // Vérification si l'email existe déjà
    const emailExists = clients.some(client => client.email === email);
    if (emailExists) {
      this.setState({ errorMessage: 'Cet email est déjà utilisé' });
      return;
    }

    const newClient = { id: Date.now(), clientName, address, phone, email };
    const updatedClients = [...clients, newClient];

    this.setState({
      clients: updatedClients,
      clientName: '',
      address: '',
      phone: '',
      email: '',
      errorMessage: ''
    }, () => {
      saveToLocalStorage('clients', updatedClients);
      this.props.onClientAdded(newClient);
      this.props.onRequestClose();  // Ferme le popup après l'ajout réussi
      alert('Client ajouté avec succès');
    });
  };

  render() {
    const { clientName, address, phone, email, errorMessage } = this.state;
    return (
      <Modal
        isOpen={this.props.isOpen}
        onRequestClose={this.props.onRequestClose}
        contentLabel="Ajouter un Client"
        className="modal-content"
        overlayClassName="modal-overlay"
      >
        <div className="modal-inner">
          <h2 className="modal-title">Ajouter un Client</h2>
          {errorMessage && <p className="error-message">{errorMessage}</p>}
          <form>
            <label>Nom du client:</label>
            <input type="text" name="clientName" value={clientName} onChange={this.handleChange} />
            <label>Adresse:</label>
            <input type="text" name="address" value={address} onChange={this.handleChange} />
            <label>Téléphone:</label>
            <input type="text" name="phone" value={phone} onChange={this.handleChange} />
            <label>Email:</label>
            <input type="text" name="email" value={email} onChange={this.handleChange} />
            <button type="button" className='buttonAdd' onClick={this.addClient}>Ajouter le client</button>
            <button type="button" className='buttonClose'  onClick={this.props.onRequestClose}>Fermer</button>
          </form>
        </div>
      </Modal>
    );
  }
}

export default AjouterClientModal;
