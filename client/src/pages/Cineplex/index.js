import React, { useEffect } from 'react';
import { Container, Row, Image } from 'react-bootstrap';
import $ from 'jquery';
import { useDispatch, useSelector } from 'react-redux';
import { getAllCineplexsAction, getCineplexItemAction } from '../../redux/actions/cineplexActions';
import { getCineplexsSelector } from './../../redux/selectors/cineplexSelector';

function Cineplex() {
  const cineplexs = useSelector(getCineplexsSelector);
  const dispatch = useDispatch();

  const onCineplexSelectionChanged = (e) => {
    const cineplexId = parseInt(e.target.id);
    dispatch(getCineplexItemAction(cineplexId));
  };

  const GoogleMapIframe = React.memo(({ src }) => (
    <iframe
      title={cineplexs.item.name}
      allowFullScreen
      width="100%"
      height="333"
      loading="lazy"
      src={src}
    />
  ));

  useEffect(() => {
    dispatch(getAllCineplexsAction());
    return () => {
      dispatch({
        type: 'REMOVE_CINEPLEXS',
      });
    };
  }, [dispatch]);

  useEffect(() => {
    $('.cineplex_text').click(function () {
      $('.cineplex_text').removeClass('selected');
      $(this).addClass('selected');
    });
  });

  return (
    <main className="flex-shrink-0">
      <Container className="w-75">
        <Row>
          <h3 className="text-center">CGV CINEMAS</h3>
        </Row>
        <Row>
          <div className="d-flex flex-wrap mt-2">
            {cineplexs.data.map((cineplex, i) => {
              return (
                <div key={i} className="w-25">
                  <span
                    className="cineplex_text"
                    id={cineplex.id}
                    onClick={onCineplexSelectionChanged}>
                    {cineplex.name}
                  </span>
                </div>
              );
            })}
          </div>
        </Row>
        {Object.keys(cineplexs.item).length === 0 ? (
          ''
        ) : (
          <Row>
            <div className="text-center mt-4">
              <img
                src="https://www.cgv.vn/skin/frontend/cgv/default/images/h3_theater.gif"
                alt="h3_theater"
              />
              <h3 className="mt-4">{cineplexs.item.name}</h3>
              <h6 className="mt-1">{cineplexs.item.address}</h6>
            </div>
            <div>
              <Image className="cineplex-img" src={cineplexs.item.image} />
            </div>
            <div className="text-center mt-1">
              <GoogleMapIframe src={cineplexs.item.googleMapsUrl} />
            </div>
          </Row>
        )}
      </Container>
    </main>
  );
}

export default Cineplex;
