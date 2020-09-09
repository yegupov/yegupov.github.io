<template lang="pug">
  .tab-content-item.target-groups
    .card(v-for="(offerTargeting, offerindex) in offerTargetingList" :key="offerindex")
      .float-right
        button.btn-close(title="Remove" @click="removeOfferTargeting(offerindex)")
      .card__body.accordion
        .accordion-item
          h4.accordion-item-head(:class="{ active : accordions[offerindex][0]}" @click='accordionHandler(offerindex, "0", $event)') General
          transition(name="fade")
            .accordion-item-body(v-show="accordions[offerindex][0]")
              .form-group
                .float-right.checkbox-group
                  label
                    input(type="checkbox" v-model="offerTargeting.exclusions.countries")
                    span Exclude
                .form-control-label Countries
                  span.tooltip-block
                    span.info
                    span.tooltip Well organized and easy to understand Web building tutorials with lots of examples of how to use HTML, CSS, JavaScript, SQL, PHP, Python, Bootstrap, Java.
                    | :
                ChipsMultiselect(v-model="offerTargeting.countries" :items='countries' :sorting-property="'name'" :class="{ 'not-functional' : offerTargeting.exclusions.countries}")
              .form-group
                .float-right.checkbox-group
                  label
                    input(type="checkbox" v-model="offerTargeting.exclusions.regions")
                    span Exclude
                .form-control-label Regions:
                ChipsMultiselect(v-model="offerTargeting.regions" :items='regions' :sorting-property="'name'" :class="{ 'not-functional' : offerTargeting.exclusions.regions}")
              .form-group
                .float-right.checkbox-group
                  label
                    input(type="checkbox" v-model="offerTargeting.exclusions.cities")
                    span Exclude
                .form-control-label Cities:
                ChipsMultiselect(v-model="offerTargeting.cities" :items='cities' :sorting-property="'name'" :class="{ 'not-functional' : offerTargeting.exclusions.cities}")
              .form-group.wide
                label.form-control-label OS:
                .row(v-for="osm in offerTargeting.os" :key="osm.name")
                  .col-4
                    select.form-control.form-control-select(v-model="osm.name")
                      option(disabled value="") Select OS
                      option(v-for="name in osNames" :value="name") {{name}}
                  .col-2
                    select.form-control.form-control-select(v-model="osm.range")
                      option(disabled value="") Range
                      option(v-for="range in osRanges" :value="range") {{range}}
                  .col-3
                    select.form-control.form-control-select(v-model="osm.version")
                      option(disabled value="") Version
                      option(v-for="version in selectedOsVersions(osm.name)" :value="version") {{version}}
                  .col-1
                    .btn-act.remove(title="Remove" @click="removeOs(offerindex, osm.name)")
                      span -
                .btn-act(title="Add" @click="addOs(offerindex)")
                  span +
                .checkbox-group
                  label
                    input(type="checkbox" v-model="offerTargeting.antifraud")
                    span Click-level Anti-Fraud
                span.tooltip-block
                  span.info
                  span.tooltip Это — гигант мысли, отец русской демократии и особа, приближенная к императору. Кто, по-вашему, этот мощный старик? Не говорите, вы не можете этого знать.
                  | :
        .accordion-item
          h4.accordion-item-head(@click='accordionHandler(offerindex, "1", $event)') Advanced
          transition(name="fade")
            .accordion-item-body(v-show="accordions[offerindex][1]")
              .form-group
                .form-control-label Mobile carriers:
                ChipsMultiselect(v-model="offerTargeting.mobileCarriers" :items='mobileCarriers' :sorting-property="'name'")
              .form-group
                .form-control-label Devices:
                ChipsMultiselect(v-model="offerTargeting.devices" :items='devices' :sorting-property="'name'")
              .form-group
                .float-right.checkbox-group
                  label
                    input(type="checkbox" v-model="offerTargeting.exclusions.browsers")
                    span Exclude
                .form-control-label Browsers
                ChipsMultiselect(v-model="offerTargeting.browsers" :items='browsers' :sorting-property="'name'" :class="{ 'not-functional' : offerTargeting.exclusions.browsers}")
              .form-group
                .float-right.checkbox-group
                  label
                    input(type="checkbox" v-model="offerTargeting.exclusions.ip")
                    span Exclude
                .form-control-label IP / IP range
                  span.tooltip-block
                    span.info
                    span.tooltip Well organized and easy to understand Web building tutorials with lots of examples of how to use HTML, CSS, JavaScript, SQL, PHP, Python, Bootstrap, Java.
                    | :
                textarea.form-control(v-model="offerTargeting.ip" rows="5" :class="{ 'not-functional' : offerTargeting.exclusions.ip}")
              .form-group.wide
                label.form-control-label URLs
                  span.tooltip-block
                    span.info
                    span.tooltip Well organized and easy to understand Web building tutorials with lots of examples of how to use HTML, CSS, JavaScript, SQL, PHP, Python, Bootstrap, Java.
                    | :
                .row(v-for="(url, index) in offerTargeting.urls" :key="url.url")
                  .col-9
                    input.form-control(v-model="offerTargeting.urls[index].url" type="text")
                  .col-1
                    .btn-act.remove(title="Remove" @click="removeUrl(offerindex, index)")
                      span -
                .btn-act(title="Add" @click="addUrl(offerindex)")
                  span +
        .accordion-item
          h4.accordion-item-head(@click='accordionHandler(offerindex, "2", $event)') Subs
          transition(name="fade")
            .accordion-item-body(v-show="accordions[offerindex][2]")
              p Some form fields here . . .
    .float-right.btn-act(title="Add" @click="addOfferTargeting")
      span +
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: 'TabTargetingGroups',

  props: {
    saveProcess: {
      type: Boolean,
      default: false,
      required: true
    },
    osList: {
      type: Array,
      default: () => ([]),
      required: true
    },
    countries: {
      type: Array,
      default: () => ([]),
      required: true
    },
    browsers: {
      type: Array,
      default: () => ([]),
      required: true
    },
    cities: {
      type: Array,
      default: () => ([]),
      required: true
    },
    regions: {
      type: Array,
      default: () => ([]),
      required: true
    },
    mobileCarriers: {
      type: Array,
      default: () => ([]),
      required: true
    },
    devices: {
      type: Array,
      default: () => ([]),
      required: true
    }
  },

  components: {
    ChipsMultiselect: () => import("./ChipsMultiselect")
  },

  data: () => ({
    accordions: [
      [true, false, false]
    ],
    offerTargetingList: [],
    osRanges: ['>=', '<']
  }),

  created() {
    this.offerTargetingList = this.copyArray(this.offerTargeting)
  },

  computed: {
    ...mapGetters(['offerTargeting']),

    osNames() {
      const namesArr = []
      this.osList.forEach(os => {
        namesArr.push(os.name)
      })
      return namesArr
    }
  },

  watch: {
    saveProcess() {

      if (this.saveProcess) {
        const offerTargeting = this.copyArray(this.offerTargetingList)

        offerTargeting.forEach(offer => {
          if (!offer.exclusions.countries && offer.countries === null) offer.countries = 'All'
          if (!offer.exclusions.regions && offer.regions === null) offer.regions = 'All'
          if (!offer.exclusions.cities && offer.cities === null) offer.cities = 'All'
          if (!offer.exclusions.browsers && offer.browsers === null) offer.browsers = 'All'
          if (!offer.exclusions.mobileCarriers && offer.mobileCarriers === null) offer.mobileCarriers = 'All'
          if (!offer.exclusions.devices && offer.devices === null) offer.devices = 'All'

          offer.urls = offer.urls.filter(item => item.url !== '')
        })

        this.addTargetingData(offerTargeting)
      }
    }
  },

  methods: {

    ...mapActions(["addTargetingData"]),

    addOs(offerIndex) {
      this.offerTargetingList.forEach((offer, ind) => {
        if (ind === offerIndex) {
          offer.os.push({
            name: '',
            range: '',
            version: ''
          })
        }
      })
    },

    removeOs(offerIndex, os) {
      this.offerTargetingList.forEach((offer, ind) => {
        if (ind === offerIndex) {
          offer.os = offer.os.filter(osm => osm.name !== os)
        }
      })
    },

    addUrl(offerIndex) {
      this.offerTargetingList.forEach((offer, ind) => {
        if (ind === offerIndex) {
          offer.urls.push({ url: ''})
        }
      })
    },

    removeUrl(offerIndex, index) {
      this.offerTargetingList.forEach((offer, ind) => {
        if (ind === offerIndex) {
          offer.urls = offer.urls.filter((url, ind) => ind !== index)
        }
      })
    },

    addOfferTargeting() {
      this.offerTargetingList.push({
        exclusions: {
          countries: false,
          regions: false,
          cities: false,
          browsers: false,
          ip: false
        },
        antifraud: false,
        os: [],
        countries: null,
        browsers: null,
        cities: null,
        regions: null,
        mobileCarriers: null,
        devices: null,
        urls: []
      })

      this.accordions.push([false, false, false])
    },

    removeOfferTargeting(index) {
      this.offerTargetingList = this.offerTargetingList.filter((offer, ind) => ind !== index)
    },

    accordionHandler(offerIndex, number, event) {
      event.target.classList.toggle('active');
      this.accordions.forEach((accord, ind) => {
        if (ind === offerIndex) {
          this.$set(accord, +number, !accord[+number])
        }
      })
    },

    selectedOsVersions(os) {
      let osVersions = []
      this.osList.forEach(osm => {
        if (osm.name === os) osVersions = osm.versions
      })
      return osVersions
    },

    copyArray(arr) {
      const resultArray = []

      arr.forEach(offer => {

        const resultArrayItem = {}

        Object.keys(offer).forEach(key => {

          if ( Array.isArray(offer[key]) ) {

            resultArrayItem[key] = this.copyArray(offer[key])

          } else if (offer[key] === null || offer[key] === 'All') {
            resultArrayItem[key] = null
          } else if (offer[key] !== null && typeof offer[key] === 'object') {

            resultArrayItem[key] = Object.assign({}, offer[key])

          } else {
            resultArrayItem[key] = offer[key]
          }
        })
        resultArray.push(resultArrayItem)
      })

      return resultArray
    }
  }
}
</script>

<style scoped lang="scss">

.form-group {
  width: 55%;

  &.wide {
    width: calc(55% + 62px);

    .btn-act {
      margin-top: 7px;
    }

    .row > div {
      padding: 4px 10px;
    }
  }

  .form-control-label {
    font-weight: normal;
  }
}

.col-2 {
  text-align: right;
}
</style>
