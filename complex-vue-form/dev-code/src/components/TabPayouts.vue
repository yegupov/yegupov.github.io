<template lang="pug">
  .tab-content-item.payouts
    .card(v-for="(offerPayout, offerindex) in offerPayoutList" :key="offerindex")
      .float-right.payouts__act
        button.btn-paste(title="Paste")
        button.btn-copy(title="Copy")
        button.btn-close(title="Remove" @click="removeOfferPayout(offerindex)")
      .card__body
        .form-group
          .row
            .col-2
              .float-right.checkbox-group
                label
                  input(type="checkbox" v-model="offerPayout.exclusions.countries")
                  span Exclude
                span.tooltip-block
                  span.info
                  span.tooltip Well organized and easy to understand Web building tutorials with lots of examples of how to use HTML, CSS, JavaScript, SQL, PHP, Python, Bootstrap, Java.
              .form-control-label Countries:
              ChipsMultiselect(v-model="offerPayout.countries" :items='countries' :sorting-property="'name'")
            .col-4
              .float-right.checkbox-group
                label
                  input(type="checkbox" v-model="offerPayout.exclusions.cities")
                  span Exclude
                span.tooltip-block
                  span.info
                  span.tooltip Это — гигант мысли, отец русской демократии и особа, приближенная к императору. Кто, по-вашему, этот мощный старик? Не говорите, вы не можете этого знать.
              .form-control-label Cities:
              ChipsMultiselect(v-model="offerPayout.cities" :items='cities' :sorting-property="'name'")
            .col-2
              .form-control-label Devices:
              ChipsMultiselect(v-model="offerPayout.devices" :items='devices' :sorting-property="'name'")
            .col-2
              .form-control-label OS:
              ChipsMultiselect(v-model="offerPayout.os" :items='osList' :sorting-property="'name'")
        .form-group
          .row
            .col-2
              input.form-control(v-model="offerPayout.subs.sub1" placeholder="Sub1" type="text")
            .col-2
              input.form-control(v-model="offerPayout.subs.sub2" placeholder="Sub2" type="text")
            .col-2
              input.form-control(v-model="offerPayout.subs.sub3" placeholder="Sub3" type="text")
            .col-2
              input.form-control(v-model="offerPayout.subs.sub4" placeholder="Sub4" type="text")
        .form-group
          .row
            label.col-1.form-control-label Total
              span.tooltip-block
                span.info
                span.tooltip Well organized and easy to understand Web building tutorials with lots of examples of how to use HTML, CSS, JavaScript, SQL, PHP, Python, Bootstrap, Java.
                | :
              input.form-control(v-model="offerPayout.total" placeholder="0" type="text")
            label.col-1.form-control-label Payouts
              span.tooltip-block
                span.info
                span.tooltip Well organized and easy to understand Web building tutorials with lots of examples of how to use HTML, CSS, JavaScript, SQL, PHP, Python, Bootstrap, Java.
                | :
              input.form-control(v-model="offerPayout.payouts" placeholder="0" type="text")
            label.col-2.form-control-label Currency:
              select.form-control.form-control-select(v-model="offerPayout.currency")
                option(disabled) Select currency
                option(v-for="currency in currencies" :value="currency") {{currency}}
            label.col-2.form-control-label Goal value
              span.tooltip-block
                span.info
                span.tooltip Well organized and easy to understand Web building tutorials with lots of examples of how to use HTML, CSS, JavaScript, SQL, PHP, Python, Bootstrap, Java.
                | :
              input.form-control(v-model="offerPayout.goalValue" placeholder="1" type="text")
            label.col-2.form-control-label Goal title:
              select.form-control.form-control-select(v-model="offerPayout.goalTitle")
                option(disabled) Goal not selected
                option(v-for="goal in goalTitles" :value="goal") {{goal}}
            label.col-2.form-control-label Payment type:
              select.form-control.form-control-select(v-model="offerPayout.paymentType")
                option(disabled) Fixed amount
                option(v-for="type in paymentTypes" :value="type") {{type}}
    .float-right.btn-act(title="Add" @click="addOfferPayout")
      span +
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: 'TabTabPayouts',

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
    cities: {
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
    offerPayoutList: [],
    currencies: ['USD', 'EU', 'RUB', 'HTG', 'JPY', 'LBP', 'PLN'],
    goalTitles: ['January', 'February', 'March', 'May', 'June'],
    paymentTypes: ['Cash', 'Cheque', 'Debit Card', 'Credit Card']

  }),

  created() {
    this.offerPayoutList = this.copyArray(this.offerPayouts)
  },

  computed: {
    ...mapGetters(['offerPayouts']),
  },

  watch: {
    saveProcess() {
      if (this.saveProcess) {
        const offerPayout = this.copyArray(this.offerPayoutList)

        offerPayout.forEach(offer => {
          if (!offer.exclusions.countries && offer.countries === null) offer.countries = 'All'
          if (!offer.exclusions.cities && offer.cities === null) offer.cities = 'All'
          if (offer.os === null) offer.os = 'All'
          if (offer.devices === null) offer.devices = 'All'
        })
        this.addPayoutsData(offerPayout)
      }
    }
  },

  methods: {

    ...mapActions(["addPayoutsData"]),

    addOfferPayout() {
      this.offerPayoutList.push({
        exclusions: {
          countries: false,
          cities: false
        },
        os: null,
        countries: null,
        cities: null,
        devices: null,
        subs: {
          sub1: '',
          sub2: '',
          sub3: '',
          sub4: ''
        },
        total: '',
        payouts: '',
        currency: 'USD',
        goalValue: '',
        goalTitle: 'Goal not selected',
        paymentType: 'Fixed amount'
      })
    },

    removeOfferPayout(index) {
      this.offerPayoutList = this.offerPayoutList.filter((offer, ind) => ind !== index)
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

.payouts {

  .payouts__act {

    button {
      vertical-align: middle;
      margin-left: 10px;
    }
  }
}

.form-group {
  width: 90%;

  .form-control-label {
    margin: 0 0 5px;
    font-weight: normal;
  }
}
</style>
