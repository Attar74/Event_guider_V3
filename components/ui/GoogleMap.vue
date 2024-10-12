<template>
  <div>
    <GMapMap
      :center="center"
      :zoom="12"
      style="width: 100%; height: 400px"
      @click="setMarker"
    >
      <GMapMarker v-if="selectedLocation" :position="selectedLocation" />
    </GMapMap>
    <div v-if="selectedLocation">
      <p>
        Selected Location: Lat: {{ selectedLocation.lat }}, Lng:
        {{ selectedLocation.lng }}
        {{ address }}
      </p>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const config = useRuntimeConfig()
const googleMapsApiKey = config.public.googleMapsApiKey
const center = ref({ lat: 30.0444, lng: 31.2357 }) // Center the map on Cairo, Egypt
const selectedLocation = ref<{ lat: number; lng: number } | null>(null)
const address = ref('')

// Set marker when the map is clicked
const setMarker = (event: google.maps.MapMouseEvent) => {
  if (event.latLng) {
    getAddress()
    selectedLocation.value = {
      lat: event.latLng.lat(),
      lng: event.latLng.lng()
    }
  }
}

const getAddress = async () => {
  const latLng = selectedLocation.value
    ? { lat: selectedLocation.value?.lat, lng: selectedLocation.value?.lng }
    : { lat: 30.0444, lng: 31.2357 }
  try {
    const res = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latLng.lat},${latLng.lng}&key=${googleMapsApiKey}`
    )
    console.log(res)
  } catch (error) {
    console.log(error)
  }
}
</script>
