import React, { PureComponent } from 'react';
import { Container, Header, Form, Input, Button } from 'semantic-ui-react';
import db from '../firestore';

class FilmForm extends PureComponent {
  state = {
    name: '',
  };

  handleChange = (e, { value }) => {
    this.setState({ name: value });
  };

  handleSubmit = e => {
    e.preventDefault();

    const { name } = this.state;

    if (!name) {
      return;
    }

    db.collection('films').add({
      name,
      total_views: 0,
    });

    this.setState({ name: '' });
  };

  render() {
    const { name } = this.state;
    return (
      <Container style={{ marginTop: 20 }}>
        <Header as="h2">New Film</Header>
        <Form onSubmit={this.handleSubmit}>
          <Form.Field
            value={name}
            onChange={this.handleChange}
            control={Input}
            label="Name"
            placeholder="Film name"
          />
          <Form.Field control={Button}>Submit</Form.Field>
        </Form>
      </Container>
    );
  }
}

export default FilmForm;
