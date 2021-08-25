import React from 'react';
import { GoogleMap, Marker, useLoadScript } from '@react-google-maps/api';
import { Libraries } from '@react-google-maps/api/dist/utils/make-load-script-url';
import 'antd/dist/antd.css';
import { useSelector } from 'react-redux';

const containerStyle = {
  width: '500px',
  height: '680px',
};

const libraries: Libraries = ['drawing', 'geometry', 'places'];

const Map = () => {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: '',
    libraries: libraries,
  });

  const orderInfo = useSelector((state: any) => state.order.order);
  const { city, address, location } = orderInfo.deleveredFrom;
  const deliverTO = {
    info: orderInfo.city + ', ' + orderInfo.address,
    location: { lat: orderInfo.lat, lng: orderInfo.lng },
  };
  const deliverFrom = {
    info: city + ', ' + address,
    location: location,
  };

  if (loadError) {
    return <div>Error</div>;
  }
  if (!isLoaded) {
    return <div>Loading</div>;
  }
  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={deliverTO.location}
      zoom={6}
    >
      <Marker position={deliverTO.location} />
      <Marker position={deliverFrom.location} />
    </GoogleMap>
  );
};

export default React.memo(Map);
