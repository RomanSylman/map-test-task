import { Map, AdvancedMarker } from "@vis.gl/react-google-maps";
import { useEffect, useState } from "react";
import Form from "../Form/Form";
import "./MapComponent.css";
import { IMarker } from "../../types/types";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  onSnapshot,
} from "firebase/firestore";
import { db } from "../../db/firebase";

const MAP_ID = import.meta.env.VITE_APP_GOOGLE_MAPS_MAP_ID;

const MapComponent = () => {
  const [zoom, setZoom] = useState(3);
  const [isDrag, setIsDrag] = useState(false);
  const [markers, setMarkers] = useState<IMarker[]>([]);
  const [center, setCenter] = useState({
    lat: 0,
    lng: 0,
  });

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "markers"), (snapshot) => {
      const loadedMarkers: IMarker[] = [];
      snapshot.forEach((doc) => {
        loadedMarkers.push(doc.data().marker);
      });
      setMarkers(loadedMarkers);
    });

    return () => unsubscribe();
  }, []);

  const handleMapClick = async (e: any) => {
    if (isDrag) {
      return;
    }

    const coordinates = e.detail.latLng;
    const lastMarker = markers[markers.length - 1];
    const newMarker = {
      id: lastMarker ? lastMarker.id + 1 : 0,
      name: lastMarker ? String(+lastMarker.name + 1) : "1",
      coordinates: coordinates,
    };

    try {
      const docRef = await addDoc(collection(db, "markers"), {
        marker: newMarker,
      });
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
    setMarkers([...markers, newMarker]);
  };

  const handleZoomChange = (e: any) => {
    setZoom(e.detail.zoom);
    setCenter(e.detail.center);
  };

  const handleDeleteMarker = async (id: number) => {
    const markerToDelete = markers.find((marker) => marker.id === id);

    if (markerToDelete) {
      try {
        await deleteDoc(doc(db, "markers", markerToDelete.id.toString()));
        console.log("Document deleted successfully");
      } catch (error) {
        console.error("Error deleting document: ", error);
      }
    }

    setMarkers(markers.filter((marker) => marker.id !== id));
  };

  const handleUpdateMarkerPosition = async (
    e: google.maps.MapMouseEvent,
    id: number
  ) => {
    setTimeout(() => setIsDrag(false));

    const { lat, lng } = e.latLng!.toJSON();

    const markerToDelete = markers.find((marker) => marker.id === id);

    if (markerToDelete) {
      try {
        await deleteDoc(doc(db, "markers", markerToDelete.id.toString()));
        console.log("Document deleted successfully");
      } catch (error) {
        console.error("Error deleting document: ", error);
      }
    }

    setMarkers(
      markers.map((marker) => {
        if (id === marker.id) {
          return { ...marker, coordinates: { lat: lat, lng: lng } };
        }
        return marker;
      })
    );
  };

  const handleDeleteAllMarkers = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "markers"));
      querySnapshot.forEach(async (doc) => {
        await deleteDoc(doc.ref);
      });
      console.log("All documents deleted successfully");
    } catch (error) {
      console.error("Error deleting all documents: ", error);
    }

    setMarkers([]);
  };

  return (
    <div style={{ display: "flex", height: "100%" }}>
      <Map
        onZoomChanged={handleZoomChange}
        center={center}
        zoom={zoom}
        onClick={handleMapClick}
        mapId={MAP_ID}
      >
        {markers.map((marker) => (
          <AdvancedMarker
            className="marker"
            key={marker.id}
            position={marker.coordinates}
            draggable
            onDragStart={() => setIsDrag(true)}
            onDragEnd={(e) => handleUpdateMarkerPosition(e, marker.id)}
          >
            {marker.name}
          </AdvancedMarker>
        ))}
      </Map>
      <Form
        zoom={zoom}
        center={center}
        setZoom={setZoom}
        setCenter={setCenter}
        markers={markers}
        handleDeleteAllMarkers={handleDeleteAllMarkers}
        handleDeleteMarker={handleDeleteMarker}
      />
    </div>
  );
};

export default MapComponent;
