import React from 'react';
import Modal from 'react-modal';

Modal.setAppElement('#root');

const DetailsFacture = ({ facture, onClose }) => {
  return (
    <Modal
      isOpen={!!facture}
      onRequestClose={onClose}
      contentLabel="Détails de la Facture"
      className="modal-content"
      overlayClassName="modal-overlay"
    >
      <h2>Détails de la Facture</h2>
      <p>ID Facture: {facture.id}</p>
      <p>Nom du Client: {facture.clientName}</p>
      <p>Date: {facture.date}</p>
      <p>Montant HT: {facture.amountHT}</p>
      <p>TVA: {facture.tva}</p>
      <p>Montant TTC: {facture.amountTTC}</p>
      <h3>Articles</h3>
      {facture.articles.map((article) => (
        <div key={article.id}>
          <p>Article: {article.name}</p>
          <p>Quantité: {article.quantity}</p>
          <p>Prix: {article.price}</p>
          <p>Remise: {article.discount}</p>
          <p>Montant: {article.amount}</p>
        </div>
      ))}
      <button onClick={onClose}>Fermer</button>
    </Modal>
  );
};

export default DetailsFacture;
