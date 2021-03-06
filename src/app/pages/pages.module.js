/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages', [
      'ui.router',
      'BlurAdmin.pages.changePassword',
      'BlurAdmin.pages.multiFactorAuth',
      'BlurAdmin.pages.smsAuth',
      'BlurAdmin.pages.multiFactorAuthVerify',
      'BlurAdmin.pages.settings',
      'BlurAdmin.pages.addCurrency',
      'BlurAdmin.pages.home',
      'BlurAdmin.pages.transactions',
      'BlurAdmin.pages.currency',
      'BlurAdmin.pages.webhooks',
      'BlurAdmin.pages.users',
      'BlurAdmin.pages.userDetails',
      'BlurAdmin.pages.services',
      'BlurAdmin.pages.login',
      'BlurAdmin.pages.register',
      'BlurAdmin.pages.resetPassword',
      'BlurAdmin.pages.resetPasswordConfirmation',
      'BlurAdmin.pages.verifyAdminEmail',
      'BlurAdmin.pages.accountSettings',
      'BlurAdmin.pages.permissions',
      'BlurAdmin.pages.verification',
      'BlurAdmin.pages.companyNameRequest',
      'BlurAdmin.pages.initialAddCurrency'
  ])
      .config(routeConfig);

  /** @ngInject */
  function routeConfig($urlRouterProvider, baSidebarServiceProvider) {
    $urlRouterProvider.otherwise('/home');
  }

})();
