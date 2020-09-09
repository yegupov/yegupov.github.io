<template lang="pug">
  .section.offers
    .offers-tabs
      button(
        v-for='tab in tabs'
        :key='tab.name'
        :class="['tab-button', { active: currentTab === tab.name, error: !tab.valid }]"
        @click.stop='currentTab = tab.name'
      ) {{ tab.name }}
    TabGeneral(
      v-show="currentTabComponent === 'TabGeneral'"
      :saveProcess="saveProcess"
      @validGeneral="validationData"
    )
    TabTracking(v-show="currentTabComponent === 'TabTracking'")
    TabTargetingGroups(
      v-show="currentTabComponent === 'TabTargetingGroups'"
      :saveProcess="saveProcess"
      :countries="countries"
      :browsers="browsers"
      :cities="cities"
      :regions="regions"
      :mobileCarriers="mobileCarriers"
      :devices="devices"
      :osList="osList"
    )
    TabPayouts(
      v-show="currentTabComponent === 'TabPayouts'"
      :saveProcess="saveProcess"
      :countries="countries"
      :cities="cities"
      :devices="devices"
      :osList="osList"
    )
    .offers-footer
      .offers-btns
        button.btn.btn-primary(:disabled="disableSubmit" @click.stop="submitForm('continue')") Save and continue
        button.btn.btn-primary(:disabled="disableSubmit" @click.stop="submitForm('save')") Save
        button.btn.btn-cancel Cancel
      .offers-id
        p Offer Id:
    .form-data
      h3 Offer Data
      pre {{offer}}
</template>

<script>
import { mapState } from "vuex";

export default {

  name: 'Offers',

  components: {
    TabGeneral: () => import("../components/TabGeneral"),
    TabTracking: () => import("../components/TabTracking"),
    TabTargetingGroups: () => import("../components/TabTargetingGroups"),
    TabPayouts: () => import("../components/TabPayouts"),
  },

  data: () => ({
    saveProcess: false,
    disableSubmit: false,
    currentTab: "General",
    tabs: [
      {name: "General", valid: true},
      {name: "Tracking", valid: true},
      {name: "Targeting Groups", valid: true},
      {name: "Payouts", valid: true}
    ],
    osList: [
      {
        id: 1,
        name: 'Android',
        versions: ['6.0.99', '6.0.96', '6.0.90', '5.0.99', '4.0.99']
      },
      {
        id: 2,
        name: 'Ubuntu',
        versions: ['19.4.0', '19.3.0', '19.0.0', '18.4.0', '18.0.0']
      },
      {
        id: 3,
        name: 'Mac',
        versions: ['6.0.99', '6.0.96', '6.0.90', '5.0.99', '4.0.99']
      },
      {
        id: 4,
        name: 'Windows',
        versions: ['19.4.0', '19.3.0', '19.0.0', '18.4.0', '18.0.0']
      },
      {
        id: 5,
        name: 'Linux',
        versions: ['3.0.99', '3.0.96', '3.0.90', '2.0.99', '1.0.99']
      },
      {
        id: 6,
        name: 'iOS',
        versions: ['19.4.0', '19.3.0', '19.0.0', '18.4.0', '18.0.0']
      }
    ],
    countries: [
      { id: 1, name: 'Brasil' },
      { id: 2, name: 'El Salvador' },
      { id: 3, name: 'Haiti' },
      { id: 4, name: 'Germany' },
      { id: 5, name: 'France' },
      { id: 6, name: 'USA' },
      { id: 7, name: 'Italy' },
      { id: 8, name: 'Russia' },
      { id: 9, name: 'Ukraine' },
      { id: 10, name: 'Netherland' },
      { id: 11, name: 'Sweden' }
    ],
    browsers: [
      { id: 1, name: 'Chrome' },
      { id: 2, name: 'Firefox' },
      { id: 3, name: 'Opera' },
      { id: 4, name: 'Edge' },
      { id: 5, name: 'IE' }
    ],
    cities: [
      { id: 1, name: 'New-York' },
      { id: 2, name: 'Moscow' },
      { id: 3, name: 'Minsk' },
      { id: 4, name: 'Paris' },
      { id: 5, name: 'Oslo' },
      { id: 6, name: 'Berlin' },
      { id: 7, name: 'Tel-Aviv' }
    ],
    regions: [
      { id: 1, name: 'Europe' },
      { id: 2, name: 'Asia' },
      { id: 3, name: 'America' },
      { id: 4, name: 'Africa' }
    ],
    mobileCarriers: [
      { id: 1, name: 'Digicel (HT)' },
      { id: 2, name: 'Megafon' },
      { id: 3, name: 'MTS' },
      { id: 4, name: 'Tesla' },
      { id: 5, name: 'Akado' },
      { id: 6, name: 'Mobilka' }
    ],
    devices: [
      { id: 1, name: 'console' },
      { id: 2, name: 'mediahub' },
      { id: 3, name: 'samsung' },
      { id: 4, name: 'iphone' },
      { id: 5, name: 'Hype' },
      { id: 6, name: 'Neon' },
      { id: 7, name: 'Quest' },
      { id: 8, name: 'Rage' },
      { id: 9, name: 'Chacer' },
      { id: 10, name: 'Boost' },
      { id: 11, name: 'Zenith' },
      { id: 12, name: 'Zoom' }
    ]
  }),

  computed: {
    ...mapState(['offer']),

    currentTabComponent() {
      return "Tab" + this.currentTab.split(' ').join('')
    }
  },

  methods: {
    submitForm(action) {
      this.saveProcess = !this.saveProcess

      if (action === 'continue') {
        console.log('OFFER : ', this.offer);
      }

      if (action === 'save') {
        setTimeout(() => {
          this.$router.push('/offer')
        }, 2)
      }

      setTimeout(() => {
        this.saveProcess = !this.saveProcess
      }, 1)
    },

    validationData(status) {
      if (status) {
        this.tabs[0].valid = true
        this.disableSubmit = false
      } else {
        this.tabs[0].valid = false
        this.disableSubmit = true
      }
    }
  }
}
</script>

<style lang="scss">
.offers {
  background-color: #fff;
  box-shadow: 0px 0px 29px 0px rgba(128,128,128,0.15);
  padding-bottom: 50px;
}

.offers-tabs {
  padding: 10px 25px 0;
  border-bottom: 1px solid #ebebeb;
}

.tab-button {
  margin-bottom: -1px;
  padding: 12px;
  font-size: 0.75rem;
  color: #6e6e6e;
  text-transform: uppercase;
  border-bottom: 1px solid transparent;

  &.error {
    color: red !important;
  }
}

.tab-button:hover,
.tab-button.active {
  color: #000;
  border-bottom: 1px solid #4da4df;
}

.offers-footer {
  display: flex;
  align-items: center;
  padding: 25px;
  border-top: 1px solid #ebebeb;

  .offers-btns {
    flex-basis: 50%;
  }

  .offers-id {
    flex-basis: 50%;
    text-align: right;
  }
}

.row p {
  margin-top: 0.5rem;
}

.col-8 {
  text-align: left;
}

.form-group {
  width: 90%;
}

.btn-cancel {
  cursor: not-allowed;
}

.form-data {
  margin: 0 5%;
  padding: 40px;
  border-radius: 4px;
  background-color: #efefef;
  white-space: normal;
}
</style>
