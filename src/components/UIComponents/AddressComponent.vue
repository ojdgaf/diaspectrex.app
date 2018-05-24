<template>
    <div class="form-group">
        <label>Address</label>
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
            <input type="text" v-model="address.building" class="form-control">
        </div>
        <div class="form-group" v-show="address.street">
            <label>Postal code:</label>
            <input type="text" v-model="address.postal_code" class="form-control">
        </div>
        <div class="form-group" v-show="hasFlat">
            <label>Flat:</label>
            <input type="text" v-model="address.flat" class="form-control">
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            hasFlat: {
                type: Boolean,
                required: true
            }
        },
        data () {
            return {
                address: {
                    id: null,
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
                streets: []
            }
        },
        created: function () {
            this.getCountries().then(countries => this.countries = countries );
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
            async getAddressId () {
                let addressId = null;
                await this.saveAddress().then(address => addressId = address.id);
                return addressId;
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
            }
        }
    }
</script>