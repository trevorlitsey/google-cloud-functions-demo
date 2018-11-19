import React, { PureComponent } from 'react';
import { Table, Header, Container, Button } from 'semantic-ui-react';
import db from '../firestore';

class Films extends PureComponent {
  handleDelete = id => {
    db.collection('views')
      .doc(id)
      .delete();
  };

  render() {
    const { views, films, loading } = this.props;

    if (loading) {
      return (
        <Container>
          <Header as="h1">Films</Header>
          <p>loading...</p>
        </Container>
      );
    }

    return (
      <Container>
        <Header as="h1">Views</Header>
        <Table>
          <Table.Header>
            <Table.Row>
              <Table.Cell>Film</Table.Cell>
              <Table.Cell>Timestamp</Table.Cell>
              <Table.Cell>Delete</Table.Cell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {views.map(view => {
              const timestamp = new Date(view.timestamp).toLocaleString();
              const film = films.find(film => film.id === view.film_id);

              return (
                <Table.Row key={view.id}>
                  <Table.Cell>{film ? film.name : '🤷‍'}</Table.Cell>
                  <Table.Cell>{timestamp}</Table.Cell>
                  <Table.Cell>
                    <Button
                      onClick={() => this.handleDelete(view.id)}
                      color="red"
                    >
                      x
                    </Button>
                  </Table.Cell>
                </Table.Row>
              );
            })}
          </Table.Body>
        </Table>
      </Container>
    );
  }
}

export default Films;
