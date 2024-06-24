// import React, { Component } from 'react';
// import Modal from 'react-modal';
// import '../../styleSheet/'; // Pour les styles du modal

// Modal.setAppElement('#root');

// class AddArticleModal extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       name: '',
//       quantity: '',
//       price: '',
//       discount: '',
//       amount: '',
//     };
//   }

//   handleChange = (e) => {
//     const { name, value } = e.target;
//     this.setState({ [name]: value });
//   };

//   handleAddArticle = () => {
//     const { name, quantity, price, discount } = this.state;
//     const amount = (price * quantity) - discount;
//     const article = { id: Date.now(), name, quantity, price, discount, amount };
//     this.props.onAddArticle(article);
//     this.setState({ name: '', quantity: '', price: '', discount: '', amount: '' });
//   };

//   render() {
//     const { name, quantity, price, discount } = this.state;
//     const { isOpen, onRequestClose } = this.props;

//     return (
//       <Modal
//         isOpen={isOpen}
//         onRequestClose={onRequestClose}
//         contentLabel="Ajouter un Article"
//         className="modal-content"
//         overlayClassName="modal-overlay"
//       >
//         <div className="modal-inner">
//           <h2 className="modal-title">Ajouter un Article</h2>
//           <form>
//             <label>Article:</label>
//             <input type="text" name="name" value={name} onChange={this.handleChange} />
//             <label>Quantité:</label>
//             <input type="number" name="quantity" value={quantity} onChange={this.handleChange} />
//             <label>Prix:</label>
//             <input type="number" name="price" value={price} onChange={this.handleChange} />
//             <label>Remise:</label>
//             <input type="number" name="discount" value={discount} onChange={this.handleChange} />
//             <button type="button" onClick={this.handleAddArticle}>Ajouter</button>
//           </form>
//         </div>
//       </Modal>
//     );
//   }
// }

// export default AddArticleModal;
