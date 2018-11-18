import React, { PureComponent } from 'react';
import { Header, Table, Container, Button } from 'semantic-ui-react';
import db from '../firestore';

class Views extends PureComponent {
  handleDelete = id => {
    db.collection('films')
      .doc(id)
      .delete();
  };

  render() {
    const { films, loading } = this.props;

    if (loading) {
      return (
        <Container>
          <h1>films</h1>
          <p>loading...</p>
        </Container>
      );
    }

    return (
      <Container>
        <Header as="h1">films</Header>
        <Table>
          <Table.Header>
            <Table.Row>
              <Table.Cell>Film</Table.Cell>
              <Table.Cell>Views</Table.Cell>
              <Table.Cell>Delete</Table.Cell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {films.map(film => (
              <Table.Row key={film.id}>
                <Table.Cell>{film.name}</Table.Cell>
                <Table.Cell>{film.total_views}</Table.Cell>
                <Table.Cell>
                  <Button
                    onClick={() => this.handleDelete(film.id)}
                    color="red"
                  >
                    x
                  </Button>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </Container>
    );
  }
}

export default Views;
