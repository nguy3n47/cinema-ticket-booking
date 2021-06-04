import React from 'react';
import { Button, Image, Table } from 'react-bootstrap';
import './styles.scss';

function DataTable(props) {
  const { movies } = props;

  const getId = (url) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);

    return match && match[2].length === 11 ? match[2] : null;
  };

  const deleteItem = (id) => {
    console.log(id);
  };

  const renderMovies = movies.map((movie, index) => {
    let videoId = getId(movie.trailer);
    return (
      <tr key={movie.id}>
        <th scope="row">{index + 1}</th>
        <td>
          <Image src={movie.poster} width={120}></Image>
        </td>
        <td>{movie.title}</td>
        <td>{movie.director}</td>
        <td>{movie.actor}</td>
        <td>{movie.genre}</td>
        <td>{movie.running_time}</td>
        <td>{movie.release_date}</td>
        <td>
          <iframe
            title={movie.title}
            controls
            allowFullScreen
            src={`https://www.youtube.com/embed/${videoId}`}
          />
        </td>
        <td>{movie.state}</td>
        <td>
          <Button id="button-trash" onClick={() => deleteItem(movie.id)}>
            <i className="bx bx-trash"></i>
          </Button>
        </td>
      </tr>
    );
  });

  return (
    <Table className="mt-3" responsive hover>
      <thead>
        <tr>
          <th>ID</th>
          <th>Poster</th>
          <th width="200">Title</th>
          <th width="100">Director</th>
          <th width="200">Actor</th>
          <th width="200">Genre</th>
          <th width="100">Running Time</th>
          <th width="200">Release Date</th>
          <th>Trailer</th>
          <th>State</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>{renderMovies}</tbody>
    </Table>
  );
}

export default DataTable;
