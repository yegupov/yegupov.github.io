<template lang="pug">
  #app
    header.header
      .header__top
        .header__logo
          a(href="/") 3snet
        .header__menu
          ul.header__menu-list
            li.header__menu-item: a(href="#") Referral program
            li.header__menu-item: a(href="#") Marketplace
            li.header__menu-item: a(href="#") Support
            li.header__menu-item: a(href="#") Login
      .header__menu-list.header__menu_nav
        router-link(to="/").header__menu-link Dashboard
        router-link(to="/statistics").header__menu-link Statistics
        router-link(to="/offers").header__menu-link Offers
        router-link(to="/advertisers").header__menu-link Advertisers
        router-link(to="/smartlinks").header__menu-link Smartlinks
        router-link(to="/automation").header__menu-link.submenu Automation
          transition(name='fade')
            ul.header__menu-list
              li: a(href='#') Sub Menu Item
              li: a(href='#') Sub Menu Item
              li: a(href='#') Sub Menu Item
    main.content-main
      router-view
  </div>
</template>

<script>

export default {
  name: 'App'
}
</script>

<style lang="scss">
@import "./styles/base.scss";

#app {
  min-height: 105vh;
}

.header {
  background-color: #fff;
  box-shadow: 0px 2px 46px 0px rgba(128,128,128,0.2);

  .header__top {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #ebebeb;

    .header__logo {
      margin: 0 0 0 25px;
      font-size: 1.2rem;
      font-weight: 600;

      a {
        color: #424242;

        &:hover {
          color: #4da4df;
        }
      }
    }
  }
}

.header__menu {
  padding: 10px 30px 10px 10px;

  .header__menu-item {
    margin-left: 30px;
  }
}

.header__menu-list {

  .header__menu-item {
    display: inline-block;
  }

  a, .header__menu-link {
    position: relative;
    color: #6e6e6e;

    &.submenu{
      padding-right: 20px;

      &:after {
        position: absolute;
        top: 6px;
        right: 7px;
        content: '\203A';
        font-size: 1.2rem;
        transform: rotate(90deg);
      }
    }

    .header__menu-list {
      position: absolute;
      top: 100%;
      left: 0;
      border-radius: 4px;
      background-color: #fff;
      width: auto;
      box-shadow: rgba(0,0,0,.1) 0 3px 3px;
      display: none;

      a, .header__menu-link {
        display: block;
        white-space: nowrap;
        padding: 5px 10px;
      }
    }

    &:hover .header__menu-list {
      display: block;
    }

    &:hover,
    &.router-link-exact-active {
      color: #4da4df;
    }
  }
}

.header__menu_nav {
  text-align: center;
  padding: 16px 0;

  .header__menu-link {
    margin: 0 4px;
    padding: 9px 12px;
    border-radius: 4px;
    color: #6e6e6e;

    &:hover,
    &.router-link-exact-active {
      background-color: #ebebeb;
      color: #000;
    }
  }
}
</style>
