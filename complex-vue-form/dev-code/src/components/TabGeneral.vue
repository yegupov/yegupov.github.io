<template lang="pug">
  .tab-content-item.general
    .form-group.row(:class="{'error' : validation.firstError('offerGeneral.title')}")
      label.col-2.form-control-label Title
      .col-8
        input.form-control(v-model="offerGeneral.title" type="text" @input="checkField")
    .form-group.row
      label.col-2.form-control-label Description
      .col-8
        button.btn-select(:class="{ active : selectedLang === 'ru'}" @click="selectedLang = 'ru'") Russian
        button.btn-select(:class="{ active : selectedLang === 'en'}" @click="selectedLang = 'en'") English
        .text-editor(v-show="selectedLang === 'ru'")
          ckeditor#texteditor1(v-model="offerGeneral.description" :config="editorConfigRu")
        .text-editor(v-show="selectedLang === 'en'")
          ckeditor#texteditor2(v-model="offerGeneral.description" :config="editorConfigEn")
    .form-group.row(:class="{'error' : validation.firstError('offerGeneral.advertiser')}")
      label.col-2.form-control-label Advertiser
      .col-8
        select.form-control.form-control-select(v-model="offerGeneral.advertiser" @change="checkField")
          option(disabled value="") Select advertiser
          option(v-for="advr in sortedAdvertisers" :value="advr") {{advr}}
    .form-group.row
      label.col-2.form-control-label External offer id
      .col-8
        input.form-control(v-model="offerGeneral.offerId" type="text")
    .form-group.row
      label.col-2.form-control-label Bundle ID
      .col-8
        input.form-control(v-model="offerGeneral.bundleId" type="text")
    .form-group.row
      label.col-2.form-control-label KPI
      .col-8
        button.btn-select(:class="{ active : selectedLang === 'ru'}" @click="selectedLang = 'ru'") Russian
        button.btn-select(:class="{ active : selectedLang === 'en'}" @click="selectedLang = 'en'") English
        .text-editor(v-show="selectedLang === 'ru'")
          ckeditor#texteditor3(v-model="offerGeneral.kpi" :config="editorConfigRu")
        .text-editor(v-show="selectedLang === 'en'")
          ckeditor#texteditor4(v-model="offerGeneral.kpi" :config="editorConfigEn")
    .form-group.row.general__traffic
      label.col-2.form-control-label Traffic sources
      .col-8
        label
          input(type="checkbox" v-model="offerGeneral.traffic.webSites")
          span Web sites
        label
          input(type="checkbox" v-model="offerGeneral.traffic.doorway")
          span Doorway
        label
          input(type="checkbox" v-model="offerGeneral.traffic.contextualAdvertising")
          span Contextual Advertising
        label
          input(type="checkbox" v-model="offerGeneral.traffic.teaser")
          span Teaser / Banner / RTB
        label
          input(type="checkbox" v-model="offerGeneral.traffic.socialNetwork")
          span Social Network
        label
          input(type="checkbox" v-model="offerGeneral.traffic.email")
          span Email
        label
          input(type="checkbox" v-model="offerGeneral.traffic.mobileTraffic")
          span Mobile Traffic
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { Validator } from "simple-vue-validator"

export default {
  mixins: [require('simple-vue-validator').mixin],

  name: 'TabGeneral',

  props: {
    saveProcess: {
      type: Boolean,
      default: false,
      required: true
    }
  },

  data: () => ({
    offerGeneral: {
      title: '',
      advertiser: ''
    },
    selectedLang: 'ru',
    editorConfigRu: {
      language: 'ru'
    },
    editorConfigEn: {
      language: 'en'
    },
    advertisers: ['Lipton', 'Kub', 'Ikea', 'Salamandra', 'Noth-C', '8 March', 'Aton']
  }),

  created() {
    this.offerGeneral = this.copyObject(this.offerGeneralData)
  },

  computed: {
    ...mapGetters(['offerGeneralData']),

    sortedAdvertisers() {
      const sortAdvertisers = [...this.advertisers]
      return sortAdvertisers.sort()
    }
  },

  watch: {
    saveProcess() {

      if (this.saveProcess) {
        this.$validate().then(success => {
          if (!success) {
            // this.disableSubmit = true;
            this.$emit('validGeneral', false)
            console.log('Не пройдена валидация!');
            return;
          }

          const general = this.copyObject(this.offerGeneral)
          this.addGeneralData(general)
        });

      }
    }
  },

  methods: {
    ...mapActions(["addGeneralData"]),

    checkField() {
      this.$validate().then(success => {
        if (!success) {
          this.$emit('validGeneral', false)
          return;
        }
        this.$emit('validGeneral', true)
      });
    },

    copyObject(obj) {
      const clonObj = {}

      Object.keys(obj).forEach(key => {
        if (typeof obj[key] === 'object') {
          clonObj[key] = this.copyObject(obj[key])
        } else {
          clonObj[key] = obj[key]
        }
      })

      return clonObj
    }
  },

  validators: {
    'offerGeneral.title': (value) => {
      return Validator.value(value).required('Input title!')
    },
    'offerGeneral.advertiser': (value) => {
      return Validator.value(value).required('Select advertiser!')
    }
  }
}
</script>

<style scoped lang="scss">
.col-2 {
  text-align: right;
}

.general__traffic {

  .col-2 {
    margin-top: 0;
  }

  label {
    display: block;
    margin-bottom: 10px;
  }
}
</style>
