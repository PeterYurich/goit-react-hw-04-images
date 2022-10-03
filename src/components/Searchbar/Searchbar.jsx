import React, { Component } from 'react';
import PropTypes from 'prop-types'

import css from './Searchbar.module.css';

export class Searchbar extends Component {

  static propTypes = {
    saveRequest: PropTypes.func.isRequired
  }
  
  state = {
    request: '',
  };

  handleControlInput = evt => {
    const { name, value } = evt.target;
    this.setState({ [name]: value });
  };

  handleSubmit = evt => {
    evt.preventDefault();

    if (this.state.request.trim() === '') {
      alert('enter something');
      return;
    }


    this.props.saveRequest(this.state.request);
  };

  render() {
    const { request } = this.state;

    return (
      <header className={css.Searchbar}>
        <form onSubmit={this.handleSubmit} className={css.SearchForm}>
          <button type="submit" className={css.SearchForm_button}>
            <span className={css.SearchForm_button_label}>Search</span>
          </button>
          <input
            className={css.SearchForm_input}
            type="text"
            name="request"
            value={request}
            onChange={this.handleControlInput}
            //   autocomplete="off"
            autoFocus
            placeholder="Search images and photos"
          />
        </form>
      </header>
    );
  }
}
