import React, { PureComponent } from 'react';
import { Container, Divider } from 'semantic-ui-react';
import db from './firestore';
import Films from './components/Films';
import Views from './components/Views';
import FilmForm from './components/FilmForm';
import ViewForm from './components/ViewForm';
import 'semantic-ui-css/semantic.min.css';

class App extends PureComponent {
  state = {
    views: [],
    viewsLoading: true,
    films: [],
    filmsLoading: true,
  };

  componentDidMount = () => {
    this.viewsUnsubscribe = db.collection('views').onSnapshot(
      snapshot => {
        const views = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

        this.setState({
          views,
          viewsLoading: false,
        });
      },
      err => console.error(err)
    );

    this.filmsUnsubscribe = db.collection('films').onSnapshot(
      snapshot => {
        const films = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

        this.setState({
          films,
          filmsLoading: false,
        });
      },
      err => console.error(err)
    );
  };

  componentWillUnmount = () => {
    this.viewsUnsubscribe();
    this.filmsUnsubscribe();
  };

  render() {
    const { views, viewsLoading, films, filmsLoading } = this.state;

    return (
      <div
        style={{
          margin: 40,
          display: 'grid',
          gridTemplateColumns: '50% 50%',
          gridGap: 10,
        }}
      >
        <div>
          <Films films={films} loading={filmsLoading} />
          <FilmForm />
        </div>
        <div>
          <Views views={views} loading={viewsLoading} />
          <ViewForm films={films} />
        </div>
      </div>
    );
  }
}

export default App;
