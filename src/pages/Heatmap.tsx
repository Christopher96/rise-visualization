import Modal from "antd/lib/modal/Modal";
import React, {
  useContext,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import Context from "../context";
import Model from "../model/Model";

const wifiSvg = {
  path:
    "M8.213 16.984c.97-1.028 2.308-1.664 3.787-1.664s2.817.636 3.787 1.664l-3.787 4.016-3.787-4.016zm-1.747-1.854c1.417-1.502 3.373-2.431 5.534-2.431s4.118.929 5.534 2.431l2.33-2.472c-2.012-2.134-4.793-3.454-7.864-3.454s-5.852 1.32-7.864 3.455l2.33 2.471zm-4.078-4.325c2.46-2.609 5.859-4.222 9.612-4.222s7.152 1.613 9.612 4.222l2.388-2.533c-3.071-3.257-7.313-5.272-12-5.272s-8.929 2.015-12 5.272l2.388 2.533z",
  fillColor: "blue",
  fillOpacity: 0.6,
  strokeWeight: 0,
  rotation: 0,
  scale: 2,
  anchor: new google.maps.Point(12, 20),
};

function polygonConvert(
  coords: Array<[number, number]>
): google.maps.LatLngLiteral[] {
  return coords.map((coord) => ({ lat: coord[0], lng: coord[1] }));
}

function getAreas(): Map<number, any> {
  let areas = Model.getAreas();

  const map = new Map<number, any>();
  areas.forEach((area: any) => {
    map.set(area.id, {
      name: area.name,
      coords: polygonConvert(area.polygon),
    });
  });
  return map;
}

function getPoints(areas: any) {
  let stats = Model.getStats();

  const points = stats[0].areas
    .filter((e) => e.id !== 0)
    .map((area_visits) => {
      const weight = area_visits.average_length / 100;
      const area = areas.get(area_visits.id);

      return {
        location: new google.maps.LatLng(area.coords[0]),
        weight,
      };
    });

  return points;
}

let markers: any = [];
let polygons: any = [];

function addAreaToMap(area: any, map: google.maps.Map) {
  const { name, coords } = area;

  const wifiMarker = new google.maps.Marker({
    position: coords[0],
    map,
    title: name,
    icon: wifiSvg,
  });

  markers.push(wifiMarker);

  const polygon = new google.maps.Polygon({
    map,
    paths: coords,
    strokeColor: "#FF0000",
  });

  polygons.push(polygon);

  const content = `
    <div style='text-align:center;font-size:1.5em;'>
      <b>Name:</b> ${name} <br>
      <b>Longitude:</b> ${coords[0].lat}<br>
      <b>Latitude:</b> ${coords[0].lng}
    </div>
  `;

  const infoWindow = new google.maps.InfoWindow({
    content,
    pixelOffset: new google.maps.Size(0, -40),
  });

  wifiMarker.addListener("click", (event: any) => {
    infoWindow.setPosition(event.latLng);

    infoWindow.open(map);
  });
}

function createButton(text: string, onclick: () => void) {
  const toggleButton = document.createElement("button");
  toggleButton.textContent = text;
  toggleButton.classList.add("custom-map-control-button");
  toggleButton.addEventListener("click", onclick);

  map.controls[google.maps.ControlPosition.TOP_RIGHT].push(toggleButton);
}

let markersToggle = true;
let heatmapToggle = true;
let polygonToggle = true;

function addButtons() {
  createButton("Markers", () => {
    markersToggle = !markersToggle;
    markers.forEach((marker: any) => marker.setVisible(markersToggle));
  });
  createButton("Heatmap", () => {
    heatmapToggle ? heatmap.setMap(null) : heatmap.setMap(map);
    heatmapToggle = !heatmapToggle;
  });
  createButton("Polygons", () => {
    polygonToggle = !polygonToggle;
    polygons.forEach((polygon: any) => polygon.setVisible(polygonToggle));
  });
}

let map: google.maps.Map;
let heatmap: google.maps.visualization.HeatmapLayer;

function createMap(current: HTMLDivElement) {
  map = new google.maps.Map(current, {
    center: { lat: 59.218996, lng: 17.943658 },
    zoom: 12,
  });

  let areas = getAreas();

  areas.forEach((area) => addAreaToMap(area, map));

  heatmap = new google.maps.visualization.HeatmapLayer({
    data: getPoints(areas),
    map: map,
    radius: 200,
  });

  heatmap.setMap(map);

  addButtons();
}

export default function Heatmap() {
  const context = useContext(Context);

  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  useEffect(() => {
    context?.setPage("heatmap");
  });

  const mapRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const { current } = mapRef;
    if (current != null && map == null) createMap(current);
  }, [mapRef]);

  return (
    <>
      <div id="map" ref={mapRef}></div>
      <Modal
        title="Basic Modal"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Modal>
    </>
  );
}
