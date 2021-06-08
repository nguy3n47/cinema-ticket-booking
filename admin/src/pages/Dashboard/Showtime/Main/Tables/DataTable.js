import ReactDatatable from '@ashvin27/react-datatable';
import { orderBy } from 'lodash';
import React from 'react';
import { Button, Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import moment from 'moment';
import './styles.scss';

function DataTable(props) {
  const { movies } = props;

  const columns = [
    {
      key: 'id',
      text: 'ID',
      sortable: true,
      cell: (movie, index) => {
        return index + 1;
      },
    },
    {
      key: 'poster',
      text: 'Poster',
      sortable: true,
      cell: (movie) => {
        return <Image src={movie.poster} width={120}></Image>;
      },
    },
    {
      key: 'title',
      text: 'Movie',
      sortable: true,
    },
    {
      key: 'release_date',
      text: 'Release Date',
      sortable: true,
      cell: (movie) => {
        return moment(movie.release_date).format('DD/MM/YYYY');
      },
    },
    {
      key: 'running_time',
      text: 'Running Time',
      sortable: true,
      cell: (movie) => {
        return movie.running_time + ' minutes';
      },
    },
    {
      key: 'action',
      text: 'Showtimes',
      cell: (movie) => {
        const url = `/dashboard/showtimes/${movie.id}`;
        return (
          <Link to={{ pathname: url, state: { movie } }}>
            <Button className="button-detail">
              <span>Detail</span>
              <i className="bx bx-detail button-icon  bx-detail"></i>
            </Button>
          </Link>
        );
      },
    },
  ];

  const config = {
    page_size: 10,
    show_filter: false,
    show_length_menu: false,
    show_pagination: true,
    pagination: 'advance',
  };

  const onSort = (column, records, sortOrder) => {
    return orderBy(records, [column], [sortOrder]);
  };

  return (
    <>
      <ReactDatatable
        responsive
        hover
        config={config}
        records={movies}
        columns={columns}
        onSort={onSort}
      />
    </>
  );
}

export default DataTable;
