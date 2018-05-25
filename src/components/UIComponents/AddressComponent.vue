<template>
    <div class="form-group">
        <button class="btn btn-info btn-fill" @click="areFieldsShown = !areFieldsShown">
            Address
            <i :class="[areFieldsShown ? 'fa-arrow-circle-up' : 'fa-arrow-circle-down', 'fa']"></i>
        </button>
        <div v-show="areFieldsShown">
            <hr>
            <div class="form-group">
                <label>Country:</label>
                <multiselect v-model="address.country"
                             :options="countries"
                             :searchable="true"
                             :close-on-select="true"
                             :show-labels="false"
                             label="name"
                             track-by="id"
                             placeholder="Select country...">
                </multiselect>
            </div>
            <div class="form-group" v-show="regions.length">
                <label>Region:</label>
                <multiselect v-model="address.region"
                             :options="regions"
                             :searchable="true"
                             :close-on-select="true"
                             :show-labels="false"
                             label="name"
                             track-by="id"
                             placeholder="Select region...">
                </multiselect>
            </div>
            <div class="form-group" v-show="cities.length">
                <label>City:</label>
                <multiselect v-model="address.city"
                             :options="cities"
                             :searchable="true"
                             :close-on-select="true"
                             :show-labels="false"
                             label="name"
                             track-by="id"
                             placeholder="Select city...">
                </multiselect>
            </div>
            <div class="form-group" v-show="streets.length">
                <label>Street:</label>
                <multiselect v-model="address.street"
                             :options="streets"
                             :searchable="true"
                             :close-on-select="true"
                             :show-labels="false"
                             label="name"
                             track-by="id"
                             placeholder="Select street...">
                </multiselect>
            </div>
            <div class="form-group" v-show="address.street">
                <label>Building:</label>
                <input type="text" v-model="address.building" class="form-control" placeholder="Type building...">
            </div>
            <div class="form-group" v-show="address.street">
                <label>Postal code:</label>
                <input type="text" v-model="address.postal_code" class="form-control" placeholder="Type postal code...">
            </div>
            <div class="form-group" v-show="hasFlat">
                <label>Flat:</label>
                <input type="text" v-model="address.flat" class="form-control" placeholder="Type flat number...">
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            addressId: {
                type: Number,
                default: 0
            },
            hasFlat: {
                type: Boolean,
                default: false
            }
        },
        data () {
            return {
                address: {
                    country: null,
                    region: null,
                    city: null,
                    street: null,
                    building: '',
                    flat: '',
                    postal_code: ''
                },
                countries: [],
                regions: [],
                cities: [],
                streets: [],
                areFieldsShown: false
            }
        },
        created: async function () {
            await this.getCountries().then(countries => this.countries = countries );

            if (this.addressId){
                this.areFieldsShown = true;

                let receivedAddress = {};
                await this.getAddress().then(address => receivedAddress = address);

                if (receivedAddress){
                    this.address.country = receivedAddress.country;

                    await this.getCountryRegions(receivedAddress.country.id).then(regions => this.regions = regions);
                    this.address.region = receivedAddress.region;

                    await this.getRegionCities(receivedAddress.region.id).then(cities => this.cities = cities);
                    this.address.city = receivedAddress.city;

                    await this.getCityStreets(receivedAddress.city.id).then(streets => this.streets = streets);
                    this.address.street = receivedAddress.street;

                    this.address.building = receivedAddress.building;
                    this.address.postal_code = receivedAddress.postal_code;

                    if (this.hasFlat){
                        this.address.flat = receivedAddress.flat;
                    }
                }
            }
        },
        methods: {
            async getCountries () {
                const response = await this.axios.get('/countries');
                return response.data;
            },
            async getCountryRegions (countryId) {
                const response = await this.axios.get(`/countries/${countryId}/regions`);
                return response.data;
            },
            async getRegionCities (regionId) {
                const response = await this.axios.get(`/regions/${regionId}/cities`);
                return response.data;
            },
            async getCityStreets (cityId) {
                const response = await this.axios.get(`/cities/${cityId}/streets`);
                return response.data;
            },
            async saveAddress () {
                const response = await this.axios.post('/addresses', {
                    country_id: this.address.country.id,
                    region_id: this.address.region.id,
                    city_id: this.address.city.id,
                    street_id: this.address.street.id,
                    building: this.address.building,
                    flat: this.hasFlat ? this.address.flat: null,
                    postal_code: this.address.postal_code
                });
                return response.data;
            },
            async updateAddress () {
                const response = await this.axios.put(`/addresses/${this.addressId}`, {
                    country_id: this.address.country.id,
                    region_id: this.address.region.id,
                    city_id: this.address.city.id,
                    street_id: this.address.street.id,
                    building: this.address.building,
                    flat: this.hasFlat ? this.address.flat: null,
                    postal_code: this.address.postal_code
                });
                return response.data;
            },
            async getAddressId () {
                let addressId = null;
                if (this.areFieldsShown)
                    await this.saveAddress().then(address => addressId = address.id);
                return addressId;
            },
            async getAddress(){
                let response = await this.axios.get(`/addresses/${this.addressId}`);
                return response.data;
            }
        },
        watch: {
            'address.country': function () {
                this.getCountryRegions(this.address.country.id).then(regions => this.regions = regions);
            },
            'address.region': function () {
                this.getRegionCities(this.address.region.id).then(cities => this.cities = cities);

            },
            'address.city': function () {
                this.getCityStreets(this.address.city.id).then(streets => this.streets = streets);
            },
            addressId: function (value) {
                this.addressId = parseInt(value);
            }
        }
    }
</script>