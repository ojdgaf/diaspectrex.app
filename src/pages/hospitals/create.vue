<template>
    <div class="content">
        <div class="container-fluid">
            <div class="row">
                <div class="col-12">
                    <card>
                        <template slot="header">
                            <breadcrumbs :links="[
                                { name: 'hospitals.index', title: 'Hospitals' },
                                { name: 'hospitals.create', title: 'Create hospital' }
                            ]"></breadcrumbs>
                            <title-block
                                title="Create hospital"
                            ></title-block>
                        </template>
                        <div class="col-12">
                            <div class="col-8">
                                <div class="form-group">
                                    <label>Name:</label>
                                    <input type="text" v-model="hospital.name" class="form-control" placeholder="Name...">
                                </div>
                                <div class="form-group">
                                    <label>Description:</label>
                                    <wysiwyg v-model="hospital.description"></wysiwyg>
                                </div>
                                <div class="form-group">
                                    <label>Address</label>
                                    <hr>
                                    <div class="form-group">
                                        <label>Country:</label>
                                        <select v-model="address.country_id" class="form-control">
                                            <option value="0" disabled>Nothing selected</option>
                                            <option v-for="country in countries" :value="country.id">{{ country.name }}</option>
                                        </select>
                                    </div>
                                    <div class="form-group" v-show="regions">
                                        <label>Region:</label>
                                        <select v-model="address.region_id" class="form-control">
                                            <option value="0" disabled>Nothing selected</option>
                                            <option v-for="region in regions" :value="region.id">{{ region.name }}</option>
                                        </select>
                                    </div>
                                    <div class="form-group" v-show="cities">
                                        <label>City:</label>
                                        <select v-model="address.city_id" class="form-control">
                                            <option value="0" disabled>Nothing selected</option>
                                            <option v-for="city in cities" :value="city.id">{{ city.name }}</option>
                                        </select>
                                    </div>
                                    <div class="form-group" v-show="streets">
                                        <label>Street:</label>
                                        <select v-model="address.street_id" class="form-control">
                                            <option value="0" disabled>Nothing selected</option>
                                            <option v-for="street in streets" :value="street.id">{{ street.name }}</option>
                                        </select>
                                    </div>
                                    <div class="form-group" v-show="address.street_id">
                                        <label>Building:</label>
                                        <input type="text" v-model="address.building" class="form-control">
                                    </div>
                                    <div class="text-right" v-show="address.building">
                                        <button class="btn btn-primary btn-fill"
                                                @click="assignAddressId">Approve address</button>
                                    </div>
                                </div>
                                <div class="text-right">
                                    <button class="btn btn-success btn-fill"
                                            @click="saveHospital">Save</button>
                                </div>
                            </div>
                        </div>
                    </card>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import wysiwyg from 'vue-wysiwyg'

    export default {
        data () {
            return {
                hospital: {
                    name: '',
                    description: '',
                    address_id: ''
                },
                address: {
                    country_id: 0,
                    region_id: 0,
                    city_id: 0,
                    street_id: 0,
                    building: ''
                },
                countries: null,
                regions: null,
                cities: null,
                streets: null
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
                const response = await this.axios.post('/addresses', this.address);
                return response.data;
            },
            assignAddressId () {
                this.saveAddress().then(address => this.hospital.address_id = address.id);
            },
            async saveHospital () {
                const response = await this.axios.post('/hospitals', this.hospital);
                if (response.data.success)
                    this.$successfully('Hospital was successfully created!');
                else
                    this.$unfortunately('Error occurs when trying to create hospital!');
            }
        },
        watch: {
            'address.country_id': function (countryId) {
                if (countryId !== 0){
                    this.getCountryRegions(countryId).then(regions => this.regions = regions);
                }
            },
            'address.region_id': function (regionId) {
                if (regionId !== 0){
                    this.getRegionCities(regionId).then(cities => this.cities = cities);
                }
            },
            'address.city_id': function (cityId) {
                if (cityId !== 0){
                    this.getCityStreets(cityId).then(streets => this.streets = streets);
                }
            }
        }
    }
</script>

<style scoped></style>