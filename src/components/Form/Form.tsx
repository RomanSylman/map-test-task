import React from "react";
import { IFormProps } from "../../types/types";
import "./Form.css";

const Form: React.FC<IFormProps> = ({
  zoom,
  center,
  setZoom,
  setCenter,
  handleDeleteAllMarkers,
  markers,
  handleDeleteMarker,
}) => {
  return (
    <form>
      <label htmlFor="zoom">Zoom</label>
      <input
        type="number"
        id="zoom"
        name="zoom"
        value={zoom}
        onChange={(event) => setZoom(Number(event.target.value))}
      />
      <br />
      <label htmlFor="lat">Latitude</label>
      <input
        type="number"
        id="lat"
        name="lat"
        value={center.lat}
        onChange={(event) =>
          setCenter({ ...center, lat: Number(event.target.value) })
        }
      />
      <br />
      <label htmlFor="lng">Longitude</label>
      <input
        type="number"
        id="lng"
        name="lng"
        value={center.lng}
        onChange={(event) =>
          setCenter({ ...center, lng: Number(event.target.value) })
        }
      />
      <h3>
        {markers.length === 0 ? "Click on map to add markers" : "Markers"}
      </h3>
      <ul style={{ listStyle: "none" }}>
        {markers.map((marker) => (
          <li key={marker.id}>
            <p>{`Point ${marker.name} coordinates lat:${marker.coordinates.lat} lng: ${marker.coordinates.lng}`}</p>
            <button onClick={() => handleDeleteMarker(marker.id)}>
              Delete
            </button>
          </li>
        ))}
      </ul>
      <button onClick={handleDeleteAllMarkers}>Clear</button>
    </form>
  );
};

export default Form;
