import moment from "moment/moment";
import React from "react";
import "./GoogleMapView.css";

import Marker_Black from "../icons/start_green.svg";
import marker_white from "../icons/start_white.svg";
import Marker_End_Black from "../icons/end_red.svg";
import Marker_End_White from "../icons/end_white.svg";
import Marker_Black_Dot from "../icons/wayPoint_black.svg";
import Marker_White_Dot from "../icons/wayPoint_white.svg";
import Live_Marker_White from "../icons/Live_white.svg";
import Live_Marker_Black from "../icons/Live_black.svg";
import Black_Dot from "../icons/Live_black.svg";

function MapIssue() {
  const isChildren = undefined;
  const centerPosition = { lat: 17.47684, lng: 78.5234 };
  const startPosition = {
    lat: 17.47984,
    lng: 78.32,
    trackTime: "Wed, 22 Feb 2023 09:58:23 GMT",
  };
  const endPosition = {
    lat: 17.4785952,
    lng: 78.3065374,
    trackTime: "Tue, 02 May 2023 07:00:48 GMT",
  };
  const polyLines = [
    {
      id: "00D62299495B2d63F5E73F2d0005",
      lat: 17.27684,
      lng: 78.5234,
      trackTime: "Wed, 22 Feb 2023 09:58:23 GMT",
    },

    {
      id: "00D62299495B2d63F5E73F2d0005",
      lat: 17.47684,
      lng: 78.5234,
      trackTime: "Wed, 22 Feb 2023 09:58:23 GMT",
    },

    {
      id: "00D62299495B2d63F5E73F2d0005",
      lat: 17.67684,
      lng: 78.5234,
      trackTime: "Wed, 22 Feb 2023 09:58:23 GMT",
    },
  ];

  const isLiveTracking = "STOPTRACKING";

  const ref = React.useRef(null);
  const dots =
    polyLines?.length === 1 &&
    polyLines[0]?.lat === 0 &&
    polyLines[0]?.lng === 0
      ? []
      : [...polyLines];
  const trackingPath = [];

  if (
    startPosition?.lat !== 0 &&
    startPosition?.lng !== 0 &&
    endPosition?.lat !== 0 &&
    endPosition?.lng !== 0
  ) {
    trackingPath?.push({ lat: startPosition?.lat, lng: startPosition?.lng });
    if (dots?.length > 0) {
      dots?.map((polyLine) => {
        return trackingPath?.push({ lat: polyLine?.lat, lng: polyLine?.lng });
      });
    }
    trackingPath?.push({ lat: endPosition?.lat, lng: endPosition?.lng });
  }

  const circleSymbol = {
    path: "M 0, 1 0, 1",
    strokeOpacity: 1,
    scale: 8,
  };

  const isTerrainView = (map) => {
    return (
      map?.mapTypeId === mapTypes?.terrain ||
      map?.mapTypeId === mapTypes?.roadmap
    );
  };

  const getStrokeColor = (map) => {
    return isTerrainView(map) ? colorCodes?.black : colorCodes?.white;
  };

  const getStartMarker = (map) => {
    return isTerrainView(map) ? Marker_Black : marker_white;
  };

  const getEndMarker = (map) => {
    return isTerrainView(map) ? Marker_End_Black : Marker_End_White;
  };

  const getDotMarker = (map) => {
    return isTerrainView(map) ? Marker_Black_Dot : Marker_White_Dot;
  };

  const getLiveMarker = (map) => {
    return isTerrainView(map) ? Live_Marker_Black : Live_Marker_White;
  };

  const isLiveSession = () => {
    return isLiveTracking === trackingType?.open;
  };

  const isNewLiveSession = () => {
    return isLiveSession() && endPosition?.lat === 0 && endPosition?.lng === 0;
  };

  const showMarkerTime = (map, infowindow, trackTime, marker) => {
    const findBracketPos = trackTime?.toString()?.indexOf(")") + 1;
    const recNum = trackTime?.toString()?.substring(0, findBracketPos);
    const recTime = trackTime?.toString()?.substring(findBracketPos);
    infowindow.setContent(
      `<div><a class="update-number"><b>${recNum}</b></a>${recTime}</div>`
    );
    infowindow.open({
      anchor: marker,
      map,
    });
  };

  React.useEffect(() => {
    if (
      (centerPosition?.lat !== 0 && centerPosition?.lng !== 0) ||
      (startPosition?.lat !== 0 && startPosition?.lng !== 0)
    ) {
      const map = new window.google.maps.Map(ref.current, {
        center: { lat: centerPosition?.lat, lng: centerPosition?.lng },
        zoom: 18,
        mapTypeId:
          getStorageValue(localStorageNames?.mapType) === mapTypes?.hybrid
            ? mapTypes?.hybrid
            : mapTypes?.terrain,
        backgroundColor: "none",
        panControl: true,
        gestureHandling: "cooperative",
      });

      const drawStartMarker = new window.google.maps.Marker({
        position: { lat: startPosition?.lat, lng: startPosition?.lng },
        map: map,
        clickable: true,
        icon: {
          url: isNewLiveSession() ? getLiveMarker(map) : getStartMarker(map),
          scaledSize: new window.google.maps.Size(55, 45),
        },
      });

      if (startPosition?.lat !== 0 && startPosition?.lng !== 0) {
        let sessionDistance = 0;
        let origin;
        let destination;
        if (trackingPath?.length > 0) {
          trackingPath?.map((loc, i) => {
            if (sessionDistance < 15) {
              if (i === 0) {
                origin = new window.google.maps.LatLng(loc?.lat, loc?.lng);
              }
              if (i > 0) {
                destination = new window.google.maps.LatLng(loc?.lat, loc?.lng);
                sessionDistance =
                  sessionDistance +
                  window.google.maps.geometry.spherical.computeDistanceBetween(
                    origin,
                    destination
                  );
              }
            }
          });
        }
        if (sessionDistance > 15) {
          const bounds = new window.google.maps.LatLngBounds();
          bounds?.extend({ lat: startPosition?.lat, lng: startPosition?.lng });
          if (trackingPath?.length > 0) {
            trackingPath?.map((polyLine) => {
              return bounds?.extend(polyLine);
            });
          }
          if (endPosition?.lat !== 0 && endPosition?.lng !== 0) {
            bounds?.extend({ lat: endPosition?.lat, lng: endPosition?.lng });
            map?.fitBounds(bounds);
          }
          map?.panToBounds(bounds);
        }
      }

      const dotPoints =
        dots?.length > 0 &&
        dots?.map((marker) => {
          return new window.google.maps.Marker({
            position: { lat: marker?.lat, lng: marker?.lng },
            map: map,
            clickable: true,
            icon: {
              url: getDotMarker(map),
              scaledSize: new window.google.maps.Size(55, 45),
            },
          });
        });

      const drawEndMarker =
        endPosition?.lat !== 0 &&
        endPosition?.lng !== 0 &&
        new window.google.maps.Marker({
          position: { lat: endPosition?.lat, lng: endPosition?.lng },
          map: map,
          clickable: true,
          icon: {
            url: isLiveSession() ? getLiveMarker(map) : getEndMarker(map),
            scaledSize: new window.google.maps.Size(55, 45),
          },
        });

      const poly =
        dots?.length > 0 &&
        new window.google.maps.Polyline({
          path: trackingPath,
          geodesic: true,
          strokeColor: getStrokeColor(map),
          strokeOpacity: 1,
          strokeWeight: 2,
          icons: [
            {
              icon: circleSymbol,
              offset: "1",
              repeat: "20px",
            },
          ],
        });
      if (dots?.length > 0) {
        poly?.setMap(map);
      }

      map?.addListener("maptypeid_changed", () => {
        setStorageValue(localStorageNames?.mapType, map?.getMapTypeId());
        drawStartMarker &&
          drawStartMarker?.setIcon({
            url: isNewLiveSession() ? getLiveMarker(map) : getStartMarker(map),
            scaledSize: new window.google.maps.Size(55, 45),
          });
        dotPoints &&
          dotPoints?.map((dotMarker) => {
            return dotMarker?.setIcon({
              url: getDotMarker(map),
              scaledSize: new window.google.maps.Size(55, 45),
            });
          });
        drawEndMarker &&
          drawEndMarker?.setIcon({
            url: isLiveSession() ? getLiveMarker(map) : getEndMarker(map),
            scaledSize: new window.google.maps.Size(55, 45),
          });
        if (dots?.length > 0) {
          poly?.setOptions({ strokeColor: getStrokeColor(map) });
        }
      });

      const infowindow = new window.google.maps.InfoWindow();

      if (window.innerWidth < 900) {
        drawStartMarker &&
          drawStartMarker?.addListener("click", () =>
            showMarkerTime(
              map,
              infowindow,
              "1) " + getUTCDateTime(startPosition?.trackTime),
              drawStartMarker
            )
          );
        if (dots?.length > 0) {
          dotPoints &&
            dotPoints?.map((dotMarker, j) => {
              dots &&
                dots?.map((dotPoint, i) => {
                  if (i === j) {
                    dotMarker &&
                      dotMarker?.addListener("click", () =>
                        showMarkerTime(
                          map,
                          infowindow,
                          `${i + 2}) ` + getUTCDateTime(dotPoint?.trackTime),
                          dotMarker
                        )
                      );
                  }
                });
            });
        }
        drawEndMarker &&
          drawEndMarker?.addListener("click", () =>
            showMarkerTime(
              map,
              infowindow,
              `${dots?.length > 0 ? dots?.length + 2 : 2}) ` +
                getUTCDateTime(endPosition?.trackTime),
              drawEndMarker
            )
          );
        setInterval(() => {
          infowindow?.close();
        }, 5000);
      } else {
        drawStartMarker &&
          drawStartMarker?.addListener("mouseover", () =>
            showMarkerTime(
              map,
              infowindow,
              "1) " + getUTCDateTime(startPosition?.trackTime),
              drawStartMarker
            )
          );
        if (dots?.length > 0) {
          dotPoints?.map((dotMarker, j) => {
            dots?.map((dotPoint, i) => {
              if (i === j) {
                dotMarker &&
                  dotMarker?.addListener("mouseover", () =>
                    showMarkerTime(
                      map,
                      infowindow,
                      `${i + 2}) ` + getUTCDateTime(dotPoint?.trackTime),
                      dotMarker
                    )
                  );
              }
            });
          });
        }
        drawEndMarker &&
          drawEndMarker?.addListener("mouseover", () =>
            showMarkerTime(
              map,
              infowindow,
              `${dots?.length > 0 ? dots?.length + 2 : 2}) ` +
                getUTCDateTime(endPosition?.trackTime),
              drawEndMarker
            )
          );
        setInterval(() => {
          infowindow?.close();
        }, 5000);
      }
    }
  });

  const getUTCDateTime = (date) => {
    const dateTime = new Date(date);    
    const momentDate = moment(dateTime);       
    const momentUTCDateFormat = momentDate.format("D MMMM YYYY");    
    const momentUTCTime = momentDate.format("LT");     
    const extractTime = moment(momentUTCTime, "hh:mm:ss A").format("HH:mm:ss");  
    const formatTime = extractTime?.slice(0,5);
    const formattedDate = formatTime + ", " + momentUTCDateFormat;  
    return formattedDate;
  }

  const setStorageValue = (key, value) => {
    localStorage.setItem(key, JSON.stringify(value));
  };

  const getStorageValue = (key) => {
    return JSON.parse(localStorage.getItem(key));
  };

  const colorCodes = {
    white: "#FFFFFF",
    black: "#000000",
    brown: "#979797",
    darkCharcoal: "#333333",
    whiteSmoke: "#F5F5F5",
    salametti: "#E3602C",
    steelWool: "#777777",
    startlingOrange: "#E3612C",
    tango: "#E66C2B",
    dustyGray: "#979797",
    silver: "#BDBDBD",
    ebonyClay: "#252B42",
    alto: "#D9D9D9",
    gray: "#808080",
    bunker: "#0F1419",
    burntSienna: "#E77446",
    karry: "#FFE8D8"  
  };

  const trackingType = {
    open: "STARTTRACKING",
    close: "STOPTRACKING",
  }

  const mapTypes = {
    terrain: "terrain",
    roadmap: "roadmap",
    satellite: "satellite",
    hybrid: "hybrid"
  };

  const localStorageNames  = {
    loginDetails : "loginDetails",
    notificationRead : "notificationRead",
    loggedIn : "loggedIn",
    fcmToken : "fcmToken",
    currentPage : "currentPage",
    language: "language",
    sessionData:"sessionData",  
    mapType:"mapType",
    trackingId:"trackingId"
  }

  return (
    <>
      <div ref={ref} className="map-class" />
      {React.Children?.map(isChildren, (child) => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child);
        }
      })}
    </>
  );
}

export default MapIssue;
