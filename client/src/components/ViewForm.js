import React, { PureComponent } from 'react';
import { Container, Header, Form, Select, Button } from 'semantic-ui-react';
import db from '../firestore';

class ViewForm extends PureComponent {
  state = {
    film_id: '',
  };

  handleChange = (e, { value }) => {
    this.setState({ film_id: value });
  };

  handleSubmit = e => {
    e.preventDefault();

    const { film_id } = this.state;

    if (!film_id) {
      return;
    }

    db.collection('views').add({
      film_id,
      timestamp: Date.now(),
    });

    this.setState({ film_id: '' });
  };

  render() {
    const { films } = this.props;
    const { film_id } = this.state;

    const options = films.map(film => ({
      key: film.id,
      value: film.id,
      text: film.name,
    }));

    return (
      <Container style={{ marginTop: 20 }}>
        <Header as="h2">New View</Header>
        <Form onSubmit={this.handleSubmit}>
          <Form.Field
            onChange={this.handleChange}
            control={Select}
            label="Film"
            options={options}
            placeholder="Select a film to view"
            value={film_id}
          />
          <Form.Field control={Button}>Submit</Form.Field>
        </Form>
      </Container>
    );
  }
}

export default ViewForm;
