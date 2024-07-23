export interface IMarker {
  id: number;
  name: string;
  coordinates: {
    lat: number;
    lng: number;
  };
}

export interface IFormProps {
  zoom: number;
  center: { lat: number; lng: number };
  setZoom: (value: number) => void;
  setCenter: (coords: { lat: number; lng: number }) => void;
  handleDeleteAllMarkers: () => void;
  handleDeleteMarker: (id: number) => void;
  markers: IMarker[];
}
