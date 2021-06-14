import React from 'react';
import './styles.scss';

function Footer() {
  return (
    <footer className="footer mt-4 py-3 bg-light">
      <div className="container text-center">
        <img
          src="https://www.cgv.vn/skin/frontend/cgv/default/images/bg-cgv/brand-type-film-footer-min-600.png"
          alt="cgvfooter"
        />
      </div>
      <div className="footer-cgv-address text-center mt-3">
        <div className="cgv-address-content">
          <div className="logo-footer-cgv">&nbsp;</div>
          <div className="text-cgv-address">
            <h3>CÔNG TY TNHH CJ CGV VIETNAM</h3>
            <p>Địa Chỉ:&nbsp;Tầng 2, Rivera Park Saigon - Số 7/28 Thành Thái, P.14, Q.10, TPHCM.</p>
            <p>Hotline: 1900 6017</p>
            <p>COPYRIGHT 2021 CJ CGV. All RIGHTS RESERVED .</p>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
