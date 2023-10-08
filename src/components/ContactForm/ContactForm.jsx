import React, { Component } from 'react';
import {nanoid} from 'nanoid'
import { FormWrap, Form, Text, Input, Button} from './ContactForm.styled'

export default class ContactForm extends Component {
  state = {
    name: '',
    number: '',
  };

  handleInputChange = evt => {
    this.setState({
      [evt.target.name]: evt.target.value,
    });
  };

  handleSubmit = (evt) => {
      evt.preventDefault();
      const { name, number} = this.state;

      const newContact = {
        id: nanoid(),
        name: name,
        number: number,
    
      }

      this.props.addContact(newContact)

      this.setState({
        name: '',
        number: '',
      });
  
  }
  render() {
    const { name, number } = this.state;
    return (
      <FormWrap>
        <Form onSubmit={this.handleSubmit}>
          <label>
            <Text>Name</Text>
            <Input
              onChange={this.handleInputChange}
              type="text"
              placeholder="Enter name"
  
              name="name"
              value={name}
              required
            />
          </label>
          <label>
            <Text>Number</Text>
            <Input
              onChange={this.handleInputChange}
              type="tel"
              placeholder="Enter number"
              
              name="number"
              value={number}
              required
            />
          </label>

          <Button type="submit">Add contact</Button>
        </Form>
      </FormWrap>
    );
  }
}
