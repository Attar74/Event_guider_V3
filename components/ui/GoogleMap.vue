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
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const config = useRuntimeConfig()
const googleMapsApiKey = config.public.googleMapsApiKey
const center = ref({ lat: 30.0444, lng: 31.2357 }) // Center the map on Cairo, Egypt
const selectedLocation = ref<{ lat: number; lng: number } | null>(null)
const address = ref('')
const city = ref('')

// Set marker when the map is clicked
const setMarker = (event: google.maps.MapMouseEvent) => {
  if (event.latLng) {
    selectedLocation.value = {
      lat: event.latLng.lat(),
      lng: event.latLng.lng()
    }
    getAddress()
  }
}
const emit = defineEmits(['setAddress'])

const getAddress = async () => {
  const latLng = selectedLocation.value
    ? { lat: selectedLocation.value?.lat, lng: selectedLocation.value?.lng }
    : { lat: 30.0444, lng: 31.2357 }
  try {
    const res = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latLng.lat},${latLng.lng}&key=${googleMapsApiKey}`
    )
    const data = await res.json()
    if (data.status === 'OK') {
      const result = data.results[0]
      address.value = data.plus_code.compound_code
      // Loop through the address components to find the city
      for (const component of result.address_components) {
        if (component.types.includes('administrative_area_level_2')) {
          city.value = component.long_name
          break
        }
      }
      emit('setAddress', { city: city.value, address: address.value })
    }
  } catch (error) {
    console.log(error)
  }
}
</script>
