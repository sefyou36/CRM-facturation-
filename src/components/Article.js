import React from 'react';

const ArticleItem = ({ article, onDelete }) => {
  return (
    <tr>
      <td className="text-left">{article.name}</td>
      <td className="text-left">{article.quantity}</td>
      <td className="text-left">{article.price.toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' })}</td>
      <td className="text-left">{article.discount}%</td>
      <td className="text-left">{article.amount.toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' })}</td>
      <td className="text-left">
        <button className='buttonClose' onClick={() => onDelete(article.id)}>Supprimer</button>
      </td>
    </tr>
  );
};

export default ArticleItem;
