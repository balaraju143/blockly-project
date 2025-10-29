
import React, { useEffect, useState, useRef, useMemo } from 'react'
const fullRouteCoords = useMemo(() => routeData.map(p => [p.lat, p.lng]), [routeData])
const traveledCoords = useMemo(() => routeData.slice(0, currentIndex + 1).map(p => [p.lat, p.lng]), [routeData, currentIndex])


const togglePlay = () => {
if (!isPlaying && currentIndex >= routeData.length - 1) {
// restart from beginning
setCurrentIndex(0)
}
setIsPlaying(v => !v)
}


const resetSimulation = () => {
setIsPlaying(false)
setCurrentIndex(0)
}


return (
<div className="h-full w-full relative">
<div className="h-full w-full">
<MapContainer center={INITIAL_CENTER} zoom={16} scrollWheelZoom={true} className="h-full w-full">
<TileLayer
attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
/>


{fullRouteCoords.length > 0 && (
<Polyline positions={fullRouteCoords} pathOptions={{ color: 'gray', weight: 3, opacity: 0.6 }} />
)}


{traveledCoords.length > 0 && (
<Polyline positions={traveledCoords} pathOptions={{ color: 'red', weight: 5, opacity: 0.9 }} />
)}


{/* AnimatedMarker handles smooth transitions */}
{currentPosition && (
<AnimatedMarker position={[currentPosition.lat, currentPosition.lng]} icon={vehicleIcon} duration={1400} />
)}


</MapContainer>
</div>


<Controls
isPlaying={isPlaying}
togglePlay={togglePlay}
resetSimulation={resetSimulation}
currentPosition={currentPosition}
speed={calculateSpeedKmH(currentIndex, routeData)}
elapsedTime={routeData.length > 0 && routeData[0] && currentPosition.timestamp ?
(new Date(currentPosition.timestamp).getTime() - new Date(routeData[0].timestamp).getTime()) / 1000 : 0}
/>
</div>
)
