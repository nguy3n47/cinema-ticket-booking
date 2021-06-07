import ReactDatatable from '@ashvin27/react-datatable';
import { orderBy } from 'lodash';
import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import ModalForm from '../Modals/Modal';
import { removeCinema } from '../../../../../redux/actions/cinemaActions';
import './styles.scss';

function DataTable(props) {
  const { cinemas, cineplexs, cinemaTypes } = props;
  const [isShow, setIsShow] = useState(false);
  const [data, setData] = useState(null);
  const dispatch = useDispatch();

  const columns = [
    {
      key: 'id',
      text: 'ID',
      sortable: true,
      cell: (cinema, index) => {
        return index + 1;
      },
    },
    {
      key: 'name',
      text: 'Name',
      sortable: true,
    },
    {
      key: 'cineplex',
      text: 'Cineplex',
      sortable: true,
      cell: (cinema) => {
        return cinema.Cineplex.name;
      },
    },
    {
      key: 'cinemaType',
      text: 'Cinema Type',
      sortable: true,
      cell: (cinema) => {
        return cinema.CinemaType.name;
      },
    },
    {
      key: 'vertical_size',
      text: 'Vertical Size',
    },
    {
      key: 'horizontal_size',
      text: 'Horizontal Size',
    },
    {
      key: 'action',
      text: 'Action',
      cell: (cinema) => {
        return (
          <Button className="button-trash" onClick={() => deleteCinema(cinema.id)}>
            <i className="bx bxs-trash-alt"></i>
          </Button>
        );
      },
    },
  ];

  const config = {
    page_size: 5,
    show_filter: false,
    show_length_menu: false,
    show_pagination: true,
    pagination: 'advance',
  };

  const deleteCinema = (id) => {
    setIsShow((isShow) => !isShow);
    dispatch(removeCinema(id));
  };

  const onSort = (column, records, sortOrder) => {
    return orderBy(records, [column], [sortOrder]);
  };

  const rowClickedHandler = (event, data, rowIndex) => {
    setData(data);
    setIsShow((isShow) => !isShow);
  };

  return (
    <>
      {isShow ? (
        <ModalForm
          isShow={isShow}
          data={data}
          cineplexs={cineplexs}
          cinemaTypes={cinemaTypes}
          method="eidt"
          title="Edit Cinema"
        />
      ) : (
        ''
      )}
      <ReactDatatable
        responsive
        hover
        config={config}
        records={cinemas}
        columns={columns}
        onSort={onSort}
        onRowClicked={rowClickedHandler}
      />
    </>
  );
}

export default DataTable;
