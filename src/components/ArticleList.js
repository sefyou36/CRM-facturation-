import React, { Component } from 'react';
import ArticleItem from './Article';

class ArticleList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      articleList: props.articles || [],
      name: '',
      quantity: '',
      price: '',
      discount: '',
    };
  }

  componentDidUpdate(prevProps) {
    if (prevProps.articles !== this.props.articles) {
      this.setState({ articleList: this.props.articles });
    }
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleAjouterArticle = (e) => {
    e.preventDefault();
    const { name, quantity, price, discount, articleList } = this.state;
    if (name && quantity && price && discount) {
      const newArticle = {
        id: Date.now(),
        name,
        quantity: Number(quantity),
        price: Number(price),
        discount: Number(discount),
        amount: Number(quantity) * Number(price) * (1 - Number(discount) / 100),
      };

      const newArticleList = [...articleList, newArticle];
      this.setState({
        articleList: newArticleList,
        name: '',
        quantity: '',
        price: '',
        discount: '',
      });

      localStorage.setItem('articlesItems', JSON.stringify(newArticleList));
      this.props.onAddArticle(newArticle);
    }
  };

  deleteArticle = (id) => {
    const newArticleList = this.state.articleList.filter((article) => article.id !== id);
    this.setState({ articleList: newArticleList });
    localStorage.setItem('articlesItems', JSON.stringify(newArticleList));

    if (newArticleList.length === 0) {
      this.props.onArticleListChange();
    }
  };

  render() {
    const { name, quantity, price, discount, articleList } = this.state;

    return (
      <div className="article-list">
        <form onSubmit={this.handleAjouterArticle} className="details-form">
          <div className="form-group">
            <input
              type="text"
              name="name"
              value={name}
              onChange={this.handleChange}
              placeholder="Nom de l'article"
              className="form-control input-left-align"
            />
          </div>
          <div className="form-group">
            <input
              type="number"
              name="quantity"
              value={quantity}
              onChange={this.handleChange}
              placeholder="Quantité"
              className="form-control input-left-align"
            />
          </div>
          <div className="form-group">
            <input
              type="number"
              name="price"
              value={price}
              onChange={this.handleChange}
              placeholder="Prix"
              className="form-control input-left-align"
            />
          </div>
          <div className="form-group">
            <input
              type="number"
              name="discount"
              value={discount}
              onChange={this.handleChange}
              placeholder="Remise"
              className="form-control input-left-align"
            />
          </div>
          <button type="submit" className="btn buttonAdd">
            Ajouter Article
          </button>
        </form>
        <table className="table-fill">
          <thead>
            <tr>
              <th className="text-left">Article</th>
              <th className="text-left">Quantité</th>
              <th className="text-left">Prix</th>
              <th className="text-left">Remise</th>
              <th className="text-left">Montant</th>
              <th className="text-left">Action</th>
            </tr>
          </thead>
          <tbody className="table-hover">
            {articleList.map((article) => (
              <ArticleItem
                key={article.id}
                article={article}
                onDelete={this.deleteArticle}
              />
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

export default ArticleList;
