import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    offer: {
      general: {
        title: '',
        description: '<p>Rich-text editor content.</p>',
        advertiser: '',
        offerId: '',
        bundleId: '',
        kpi: '<p>Rich-text editor content.</p>',
        traffic: {
          webSites: false,
          doorway: false,
          contextualAdvertising: false,
          teaser: false,
          socialNetwork: false,
          email: false,
          mobileTraffic: false
        }
      },
      targetingGroups: [{
        exclusions: {
          countries: false,
          regions: false,
          cities: false,
          browsers: false,
          ip: false
        },
        antifraud: false,
        os: [
          {
            name: 'Android',
            range: '>=',
            version: '6.0.99'
          },
          {
            name: 'Ubuntu',
            range: '<',
            version: '19.4.0'
          }
        ],
        countries: null,
        browsers: null,
        cities: null,
        regions: null,
        mobileCarriers: null,
        devices: null,
        urls: []
      }],
      payouts: [{
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
      }]
    }
  },

  getters : {
    offerGeneralData : state => {
      return state.offer.general
    },

    offerTargeting : state => {
      return state.offer.targetingGroups
    },

    offerPayouts : state => {
      return state.offer.payouts
    }
  },

  mutations: {
    SET_GENERALDATA(state, generalData) {
      state.offer.general = generalData
    },

    SET_TARGETINGDATA(state, targetingData) {
      state.offer.targetingGroups = targetingData
    },

    SET_PAYOUTSDATA(state, payoutsData) {
      state.offer.payouts = payoutsData
    }
  },

  actions : {
    addGeneralData({ commit }, generalData) {
      console.log('ACTIONS addGeneralData : ', generalData);
      commit("SET_GENERALDATA", generalData);
    },

    addTargetingData({ commit }, targetingData) {
      commit("SET_TARGETINGDATA", targetingData);
    },

    addPayoutsData({ commit }, payoutsData) {
      commit("SET_PAYOUTSDATA", payoutsData);
    }
  }
})
