import { useState, useEffect } from 'react';

import apis from '../apis';
import { COUNTRY } from '../constants';

const useLocation = () => {
  const [country, setCountry] = useState(null);
  const [ip, setIp] = useState(null);

  const fetchCountry = async () => {
    try {
      const res = await apis.country.getCountry();
      setIp(res?.ip);
      if (res?.country) setCountry(res?.country);
      else setCountry(COUNTRY.VN);
    } catch (error) {
      setCountry(COUNTRY.VN);
    }
  };

  useEffect(() => {
    fetchCountry();
  }, []);

  return { country, ip };
};

export default useLocation;
