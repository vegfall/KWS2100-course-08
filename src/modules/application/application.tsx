import React, { MutableRefObject, useEffect, useRef } from "react";
import { Map, View } from "ol";
import "ol/ol.css";
import { OSM } from "ol/source";
import TileLayer from "ol/layer/Tile";
import { useGeographic } from "ol/proj";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import { GeoJSON } from "ol/format";

useGeographic();

const map = new Map({
  view: new View({
    center: [11, 60],
    zoom: 10,
  }),
  layers: [
    new TileLayer({ source: new OSM() }),
    new VectorLayer({
      source: new VectorSource({
        url: "/kommuner.json",
        format: new GeoJSON(),
      }),
    }),
  ],
});

export default function Application() {
  const mapRef = useRef() as MutableRefObject<HTMLDivElement>;

  useEffect(() => {
    map.setTarget(mapRef.current);
  }, []);

  return (
    <>
      <main ref={mapRef}></main>
    </>
  );
}
